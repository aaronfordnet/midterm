//jshint esversion: 6
// "use strict";

$(() => {

  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((foods) => {
    for (let food of foods) {
      console.log(food, foods);
      let $item = $('<div>').addClass('col-sm-12 col-xs-6 food-item').attr('id', `${food.id}`);
      $item.html(`
          <div class="col-sm-12 col-xs-6 food-item">
            <div class="row food-item-row">
              <div class="col-sm-3 col-xs-12 food-item-img">
                <img src=${food.imgurl} />
              </div>
              <div class="col-sm-7 col-xs-12 food-item-description">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
              </div>
              <div class="col-sm-2 col-xs-12 food-item-qty">
                <p class="food-item-price">$${food.price / 100}</p>
                <p>Quantity:</p>
                <input type="number" min="0" max="99" value="0">
              </div>
            </div>
          </div>
        `);
      $('#menu-list').prepend($item);
    }
  });

  // $('form.menu').on('submit', function(event){
  //   $.ajax({
  //     method: "POST",
  //     url: "/1"
  //   })
  // })


});

// $.ajax({
//   method: "GET",
//   url: "/api/foods"
// }).done((foods) => {
//   for(food of foods) {
//     $("<div>").text(food.name).appendTo($("body"));
//   }
// });;
