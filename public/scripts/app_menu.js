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
                <input type="number" min="0" max="99" name="item_${food.id}" value="0">
              </div>
            </div>
          </div>
        `);
      $('#menu-list').prepend($item);
    }
  });

  document.getElementById('phone').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  });

});
