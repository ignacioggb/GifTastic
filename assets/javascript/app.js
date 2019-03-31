
      var topics = ["Soccer", "Football", "Boxing", "Karate", "Baseball"];
      var favs = []; j=0;
        var flag =false; var current="";var info = "";

        function displayMovieInfo() {
        var gif = $(this).attr("data-name");
        current=gif;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=iTv7xb6X5J7LZqreUYQzxByHl6upUutx&q="+gif+"&limit=10&offset=0&lang=en";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          $("#gif-view").empty();
          for (let index = 0; index < response.data.length; index++) {
            var image=$("<img>");
            image.addClass("gifs");
            image.attr("src",response.data[index].images.original_still.url);
            image.attr("id","gif-"+index);
            image.attr("data-toggle","tooltip");
            image.attr("title","Rating: "+response.data[index].rating);
            image.prependTo("#gif-view"); 
          }


          $('[data-toggle="tooltip"]').tooltip(); 

          $(".gifs").on("click", function(event) {
            var id2text = this.id; 
            var number =  id2text.split("-")[1];
           
            if(flag==false){
              $("#"+id2text).attr("src",response.data[number].images.original.url);
              info = response.data[number].images.original.url;
              setTimeout(save, 2000);
              flag=true;
            }
            else{
              $("#"+id2text).attr("src",response.data[number].images.original_still.url);
              flag=false;
            }

                   });
        });
      }

      function renderButtons() {
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

      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var movie = $("#topic-input").val().trim();

        topics.push(movie);
        renderButtons();
      });

      $("#add-extra").on("click", function(event) {
        event.preventDefault();
        var num = $("#numberof-input").val();
        console.log(num);
        extra(num);
      });

      $(document).on("click", ".movie", displayMovieInfo);
      renderButtons();

      function extra(num) {
        var gif = current;
        var newnum = parseInt(num);
        var newnumint = newnum + 10;
        console.log(newnumint);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=iTv7xb6X5J7LZqreUYQzxByHl6upUutx&q="+gif+"&limit="+newnumint+"&offset=0&lang=en"; //NUM
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          for (let index = num; index < response.data.length; index++) {
            var image=$("<img>");
            image.addClass("gifs");
            image.attr("src",response.data[index].images.original_still.url);
            image.attr("id","gif-"+index);
            image.attr("data-toggle","tooltip");
            image.attr("title","Rating: "+response.data[index].rating);
            image.prependTo("#gif-view"); 
          }

          $('[data-toggle="tooltip"]').tooltip(); 

          $(".gifs").on("click", function(event) {
            var id2text = this.id;
            var number =  id2text.split("-")[1];
            if(flag==false){
              $("#"+id2text).attr("src",response.data[number].images.original.url);
              info = response.data[number].images.original.url;
              setTimeout(save, 2000);
              flag=true;
            }
            else{
              $("#"+id2text).attr("src",response.data[number].images.original_still.url);
              flag=false;
            }
                   });
        });
      }

      $("#favs").on("click", function(event)
{
        $("#gif-view").empty();
        for (let index = 0; index < favs.length; index++) {
          var image=$("<img>");
          image.addClass("gifs");
          image.attr("src",favs[index]);
          image.attr("id","gif-"+index);
          image.prependTo("#gif-view"); 
        }
      });
      function save(){
        if(confirm("save to favs?")){alert("succefully saved");favs.push(info);j++;}else{alert("not saved");}
      }
