//jshint esversion: 6
// "use strict";

$(() => {

  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((foods) => {
    for (let food of foods) {
      let $item = $('<div>').addClass('col-sm-12 col-xs-5 food-item').attr('id', `${food.id}`).html(`
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
                <input class="quantity" type="number" min="0" max="99" name="item_${food.id}" value="0">
                <span class="subtotal">Subtotal: </span><br>$<span class="sum">0</span>
              </div>
            </div>
        `);
      if (food.category === "food") {
        $('#menu-food').append($item);
      } else {
        $('#menu-drink').append($item);
      }
    }
  });

  function getQuantity() {
    let total = 0;
    let $qtyInputs = $("input.quantity");
    $qtyInputs.each(function(index) {
      total += Number($(this).val());
    });
    return total;
  }

  function displayError(message) {
    let $errMsg = $('p.error-message');
    $errMsg.fadeOut("fast", function() {
      $errMsg.text(message);
      $errMsg.fadeIn('fast');
    });
  }

  function getTotal() {
    var total = 0;
    $('.sum').each(function() {
      total += parseFloat(this.innerHTML)
    });
    $('#order-total').text(total.toFixed(2));
  }

  getTotal();


    $('div.container').on('change', 'input.quantity', function(event) {
      let qty = $(this).val();
      let price = $('.food-item-price', $(this).parent()).text();
      let value = Number(price.replace("$","")).toFixed(2);
      let subtotal = (value * qty).toFixed(2);
      var sum = $('.sum', $(this).parent())
      sum.text(subtotal);
      getTotal();
    })



  function validateInputs() {
    let name = $('#name').val().trim();
    let phone = $('#phone').val();
    let quantity = getQuantity();
    if (name == "") {
      displayError("Please enter your name");
      return false;
    } else if (phone.length < 14) {
      displayError("Please enter a valid phone number, including area code");
      return false;
    } else if (quantity <= 0) {
      displayError("Order can't be empty, please add something to your order");
      return false
    }
    return true;
  }

  // To be converted to jQuery:
  document.getElementById("submit").addEventListener("click", function(event) {
    let pass = validateInputs();
    if (!pass) {
      event.preventDefault();
    }
  });

  document.getElementById('phone').addEventListener('input', function(e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  });

});
