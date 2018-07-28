// jshint esversion: 6
// All functions called in this file are defined in helpers.js
$(function() {

  function createOrder(order, orderItems) {
    const $order = $("<article>").addClass("order");
    // const $div;

    // var $header = $("<header>").appendTo($tweet);
    // $("<img>").addClass("avatar").attr({src: tweet.user.avatars.small}).appendTo($header);
    // $("<h3>").text(tweet.user.name).appendTo($header);
    // $("<span>").text(tweet.user.handle).appendTo($header);

    // $("<p>").text(tweet.content.text).appendTo($tweet);

    // var $footer = $("<footer>").appendTo($tweet);
    // $("<p>").text(moment(tweet.created_at).fromNow()).appendTo($footer);
    // $('<p><a href="#" class="trash"><i class="fas fa-trash-alt" ></i></a> <i class="fab fa-font-awesome-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></p>').addClass("icons").appendTo($footer);

    return $order;
  }

  function filterOrders(orderData) {
    let filtered = [];
    orderData.orders.forEach(order => {
      const orderItems = orderData.items.filter(function(item) {
        return order.id === item.id;
      });
      filtered.push(createOrder(order, orderItems));
    });
    return filtered;
  }

  function appendOrders(orderData) {
    // $('#admin-list').empty();
    let filtered = filterOrders(orderData);
    filtered.forEach(order => {
      $('#admin-list').append(order);
    });
  }

  function loadOrders() {
    $.ajax({
      method: "GET",
      url: "/api/admin"
    })
    .done(function(orderData) {
      appendOrders(orderData);
    });
  }

  loadOrders();


  $("#confirm").submit(function(event) {
    event.preventDefault();
    let id = $(this).children('input').attr('id');
    let minutes = $(this).serialize().replace("eta=","");
    let name = $(this).parent().prev().prev().prev().children('h4').attr('customer');
    let status = $(this).parent().prev().prev().children('h5').children('span').text();
    console.log(status);
    let data = {
      id: id,
      minutes: minutes,
      status: status,
      name: name
    };
    console.log("Time submited.");

    $.ajax({
      method: "POST",
      url: "/api/admin",
      data: data,
      success: function(minutes){
      }
    })
    // $(this).children('button').text('SMS Sent!');
    // $(this).children('input').hide();
    // $(this).children('p').hide();
    loadOrders();
      return true;

    });

  //   event.target.elements.text.value = "";
  //   $("span.counter").text(140);

  // });

  // loadTweets();

  // $("#compose").on("click", function() {
  //   $("section.new-tweet").slideToggle(400, function() {
  //     $(".new-tweet textarea").focus();
  //   });
  });

