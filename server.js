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
app.use("/api/users", usersRoutes(knex));
app.use("/api/orderstatus", ordersRoutes(knex));
// app.use("/api/orders/:id", ordersRoutes(knex));
app.use("/api/menu", foodsRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("menu");
});
// Order Page
app.get("/:id", (req, res) => {
  res.render("orderstatus");
});

// SUBMIT ORDER

app.post('/', (req, res) => {
  console.log('Post request received');
  let body = req.body;
  let orderName = req.body.name;
  let orderPhone = req.body.phone;
  let orderTime = new Date().getTime();
  console.log(orderName, orderPhone, orderTime);

  // Twilio message to restaurant
  console.log('sending text message');
  client.messages.create({
    from: '+16049016036',
    to: '+17789261236',
    body: `Hi ${orderName}! Thank you for placing an order from Benditos 🌮  Your phone: ${orderPhone}, order time: ${orderTime}`
     })
    .then(message => {
      console.log('Reply from Twilio');
      console.log(`ID: ${message.sid}`)
      //console.log(message)
    }).done(console.log('Text sent to restaurant'));

  res.redirect('/')
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
