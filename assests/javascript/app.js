$(document).ready(function () {
  $(document).on("click", ".giphy-btn", displayGiphyAwesome);
  $(document).on("click", ".gif-img", test);
  var topics = ['Capatin Marvel', 'Thanos', 'Thor', 'Tony Stark', 'Winter Solider', 'Spider Man', 'Death', 'Wonder Woman', 'Super Man'];

  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass(" btn btn-primary mr-1 giphy-btn");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#buttons-view").append(a);
    };
  };

  $("#add-giphy").on("click", function (event) {
    event.preventDefault();
    var gif = $("#giphy-input").val().trim();
    topics.push(gif);
    renderButtons();
  });



  renderButtons();

  function displayGiphyAwesome() {

    var limit = "10"
    var rating = "";
    var searchQuery = $(this).attr("data-name");
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=03ykwZRIcUljk2ki7d4lwshpGBOYOHvc&q=' + searchQuery + ' &limit=' + limit + '&offset=0&rating=' + rating + '&lang=en';
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var giphyDiv = $("<div class='flex-wrap'>")
        var giphyImage = $("<img>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        giphyImage.attr("class", 'gif-img')
        giphyImage.attr("src", results[i].images.fixed_height_still.url);
        giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
        giphyImage.attr("data-animate", results[i].images.fixed_height.url);
        giphyImage.attr("data-state", 'still');
        giphyDiv.append(giphyImage);
        giphyDiv.append(p);
        
        $("#giphy").prepend(giphyDiv);
      }
    });
  };

  function test() {
    console.log('click works');
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    // var giphyMovie = 
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    };
  };
});