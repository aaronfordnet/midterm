
exports.up = function(knex, Promise) {
  return knex.schema.raw('alter table orders alter column eta type timestamp with time zone using (eta::text::timestamp with time zone)');
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('alter table orders alter column eta type date');
};

