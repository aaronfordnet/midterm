// All functions called in this file are defined in helpers.js
$(function() {

  $("#confirm").submit(function(event) {
    event.preventDefault();
    console.log("A submit happened.");
    // console.log(req.body);
  //   var input = event.target.elements.text.value;

  // console.log(this);

    $.ajax({
      method: "POST",
      url: "/admin/",
      data: $(this).serialize()
    })
    .done(function() {
    //   $.ajax({
    //   method: "GET",
    //   url: "/",
    //   data: $(this).serialize()
    // });
      // loadTweets();
      // console.log($(".tweet").find("p"));
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
