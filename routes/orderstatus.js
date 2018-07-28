//jshint esversion: 6
"use strict";

const express = require('express');
const router = express.Router();


module.exports = (knex) => {


  router.get("/:id", (req, res) => {

    var order_id = req.params.id;

    // Gets order information by order ID
    function orderById(order_id) {
      knex('orders').select('id').where({ id: order_id }).then((result) => {
        let stringResult = JSON.stringify(result);
        let thisId = stringResult.replace('[{"id":', "").replace("}]", "");
        if (thisId !== order_id) {
          res.redirect("/");
        } else {
          knex("orders")
            .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
            .distinct("orders.name","orders.status", "orders.id", "orders.eta")
            .select()
            .where({ order_id: order_id })
            .then((result) => {
              knex("orders")
                .leftJoin("order_foods", "orders.id", "order_foods.order_id").leftJoin("foods", "order_foods.food_id", "foods.id")
                .select("foods.imgurl", "foods.price", "foods.name").count('order_foods.order_id')
                .where({
                  order_id: order_id
                })
                .groupBy('foods.name', 'foods.price', 'foods.imgurl')
                .then((newResult) => {
                  let newArray = result.concat(newResult);
                  let varsObj = {
                    newArray
                  };
                  res.render('orderstatus', varsObj);
                });
            });
        }
      });
    }
    orderById(order_id);
  });
  return router;
};
