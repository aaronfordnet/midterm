//jshint esversion: 6
"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("orders")
      .then((results) => {
        let tempObj = { results };
        console.log(results);
        res.render("admin", tempObj);
    });
  });

  return router;
};
