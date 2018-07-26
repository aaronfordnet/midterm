$(() => {
  $.ajax({
    method: "GET",
    url: "/api/apiroutes"
  }).done((results) => {
    for(result of results) {
      console.log(result);
      $("<div>").text(result.name).appendTo($("body"));
    }
  });
});
