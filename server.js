//jshint esversion: 6
"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');


// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orderstatus");
const foodsRoutes = require("./routes/menu");
const adminRoutes = require("./routes/admin");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));
app.use("/orders", ordersRoutes(knex));
// app.use("/api/orders/:id", ordersRoutes(knex));
app.use("/api/menu", foodsRoutes(knex));
app.use("/admin", adminRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("menu");
});
// Order Page
// app.get("/:id", (req, res) => {
//   res.render("orderstatus");
// });

// SUBMIT ORDER

app.post('/', (req, res) => {
  console.log('Post request received');
  let body = req.body;
  let itemsArray = [];
  let quantityArray = [];
  let orderName = req.body.name;
  let orderPhone = "+1" + (req.body.phone).replace(/[^\w\s]/gi, '').split(' ').join('');
  let orderTime = new Date().getTime();



  for(let obj in body){
    if(obj.startsWith('item_') && body[obj] > 0){
      itemsArray.push(obj.replace('item_',''));
      quantityArray.push(body[obj]);
    }
  }


  console.log(itemsArray);
  console.log(quantityArray);

  knex('orders')
    .returning('id')
    .insert({ name: orderName, phone: orderPhone})
    .then((id) => {
      let orderID = parseInt(id);
      console.log(orderID, id);
      itemsArray.forEach((item, index) => {
    for(var i = 0; i < quantityArray[index]; i++){
      knex('order_foods').insert({order_id : orderID, food_id: item}).then();
    }
  });

  // Twilio message to restaurant

  // console.log('sending text message');
  // client.messages.create({
  //   from: '+16049016036',
  //   to: '+17789261236',
  //   body: `Hello! Mr. ${orderName} has placed an order of ${quantityArray.reduce(function(acc, val) { return Number(acc) + Number(val); }, 0)} items! Please visit xxxx to confirm order.🌮🌮🌮🌮`
  //    })
  //   .then(message => {
  //     console.log('Reply from Twilio');
  //     console.log(`ID: ${message.sid}`)
  //   }).done(console.log('Text sent to restaurant'));

       // Response
    res.redirect(`/orders/${orderID}`);
    })


});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
