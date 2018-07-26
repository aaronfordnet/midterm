
exports.up = function(knex, Promise) {
  return knex.schema.createTable("foods", function(table) {
    table.increments();
    table.string("name");
    table.text("description");
    table.string("imgurl");
    table.integer("price");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("foods");
};
