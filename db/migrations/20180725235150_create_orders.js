
exports.up = function(knex, Promise) {
  return knex.schema.createTable("orders", function(table) {
    table.increments();
    table.string("name");
    table.string("phone");
    table.string("status").defaultTo("Placed");
    table.timestamp("placed_at").defaultTo(knex.fn.now());
  });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable("orders");
};
