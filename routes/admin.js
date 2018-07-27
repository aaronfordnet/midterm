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

  router.post("/", (req, res) => {
    // Updates order info/page and sends SMS to customer

  });

  return router;
};
