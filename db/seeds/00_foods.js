exports.seed = function(knex, Promise) {
  return knex('foods').del()
    .then(function () {
      return Promise.all([
        knex('foods').insert({
          id: 1001,
          name: 'Ronny Russell Burrito',
          description: "One tasty burrito",
          imgurl: "https://s3-media2.fl.yelpcdn.com/bphoto/K7mE_hUxWtOKJw_RpLfRDg/o.jpg",
          price: 899,
          category: 'food'}),
        knex('foods').insert({
          id: 1002,
          name: 'Stella Burrito',
          description: "Second tasty burrito",
          imgurl: "https://s3-media2.fl.yelpcdn.com/bphoto/K7mE_hUxWtOKJw_RpLfRDg/o.jpg",
          price: 899,
          category: 'food'}),
        knex('foods').insert({
          id: 1003,
          name: 'Leona Gayle Baked Burrito',
          description: "Third tasty burrito",
          imgurl: "https://s3-media2.fl.yelpcdn.com/bphoto/K7mE_hUxWtOKJw_RpLfRDg/o.jpg",
          price: 999,
          category: 'food'}),
        knex('foods').insert({
          id: 1004,
          name: 'Vanilla Coke Bottle',
          description: "Vanilla Coke... Yummy",
          imgurl: "/images/Vanilla_coke.png",
          price: 199,
          category: 'drink'}),
        knex('foods').insert({
          id: 1005,
          name: 'Fanta Blueberry Can',
          description: "Blueberry Fanta",
          imgurl: "/images/blueberry_fanta.png",
          price: 299,
          category: 'drink'})
      ]);
    });
};
