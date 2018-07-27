
exports.up = function(knex, Promise) {
  return knex.schema.table('foods', function(table) {
    table.string('category');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('milestones', function(table) {
    table.dropColumn('category');
  });
};
