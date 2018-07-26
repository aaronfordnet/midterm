exports.seed = function(knex, Promise) {
  return knex('order_foods').del()
    .then(function () {
      return Promise.all([
        knex('order_foods').insert({
          order_id: 4, food_id: 9}),
        knex('order_foods').insert({
          order_id: 4, food_id: 8}),
        knex('order_foods').insert({
          order_id: 5, food_id: 7}),
        knex('order_foods').insert({
          order_id: 5, food_id: 7})
      ]);
    });
};
