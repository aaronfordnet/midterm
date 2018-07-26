$(() => {

  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

  $.ajax({
    method: "GET",
    url: "/api/orders"
  }).done((orders) => {
    console.log(orders[1]);
    for(order of orders) {
      console.log(order);
      if(order.imgurl){
      $("<div>").text(order.name).appendTo($("body"))
      $('body').append(`<img src="${order.imgurl}" height="120px" width="120px">`);
      $("<div>").text(order.count).appendTo($("body"));
    } else{
      $("<div>").text(`Hi ${order.name}! Here's your order:`).appendTo($("body"))
      $("h1").append(`${order.id} Status:`)
    }
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
