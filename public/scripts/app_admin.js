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
    const $form = $("<form>").addClass("admin").attr({ id: 'confirm'}).appendTo($confirm);
    if(order.status === "Placed"){
    $("<p>").text("Preparation time:").appendTo($form);
    $("<input>").addClass("eta-time").attr({ id: order.id, type: "number", min: 0, max: 99, name: "eta" }).appendTo($form);
    $("<p>").text("Minutes").appendTo($form);
    $("<button>").addClass("btn btn-primary").attr({ value: "submit" }).text("Confirm Order").appendTo($form);
  } else if ( order.status === "Confirmed"){
    $("<p>").text("SMS sent to customer!").appendTo($form);
    $("<span>").addClass("eta-confirmed").text(order.eta).appendTo($form);
    $("<p>").text("Minutes").appendTo($form);
    $("<button>").addClass("btn btn-primary").attr({ value: "submit" }).text("Ready for pickup").appendTo($form);
      }
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


  $("#admin-list").on("submit", "#confirm", function(event) {
    event.preventDefault();
    let id = $(this).children('input').attr('id');
    let minutes = $(this).serialize().replace("eta=", "");
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
      success: function(minutes) {
      }
    })
    location.reload(true);
  });
});
