//jshint esversion: 6
"use strict";
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const adminPhone = process.env.TWILIO_ADMIN_PHONE;
const customerPhone = process.env.TWILIO_CUSTOMER_PHONE;
const client = require('twilio')(accountSid, authToken);

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex("orders")
      .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
      .distinct("orders.id", "orders.name", "orders.phone", "orders.placed_at", "orders.eta", "orders.status")
      .sum("foods.price")
      .orderBy("placed_at", "desc")
      .groupBy("orders.id")
      .then((orders) => {
        // console.log(result);
        knex("orders")
          .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
          .select("orders.id", "foods.name") //.count('order_foods.order_id')
          // .groupBy("orders.id", "foods.name")
          .orderBy("placed_at", "desc")
          // .where({ order_id: orders.id })
          .then((items) => {
            res.json({ orders, items });
          });
      });
  });

  router.put("/", (req, res) => {
    console.log("I HAPPENED");
    let id = req.body.id;
    let minutes = req.body.minutes;
    let status = req.body.status;
    let name = req.body.name;
    if(status === "Placed"){
      status = "Confirmed";}

    knex("orders")
    .where({
      id: id})
    .update({
      status: status,
      eta: minutes
    }).then();
    // Updates order info/page and sends SMS to customer
    console.log(req.body.minutes, req.body.id, status, name);

     // Twilio message to restaurant

  // console.log('sending text message');
  // client.messages.create({
  //   from: '+16049016036',
  //   to: customerPhone,
  //   body: `Hello Mr. ${name}! Your order should be ready for pick up in ${minutes} minutes!`
  //    })
  //   .then(message => {
  //     console.log('Reply from Twilio');
  //     console.log(`ID: ${message.sid}`)
  //   }).done(console.log('Text sent to client'));

  });

  return router;
};
