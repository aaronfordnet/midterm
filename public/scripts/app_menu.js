//jshint esversion: 6
// "use strict";

$(function() {


  $.ajax({
    method: "GET",
    url: "/api/menu/favourites"
  }).done(function(foods) {
    for (let food of foods) {
      let $item = $('<div>').addClass('col-sm-12 col-xs-12 favourite-item').attr('id', food.id).html('<div class="row favourite-item-row"><div class="col-sm-3 col-xs-12 favourite-item-img"><img src=' + food.imgurl + ' /></div><div class="col-sm-7 col-xs-12 favourite-item-description"><h3>' + food.name + '</h3><p>' + food.description + '</p></div><div class="col-sm-2 col-xs-12 favourite-item-qty"><p class="food-item-price">$' + (food.price / 100) + '</p><br><p>Quantity:</p><input class="quantity" type="number" min="0" max="99" name="item_' + food.id + '" value="0"><span class="subtotal"><p>Subtotal:</span><br>$<span class="sum">0</span></p></div></div>');
      $('#menu-favourites').append($item);
    }

    $.ajax({
      method: "GET",
      url: "/api/menu"
    }).done(function(foods) {
      for (let food of foods) {
        let numFavs = $('div.col-sm-12.col-xs-12.favourite-item').length;
        let isFav = 0;
        for (let i = 0; i < numFavs; i++) {
          let currentDiv = $('div.col-sm-12.col-xs-12.favourite-item').eq(i)
          if (food.id == currentDiv.attr('id')) {
            isFav = 1;
          }
        }
        if (isFav === 0) {
          let $item = $('<div>').addClass('col-sm-12 col-xs-12 food-item').attr('id', food.id).html('<div class="row food-item-row"><div class="col-sm-3 col-xs-12 food-item-img"><img src=' + food.imgurl + ' /></div><div class="col-sm-7 col-xs-12 food-item-description"><h3>' + food.name + '</h3><p>' + food.description + '</p></div><div class="col-sm-2 col-xs-12 food-item-qty"><p class="food-item-price">$' + (food.price / 100) + '</p><br><p>Quantity:</p><input class="quantity" type="number" min="0" max="99" name="item_' + food.id + '" value="0"><span class="subtotal"><p>Subtotal:</span><br>$<span class="sum">0</span></p></div></div>');
          if (food.category === "food") {
            $('#menu-food').append($item);
          } else {
            $('#menu-drink').append($item);
          }
        }
      }
    });

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
    $('span.order-total').text(total.toFixed(2));
  }

  getTotal();


  $('div.container').on('change', 'input.quantity', function(event) {
    let qty = $(this).val();
    let price = $('.food-item-price', $(this).parent()).text();
    let value = Number(price.replace("$", "")).toFixed(2);
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

  let name = "#total";
  let menuYloc = null;
  menuYloc = parseInt($(name).css("top").substring(0, $(name).css("top").indexOf("px")));

  $(window).scroll(function() {
    var offset = menuYloc + $(document).scrollTop() + "px";
    $(name).animate({ top: offset }, { queue: false });
  });

function hideShow() {
    let btn = $('button.socialmedia').siblings();
    if (btn.is(':visible')) {
        btn.hide();
    } else {
        btn.hide();
    }
}

  $('button.socialmedia').on('click', function(event){
    event.preventDefault();
    if($(this).siblings().is(":visible")){
      // $(this).siblings().animate({width: 'toggle'})
      $(this).siblings().slideUp('fast');
    } else {
      $(this).siblings().slideDown('fast');
      // $(this).siblings().animate({width: 'toggle'})
    }
  })

  $(window).resize(function() {
  if ($(this).width() < 1000) {
    $('ul.icon-bar li').hide();
  } else {
    $('ul.icon-bar li').show();
    }
});


});
