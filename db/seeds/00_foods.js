exports.seed = function(knex, Promise) {
  return knex('foods').del()
    .then(function () {
      return Promise.all([
        knex('foods').insert({
          name: 'Ronny Russell Burrito',
          description: "One tasty burrito",
          imgurl: "https://s3-media2.fl.yelpcdn.com/bphoto/K7mE_hUxWtOKJw_RpLfRDg/o.jpg",
          price: 899}),
        knex('foods').insert({
          name: 'Stella Burrito',
          description: "Second tasty burrito",
          imgurl: "https://s3-media2.fl.yelpcdn.com/bphoto/K7mE_hUxWtOKJw_RpLfRDg/o.jpg",
          price: 899}),
        knex('foods').insert({
          name: 'Leona Gayle Baked Burrito',
          description: "Third tasty burrito",
          imgurl: "https://s3-media2.fl.yelpcdn.com/bphoto/K7mE_hUxWtOKJw_RpLfRDg/o.jpg",
          price: 999})
      ]);
    });
};
