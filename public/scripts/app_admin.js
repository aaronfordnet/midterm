// jshint esversion: 6
// "use strict";

// All functions called in this file are defined in helpers.js
$(function() {

  loadOrders();

  $("#admin-list").on("submit", "#confirm", function(event) {
    event.preventDefault();
    let id = $(this).children('input').attr('id');
    let minutes = $(this).serialize().replace("eta=", "");
    let name = $(this).parent().prev().prev().prev().children('h4').attr('customer');
    let status = $(this).parent().prev().prev().children('h5').children('span').text();
    let data = {
      id: id,
      minutes: minutes,
      status: status,
      name: name
    };

    $.ajax({
      method: "PUT",
      url: "/api/admin",
      data: data,
      success: function(result) {
        loadOrders();
      },
      error: function(err) {
        console.error(err);
      }

    });
  });
});
