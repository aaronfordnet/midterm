exports.seed = function(knex, Promise) {
  return knex('foods').del()
    .then(function () {
      return Promise.all([
        knex('foods').insert({
          id: 1001,
          name: 'Ronny Russell Burrito',
          description: "One tasty burrito",
          imgurl: "https://s3-media2.fl.yelpcdn.com/bphoto/K7mE_hUxWtOKJw_RpLfRDg/o.jpg",
          price: 899}),
        knex('foods').insert({
          id: 1002,
          name: 'Stella Burrito',
          description: "Second tasty burrito",
          imgurl: "https://s3-media2.fl.yelpcdn.com/bphoto/K7mE_hUxWtOKJw_RpLfRDg/o.jpg",
          price: 899}),
        knex('foods').insert({
          id: 1003,
          name: 'Leona Gayle Baked Burrito',
          description: "Third tasty burrito",
          imgurl: "https://s3-media2.fl.yelpcdn.com/bphoto/K7mE_hUxWtOKJw_RpLfRDg/o.jpg",
          price: 999})
      ]);
    });
};
