

// add event listener to search button
$("#input-search").on("click",function(event){
    event.preventDefault();
    console.log("clicked");
    var cityName = $("#userInput").val();
    console.log(cityName);

    $("#right-panel-top").append(cityName);
    // var apiKey = "c47a977ce2245fa14b93cb800e8c8a50";


    // var location = $(this).attr("input");
    //   var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    //   $.ajax({
    //     url: queryURL,
    //     method: "GET"
    //   })
    //     .then(function(response) {
    //       var results = response.data;

    //       for (var i = 0; i < results.length; i++) {
    //         var gifDiv = $("<div>");

    //         var rating = results[i].rating;

    //         var p = $("<p>").text("Rating: " + rating);

    //         var personImage = $("<img>");
    //         personImage.attr("src", results[i].images.fixed_height.url);

    //         gifDiv.prepend(p);
    //         gifDiv.prepend(personImage);

    //         $("#gifs-appear-here").prepend(gifDiv);
        //   }
        // });
    });

