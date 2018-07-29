//jshint esversion: 6
"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("foods")
      .orderBy("category")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/favourites", (req, res) => {
    knex
      .select("foods.id", "foods.name", "foods.description", "foods.imgurl", "foods.price", "foods.category").count("order_foods.food_id")
      .from("foods")
      .leftJoin("order_foods", "foods.id", "order_foods.food_id")
      .groupBy("foods.id", "foods.name", "foods.description", "foods.imgurl", "foods.price", "foods.category")
      .orderBy(knex.raw('count(order_foods.food_id)'), 'desc')
      .limit(3)
      // .having(knex.raw(('count(order_foods.food_id) > 2')))
      .then((results) => {
        console.log(results)
        res.json(results);
    });
  });

  return router;
};
