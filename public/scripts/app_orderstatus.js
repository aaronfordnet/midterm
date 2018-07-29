// jshint esversion: 6
// "use strict";

$(function() {
  function getTotal() {
    var total = 0;
    $(".sum").each(function() {
      let amount = Number(this.innerHTML.replace("$",""));
      total += amount;
    });
    $("span.order-total").text(total.toFixed(2));
  }

  getTotal();

  setInterval(function() {
    $.ajax({
    method: "GET",
    url: "/orders",
    success: function(req, res) {
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
