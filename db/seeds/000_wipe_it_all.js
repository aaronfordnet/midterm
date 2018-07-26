exports.seed = function(knex, Promise) {
  return knex('order_foods').del()
      .then(function () { knex('foods').del() } )
      .then(function () { knex('orders').del() } )
};
