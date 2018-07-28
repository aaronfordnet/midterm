
exports.up = function(knex, Promise) {
  return knex.schema.raw('alter table orders alter column eta type date using (eta::text::date)');
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('alter table orders alter column eta type integer');
};
