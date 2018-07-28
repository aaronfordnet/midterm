// jshint esversion: 6
// All functions called in this file are defined in helpers.js
$(function() {

  function createOrder(order, orderItems) {
    console.log(order, orderItems);
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
      console.log("order items", orderItems);
      filtered.push(createOrder(order, orderItems));
    });
    return filtered;
  }

  function appendOrders(orderData) {
    $('#admin-list').empty();
    let filtered = filterOrders(orderData);
    console.log("filtered", filtered);
    filtered.forEach(order => {
      console.log(order);
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
    console.log("A submit happened.");
    // console.log(req.body);
  //   var input = event.target.elements.text.value;

  // console.log(this);

  console.log(this);

    // $.getJSON();

    $.ajax({
      method: "POST",
      url: "/api/admin",
      data: $(this).serialize()
    })
    .done(function(orders) {
        console.log(this);
    //   $.ajax({
    //   method: "GET",
    //   url: "/",
    //   data: $(this).serialize()
    // });
      // loadTweets();
      // console.log($(".tweet").find("p"));
      console.log(orders);
      console.log("ajax post");
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

});
