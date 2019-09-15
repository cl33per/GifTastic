$(document).ready(function () {

  // Document Listens for classes to fire off functions
  $(document).on("click", ".giphy-btn", displayGiphyAwesome);
  $(document).on("click", ".gif-img", stillGif);

  // Starting Array for document buttons
  var topics = ['Capatin Marvel', 'Thanos', 'Thor', 'Tony Stark', 'Winter Solider', 'Spider Man', 'Death', 'Wonder Woman', 'Super Man'];

  // Function to render the array above as starting buttons
  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass(" btn btn-primary my-1 mx-1 giphy-btn");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#buttons-view").append(a);
    };
  };

  // Add an additonal button the exisiting array
  $("#add-giphy").on("click", function (event) {    
    event.preventDefault();
    var gif = $("#giphy-input").val().trim();
    topics.push(gif);    
    renderButtons();
  });


  /* Conntects to giphy API and sets the  configuration for the rest of the application, loads gifs with still image as its priary source, and loads the image with attributes of both the still and moving urls 
   */
  
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
      for (var i = 0; i < results.length; i++) {
        var giphyDiv = $("<div class='row flex-wrap bg-light my-5 mx-5'>")
        var giphyImage = $("<img>");
        var giphyInfo = $("<div class='col-lg-6'>")
        var p1 = $("<p>").text("Rating: " + results[i].rating);
        var p2 = $("<p>").text("Title: " + results[i].title);
        var p3 = $("<p>").text("Created: " + results[i].import_datetime);
        giphyImage.attr("class", 'gif-img')
        giphyImage.attr("src", results[i].images.fixed_height_still.url);
        giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
        giphyImage.attr("data-animate", results[i].images.fixed_height.url);
        giphyImage.attr("data-state", 'still');
        giphyDiv.append(giphyImage);
        giphyInfo.append(p1);
        giphyInfo.append(p2);
        giphyInfo.append(p3);
        giphyDiv.append(giphyInfo);
        $("#giphy").prepend(giphyDiv);
      }
    });
  };

  /* Conditional for loaded gifs, if the gifs are in the data-state = still when clicked the state changes to data-state = animate then the src is changed to the animated src.
   */
  function stillGif() {
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    };
  };

  // Function to add 10 more additonal gif to the exsiting query
  $("#add-more").on("click", function () {
    
  });

  // Fires renderButtons Function
  renderButtons();

});