exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        knex('orders').insert({
          id: 20001,
          name: 'Aaron',
          phone: "+16049995555"
        }),
        knex('orders').insert({
          id: 20002,
          name: 'Raf',
          phone: "+16049995556"
        }),
        knex('orders').insert({
          id: 20003,
          name: 'Taylour Em',
          phone: "+16049995557",
          status: "confirmed"
        })
      ]);
    });
};
