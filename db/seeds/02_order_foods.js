exports.seed = function(knex, Promise) {
  return knex('order_foods').del()
    .then(function () {
      return Promise.all([
        knex('order_foods').insert({
          order_id: 1, food_id: 1}),
        knex('order_foods').insert({
          order_id: 1, food_id: 2}),
        knex('order_foods').insert({
          order_id: 2, food_id: 1}),
        knex('order_foods').insert({
          order_id: 3, food_id: 3})
      ]);
    });
};
