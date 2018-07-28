// jshint esversion: 6
// All functions called in this file are defined in helpers.js
$(function() {

  function createOrder(order, orderItems) {
    // console.log(order);
    const $order = $("<div>").addClass("row admin-item-row");

    const $head = $("<div>").addClass("col-sm-12 col-xs-12 admin-item-head").appendTo($order);
    $("<h4>").attr({ customer: order.name }).text(`Order ${order.id} - ${order.name} - ${order.phone}`).appendTo($head);
    $("<p>").text(`Placed at: ${order.placed_at}`).appendTo($head);

    const $status = $("<div>").addClass("col-sm-12 col-xs-12 admin-item-status").appendTo($order);
    if (order.status === "Placed") {
      $('<h5 class="status"><span class="current">Placed</span> → Confirmed → Ready for Pickup</h5>').appendTo($status);
    } else if (order.status === "Confirmed") {
      $('<h5 class="status">Placed → <span class="current">Confirmed</span> → Ready for Pickup</h5>').appendTo($status);
    } else {
      $('<h5 class="status">Placed → Confirmed → <span class="current">Ready for Pickup</span></h5>').appendTo($status);
    }
    // $().text().appendTo($status);

    const $foods = $("<div>").addClass("col-sm-9 col-xs-12 admin-item-foods").appendTo($order);
    const $ul = $("<ul>").addClass("order-list").appendTo($foods);

    // orderItems.forEach(item => {
    //   let itemcount = 0;
    //   for (let i = 0; i < orderItems.length; i++) {
    //     if (item === orderItems[i]) itemcount++;
    //   }
    // });

    // let filtered = orderItems.filter(item => {
    //   return ;
    // });

    orderItems.forEach(item => {
      $("<li>").text(item.name).appendTo($ul);
    });

    const $confirm = $("<div>").addClass("col-sm-3 col-xs-12 admin-item-confirm").appendTo($order);
    const $form = $("<form>").addClass("admin").appendTo($confirm);
    $("<p>").text("Preparation time:").appendTo($form);
    $("<input>").addClass("eta-time").attr({ id: order.id, type: "number", min: 0, max: 99, name: "eta" }).appendTo($form);
    $("<p>").text("Minutes").appendTo($form);
    $("<button>").addClass("btn btn-primary").attr({ value : "submit" }).text("Confirm Order").appendTo($form);


    // $div.addClass("admin-item-status").appendTo($order);
    // $order.append($div).addClass("admin-item-foods");

    // const $header = $("<header>").appendTo($order);
    // $("<img>").addClass("avatar").appendTo($header);
    // $("<h3>").text(tweet.user.name).appendTo($header);
    // $("<span>").text(tweet.user.handle).appendTo($header);

    // $("<p>").text(tweet.content.text).appendTo($order);

    // const $footer = $("<footer>").appendTo($order);
    // $("<p>").text("hey").appendTo($footer);
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
      loadOrders();
        // console.log(this);
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
