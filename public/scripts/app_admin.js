// jshint esversion: 6
// "use strict";

// All functions called in this file are defined in helpers.js
$(function() {

  popup();

  function popup() {
    $("#logindiv").css("display", "block");
    $("h1").hide();
    $('.container').css("display", "none");
  }


  $("#loginbtn").click(function() {
    var name = $("#username").val();
    var password = $("#password").val();
    if (username == "" || password == "") {
      alert("Username or Password was Wrong");
    } else {
        $("#logindiv").css("display", "none");
        $(this).parent().parent().hide();
        $("h1").show();
        $('.container').css("display", "block");
    }
  });

  loadOrders();

  $("#admin-list").on("submit", "#Confirmed", function(event) {
    event.preventDefault();
    let id = $(this).children('button').attr('id');
    let minutes = $(this).serialize().replace("eta=", "");
    let name = $(this).parent().prev().prev().prev().children('h4').attr('customer');
    let status = $(this).attr("id");
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

  $("#admin-list").on("submit", "#Ready", function(event) {
    event.preventDefault();
    let data = {
      id: $(this).children('button').attr('id'),
      status: $(this).attr("id")
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

  $("#admin-list").on("submit", "#picked-up", function(event) {
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

  $("#admin-list").on("submit", "#picked-up", function(event) {
    event.preventDefault();
    // let data = {
    //   id: $(this).children('button').attr('id'),
    //   status: $(this).attr("id"),
    // };

    $.ajax({
      method: "GET",
      url: "/api/admin",
      // data: data,
      success: function(result) {
        loadOrders();
      },
      error: function(err) {
        console.error(err);
      }
    });
  });

});
