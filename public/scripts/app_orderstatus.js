// jshint esversion: 6
// "use strict";

$(() => {
  $.ajax({
    method: "GET",
    url: "api/orderstatus/2"
  }).done((orders) => {
    for (let order of orders) {
      console.log(order);
      if (order.imgurl) {
        $("<div>").text(order.name).appendTo($("body"));
        $('body').append(`<img src="${order.imgurl}" height="120px" width="120px">`);
        $("<div>").text(order.count).appendTo($("body"));
      } else {
        $("<div>").text(`Hi ${order.name}! Here's your order:`).appendTo($("body"));
        $("h1").append(`${order.id} Status:`);
      }
    }
  });
});
