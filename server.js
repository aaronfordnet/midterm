//jshint esversion: 6
"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const adminPhone = process.env.TWILIO_ADMIN_PHONE;
const customerPhone = process.env.TWILIO_CUSTOMER_PHONE;
const client = require('twilio')(accountSid, authToken);
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const moment = require('moment');
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

app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/orders", ordersRoutes(knex));
app.use("/api/menu", foodsRoutes(knex));
app.use("/api/admin", adminRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("menu");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});


// SUBMIT ORDER from menu page

app.post('/', (req, res) => {
  console.log('Post request received');
  let body = req.body;
  let itemsArray = [];
  let quantityArray = [];
  let orderName = req.body.name;
  let orderPhone = "+1" + (req.body.phone).replace(/[^\w\s]/gi, '').split(' ').join('');
  let orderTime = new Date().getTime();

  for (let obj in body) {
    if (obj.startsWith('item_') && body[obj] > 0) {
      itemsArray.push(obj.replace('item_', ''));
      quantityArray.push(body[obj]);
    }
  }

  // Write order to DB and return order id
  knex('orders')
    .returning('id')
    .insert({
      name: orderName,
      phone: orderPhone
    })
    .then((id) => {
      let orderID = parseInt(id);
      itemsArray.forEach((item, index) => {
        for (var i = 0; i < quantityArray[index]; i++) {
          knex('order_foods').insert({
            order_id: orderID,
            food_id: item
          }).then();
        }
      });

      // Get order info from DB and send text to restaurant
      knex("orders")
        .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
        .distinct("orders.name", "orders.status", "orders.id")
        .select()
        .where({
          order_id: orderID
        })
        .then((result) => {
          knex("orders")
            .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
            .select("foods.imgurl", "foods.price", "foods.name").count('order_foods.order_id')
            .where({
              order_id: orderID
            })
            .groupBy('foods.name', 'foods.price', 'foods.imgurl')
            .then((newResult) => {
              let newArray = result.concat(newResult);
              let tempObj = {
                newArray
              };

              let orderItems = '';
              (tempObj.newArray).forEach(item => {
                if (item.count) {
                  orderItems += item.count + ' x ' + item.name + '\n';
                }
              });

              // TWILIO text message to restaurant
              console.log('Sending order received text to restaurant...');
              client.messages.create({
                  from: '+16049016036',
                  to: adminPhone,
                  body: 'New online order!\n\n' + 'Order Number: ' + orderID + '\n' + 'Name: ' + orderName + '\n\n' + orderItems + '\nVisit admin page to confirm, or reply with order # followed by prep time in minutes.\neg: "' + orderID + ' 15"'
                })
                .then(message => {
                  console.log('Success! Text sent to restaurant');
                  console.log(`ID: ${message.sid}`)
                }).done();
            });
        });

      // Response
      res.redirect(`/orders/${orderID}`);
    });
});

// Receive SMS confirmation from restaurant
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  let reply = req.body.Body;
  let id = (reply.split(' '))[0];
  let minutes = (reply.split(' '))[1];
  let timeConfirmed = moment().utcOffset("-0700").add(minutes, 'minutes').format();
  let status = 'Confirmed';


  knex("orders")
    .where({
      id: id
    })
    .update({
      status: status,
      eta: timeConfirmed
    }).then().error(err => {
      console.error(err);
    });

  // Text confirmation to customer
  knex("orders")
    .select('name')
    .where('id', id)
    .then((name) => {
      let orderName = (name[0]).name;
      console.log('Sending confirmation text to customer...');
      // TWILIO text confirmation to customer
      client.messages.create({
          from: '+16049016036',
          to: customerPhone,
          body: 'Hi ' + orderName + '!\n\nWe have received your order and estimate it will be ready for pickup in ' + minutes + ' minutes.\n\nVisit http://bendito.herokuapp.com/orders/' + id + ' to track your order.'
        })
        .then(message => {
          console.log('Success! Confirmation text sent to customer');
          console.log
(`ID: ${message.sid}`)
        }).done();
    });

    // TWILIO text confirmation to restaurant
    console.log('Sending confirmation text to restaurant...');
    twiml.message('\n\nConfirmation sent!\n\nOrder #' + id + ' will be notified with their approximate pickup time (' + minutes + ' minutes)')

    res.writeHead(200, {
      'Content-Type': 'text/xml'
    });
    res.end(
      twiml.toString()
    );
});

// TWILIO contact us outgoing call
app.get("/contact", (req, res) => {
  console.log("Contacting Bendito's...");
  client.calls
      .create({
         url: 'http://aaronford.net/contact.xml',
         to: adminPhone,
         from: '+16049016036'
       })
      .then(call => console.log(call.sid))
      .done();
  res.redirect("/");
});

// 404 error redirects to main page
app.use((req, res) => {
  res.status(404).redirect("/");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
