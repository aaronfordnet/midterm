exports.seed = function(knex, Promise) {
  return knex('order_foods').del()
    .then(function () {
      return Promise.all([
        knex('order_foods').insert({
          order_id: 10, food_id: 10}),
        knex('order_foods').insert({
          order_id: 10, food_id: 10}),
        knex('order_foods').insert({
          order_id: 11, food_id: 11}),
        knex('order_foods').insert({
          order_id: 12, food_id: 12})
      ]);
    });
};
