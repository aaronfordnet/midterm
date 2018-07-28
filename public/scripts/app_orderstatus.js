// jshint esversion: 6
// "use strict";

$(() => {
  function getTotal() {
    var total = 0;
    $('.sum').each(function() {
      let amount = Number(this.innerHTML.replace("$",""));
      total += amount
    });
    $('#order-total').text(total.toFixed(2));
  }

  getTotal();

});
