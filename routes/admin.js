//jshint esversion: 6
// "use strict";
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const adminPhone = process.env.TWILIO_ADMIN_PHONE;
const customerPhone = process.env.TWILIO_CUSTOMER_PHONE;
const client = require('twilio')(accountSid, authToken);
const moment = require('moment');
moment().format();

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // Refactor into smaller query?

  router.get("/", (req, res) => {
    knex("orders")
      .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
      .distinct("orders.id", "orders.name", "orders.phone", "orders.placed_at", "orders.eta", "orders.status")
      .sum("foods.price")
      .orderBy("placed_at", "desc")
      .groupBy("orders.id")
      .then(orders => {
        knex("orders")
          .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
          .select("orders.id", "foods.name") //.count('order_foods.order_id')
          .orderBy("placed_at", "desc")
          .then(items => {
            knex("users")
            .then(users => {
              res.json({ orders, items, users });
            });
          });
      });
  });

  router.put("/confirm", (req, res) => {
    let id = req.body.id;
    let minutes = req.body.minutes;
    let status = req.body.status;
    let timeConfirmed = moment().utcOffset("-0700").add(minutes, 'minutes').format();
    let name = req.body.name;
    if (status === "Placed") {
      status = "Confirmed";
    }

    // Updates order info/page and sends SMS to customer
    knex("orders")
      .where({
        id: id
      })
      .update({
        status: status,
        eta: timeConfirmed
      }).then((id) => {
        res.json({ result: 'true' });
      }).error(err => {
        console.error(err);
      });

    // TWILIO: message to user
    // console.log('Sending confirmation text to customer...');
    // client.messages.create({
    //   from: '+16049016036',
    //   to: adminPhone,
    //   body: 'Hi ' + name + '!\n\nWe have received your order and estimate it will be ready for pickup in ' + minutes + ' minutes.\n\nVisit http://localhost:8080/orders/' + id + ' to track your order.'
    //    })
    //   .then(message => {
    //     console.log('Success! Confirmation text sent to customer');
    //     console.log(`ID: ${message.sid}`)
    //   }).done();

  });


  // Updates order info/page to "ready" status
  router.put("/ready", (req, res) => {
    let id = req.body.id;
    let status = req.body.status;
    if (status === "Confirmed") {
      status = "Ready";
    }

    knex("orders")
      .where({ id: id })
      .update({ status: status }).then((id) => {
        res.json({ result: 'true' });
      }).error(err => {
        console.error(err);
      });
  });


  // Updates order info/page to "Picked Up" status
  router.put("/pickup", (req, res) => {
    console.log("why not me?");
    let id = req.body.id;
    let status = req.body.status;
    // console.log("status", req.body.status);
    if (status === "Ready") {
      status = "Picked Up";
    }
    knex("orders")
      .where({ id: id })
      .update({ status: status }).then((id) => {
        res.json({ result: 'true' });
      }).error(err => {
        console.error(err);
      });

    });


  return router;
};
