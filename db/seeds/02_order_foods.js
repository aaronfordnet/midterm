exports.seed = function(knex, Promise) {
  return knex('order_foods').del()
    .then(function () {
      return Promise.all([
        knex('order_foods').insert({
          order_id: 20001, food_id: 1001}),
        knex('order_foods').insert({
          order_id: 20001, food_id: 1001}),
        knex('order_foods').insert({
          order_id: 20002, food_id: 1002}),
        knex('order_foods').insert({
          order_id: 20003, food_id: 1003})
      ]);
    });
};
