//jshint esversion: 6
"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("orders")
      .then((allOrders) => {
        let orders = { allOrders };
        console.log(orders);
        res.render("admin", orders);
    });
  });

  return router;
};
