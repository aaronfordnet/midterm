exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Raf'}),
        knex('users').insert({id: 2, name: 'Aaron'}),
        knex('users').insert({id: 3, name: 'Taylour'}),
        knex('users').insert({id: 4, name: 'benditos'})
      ]);
    });
};
