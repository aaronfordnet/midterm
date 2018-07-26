
exports.up = function(knex, Promise) {
  return knex.schema.createTable("order_foods", function(table) {
    table.increments();
    table.integer("order_id");
    table.foreign("order_id").references("orders.id");
    table.integer("food_id");
    table.foreign("food_id").references("foods.id");
  });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable("order_foods");
};
