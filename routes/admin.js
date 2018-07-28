//jshint esversion: 6
"use strict";

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
            // result.items = foodItems;
            // let allOrders = result;
            // let items = foodItems;
            // let orders = { orders, items };
            // console.log({ orders, items });
            // result.items.forEach(item => {
            //   // console.log(item.id, item.name);
            // });
            // console.log(result.items);
            res.json({ orders, items });
          });
      });
  });

  router.post("/", (req, res) => {
    console.log("I HAPPENED");
    // Updates order info/page and sends SMS to customer
    console.log(req.body);

  });

  return router;
};
