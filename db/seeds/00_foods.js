exports.seed = function(knex, Promise) {
  return knex('foods').del()
    .then(function () {
      return Promise.all([
        knex('foods').insert({
          id: 1001,
          name: 'Shredded Beef Brisket Taco',
          description: "Topped with grilled onions, raw onions, cilantro, queso fresco",
          imgurl: "https://mitaco.oftendining.com/menu_images/7426/wp1150.jpg",
          price: 375,
          category: 'food'}),
        knex('foods').insert({
          id: 1002,
          name: 'Chicken Tinga Taco',
          description: "Topped with grilled onions, raw onions, cilantro, pico de gallo",
          imgurl: "https://mitaco.oftendining.com/./menu_images/7426/wp1146.jpg",
          price: 375,
          category: 'food'}),
        knex('foods').insert({
          id: 1003,
          name: 'Carnitas Braised Pork Taco',
          description: "Topped with grilled onions, raw onions, cilantro, pico de gallo",
          imgurl: "https://mitaco.oftendining.com/./menu_images/7426/wp1147.jpg",
          price: 375,
          category: 'food'}),
        knex('foods').insert({
          name: 'Sauteed Vegetable Taco',
          description: "Topped with grilled onions, shredded cabbage, pico de gallo, raw onion, cilantro, guacamole",
          imgurl: "https://mitaco.oftendining.com/./menu_images/7426/wp1153.jpg",
          price: 325,
          category: 'food'}),
        knex('foods').insert({
          name: 'Grilled Sole Fish Taco',
          description: "Topped with grilled onions, cilantro lime sauce, shredded cabbage, pico de gallo, raw onion, cilantro",
          imgurl: "https://mitaco.oftendining.com/./menu_images/7426/wp1152.jpg",
          price: 395,
          category: 'food'}),
        knex('foods').insert({
          name: 'Carne Asada Burrito (Grilled Steak)',
          description: "Filled with Mexican rice, smashed beans, grilled onions, shredded lettuce, shredded cabbage, pico de gallo, cilantro",
          imgurl: "http://images.media-allrecipes.com/userphotos/960x960/3757728.jpg",
          price: 1095,
          category: 'food'}),
        knex('foods').insert({
          name: 'Chicken Tinga Burrito',
          description: "Filled with Mexican rice, smashed beans, grilled onions, shredded lettuce, shredded cabbage, pico de gallo, cilantro",
          imgurl: "https://www.chimichanga.co.uk/globalassets/menu/lunch-menu/chicken-tinga-burrito-380x380-resized.jpg",
          price: 1025,
          category: 'food'}),
        knex('foods').insert({
          name: 'Rice and Pinto Beans',
          description: "Mexican rice with our signature smashed pinto beans",
          imgurl: "/images/rice-beans.jpg",
          price: 325,
          category: 'food'}),
        knex('foods').insert({
          name: 'Mexican Coca Cola',
          description: "355ml bottle",
          imgurl: "/images/Mexican-Coca-Cola.jpg",
          price: 275,
          category: 'drink'}),
        knex('foods').insert({
          name: 'Fanta Blueberry',
          description: "330ml can",
          imgurl: "/images/blueberry_fanta.jpg",
          price: 325,
          category: 'drink'})
      ]);
    });
};
