// jshint esversion: 6
// "use strict";

$(() => {
  function getTotal() {
    var total = 0;
    $('.sum').each(function() {
      let amount = Number(this.innerHTML.replace("$",""));
      total += amount;
    });
    $('#order-total').text(total.toFixed(2));
  }

  getTotal();

  setInterval(() => {
    $.ajax({
    method: "GET",
    url: "/orders",
    success: function(res, res) {
      let status = $("span.current").text();
      if (status !== "Picked Up") {
        window.location.reload(true);
      }
    },
    error: function(err) {
      console.error(err);
    }
  });
  }, 20000);

});
