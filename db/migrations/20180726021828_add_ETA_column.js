
exports.up = function(knex, Promise) {
  return knex.schema.table("orders", function(table) {
    table.integer("eta");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("orders", function(table) {
    table.dropColumn("eta");
  });
};
