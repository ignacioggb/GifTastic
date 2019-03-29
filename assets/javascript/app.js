
      var topics = ["Soccer", "Football", "Boxing", "Karate", "Baseball"];
var flag =false;

        function displayMovieInfo() {
        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=iTv7xb6X5J7LZqreUYQzxByHl6upUutx&q="+gif+"&limit=10&offset=0&rating=G&lang=en";

        //queryURL.done(function(data) { console.log("success got data", data); });
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          $("#movies-view").empty();
            console.log(response.data[0].images);
            console.log(response.data.length);

          
          for (let index = 0; index < response.data.length; index++) {
            var image=$("<img>");
            image.addClass("gifs");
            image.attr("src",response.data[index].images.original_still.url);
            image.attr("id","gif-"+index);
            image.prependTo("#movies-view"); 
          }

          $(".gifs").on("click", function(event) {

            var id2text = this.id;
            var number =  id2text.split("-")[1];
            if(flag==false){
              $("#"+id2text).attr("src",response.data[number].images.original.url);
              flag=true;
            }
            else{
              $("#"+id2text).attr("src",response.data[number].images.original_still.url);
              flag=false;
            }
                   });

        });

      }

      // Function for displaying movie data
      function renderButtons() {
        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("movie");
          a.addClass("btn btn-primary");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add movie button is clicked
      $("#add-gif").on("click", function(event) {
  
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var movie = $("#movie-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieInfo);


      // Calling the renderButtons function to display the intial buttons
      renderButtons();

