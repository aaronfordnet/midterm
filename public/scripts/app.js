$(() => {

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  $.ajax({
    method: "GET",
    url: "/api/orders"
  }).done((orders) => {
    console.log(orders[1]);
    for(order of orders) {
      console.log(order);
      $("<div>").text(order.name).appendTo($("body"))
      $("<div>").text(order.count).appendTo($("body"));
    }
  });;

  // $.ajax({
  //   method: "GET",
  //   url: "/api/foods"
  // }).done((foods) => {
  //   for(food of foods) {
  //     $("<div>").text(food.name).appendTo($("body"));
  //   }
  // });;
});
