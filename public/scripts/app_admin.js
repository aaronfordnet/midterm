// jshint esversion: 6
// "use strict";

// All functions called in this file are defined in helpers.js
$(function() {

  popup();

  $("#loginbtn").click(function(e) {
    e.preventDefault();
    var name = $("#username").val();
    var password = $("#password").val();
    if (username == "" || password == "") {
      alert("Username or password is incorrect.");
    } else {
        $("#logindiv").css("display", "none");
        $(this).parent().parent().hide();
        $("h1").show();
        $('.container').css("display", "block");
    }
  });

  loadOrders();
  setInterval(() => {
    loadOrders();
  }, 20000);

  $("#admin-list").on("submit", "form.Confirmed", function(event) {
    event.preventDefault();
    let id = $(this).children('button').attr('id');
    let minutes = $(this).serialize().replace("eta=", "");
    let name = $(this).parent().prev().prev().prev().children('h4').attr('customer');
    let status = $(this).attr("class");
    let data = {
      id: id,
      minutes: minutes,
      status: status,
      name: name
    };

    $.ajax({
      method: "PUT",
      url: "/api/admin/confirm",
      data: data,
      success: function(result) {
        loadOrders();
      },
      error: function(err) {
        console.error(err);
      }
    });
  });

  $("#admin-list").on("submit", "form.Ready", function(event) {
    event.preventDefault();
    let data = {
      id: $(this).children('button').attr('id'),
      status: $(this).attr("class")
    };

    $.ajax({
      method: "PUT",
      url: "/api/admin/ready",
      data: data,
      success: function(result) {
        loadOrders();
      },
      error: function(err) {
        console.error(err);
      }
    });
  });

  $("#admin-list").on("submit", "form.picked-up", function(event) {
    event.preventDefault();
    let data = {
      id: $(this).children('button').attr('id'),
      status: "Picked Up",
    };

    $.ajax({
      method: "PUT",
      url: "/api/admin/pickup",
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
