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
