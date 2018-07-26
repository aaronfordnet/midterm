"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
//send results obj with foods ordered and quantity;
  router.get("/", (req, res) => {
    knex("orders")
      .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
      .select("foods.name").count('order_foods.order_id')
      .where({order_id: 1})
      .groupBy('foods.name')
      .then((result)=>{
        knex("orders")
      .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
      .distinct("orders.name")
      .select()
      .where({order_id: 1})
      .then((newResult)=>{
        let newArray = result.concat(newResult);
        res.json(newArray);
      })
      })
  });

  return router;
}
