"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
//send results obj with foods ordered and quantity;
  router.get("/:id", (req, res) => {
      knex("orders")
      .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
      .distinct("orders.name","orders.id")
      .select()
      .where({order_id: req.params.id})
      .then((result)=>{
        knex("orders")
      .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
      .select("foods.imgurl","foods.name").count('order_foods.order_id')
      .where({order_id: req.params.id})
      .groupBy('foods.name','foods.imgurl')
      .then((newResult)=>{
        let newArray = result.concat(newResult);
        res.json(newArray);
      })
      })
  });

  return router;
}
