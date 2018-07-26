exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        knex('orders').insert({
          name: 'Aaron',
          phone: "+16049995555"}),
        knex('orders').insert({
          name: 'Raf',
          phone: "+16049995556"}),
        knex('orders').insert({
          name: 'Taylour Em',
          phone: "+16049995557",
          status: "Confirmed"})
      ]);
    });
};
