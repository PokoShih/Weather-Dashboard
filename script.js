
// Search bar section for cities.
$("#Melbourne").on("click", function (event) {
    var cityName = this.value;
    var searchUpdate = $("#userInput");
    searchUpdate.val(cityName);
})

// add event listener to search button
$("#input-search").on("click", function (event) {
    $("#right-panel-top").empty();
    $("#right-panel-bottom").empty();
    event.preventDefault();
    var cityName = $("#userInput").val();
    console.log(cityName);
    $(".list-group").append("<input id=\"userInput\" class=\"form-control mr-sm-2\" value=\"" + cityName + "type=\"search\" placeholder=\"Search\" aria-label=\"Search\">");

    var apiKey = "c47a977ce2245fa14b93cb800e8c8a50";

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + apiKey;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var temperature = response.main.temp;
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;
            var condition = response.weather[0].main;
            console.log(response);
            if (condition == "clouds") {
                var conditionIcon = "http://openweathermap.org/img/wn/03d@2x.png";
            } else if (condition == "clear") {
                var conditionIcon = "http://openweathermap.org/img/wn/01d@2x.png";
            } else {
                var conditionIcon = "http://openweathermap.org/img/wn/09d@2x.png";
            }
            console.log(conditionIcon);
            var pasteT = "Temperature: " + temperature + " &#730C <br>" + "<br>" +
                "Humidity: " + humidity + " %<br>" + "<br>" +
                "Wind speed: " + windSpeed + " KMh<br>";
            $("#right-panel-top").append("<h2>" + cityName + "</h2>" + "<img class=\"conditionIcon\" src=" + conditionIcon + ">" + condition + "<br>");
            $("#right-panel-top").append(pasteT);
        });
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",au" + "&units=metric&appid=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            for (i = 0; i < 40; i+=8) {
                var date = response.list[i].dt_txt.slice(0,11);
                console.log(date);
                var temperature = response.list[i].main.temp;
                var humidity = response.list[i].main.humidity;
                var weatherMain = response.list[i].weather[0].main;
                console.log(weatherMain);
                if (weatherMain == "clouds") {
                    var conditionIcon = "http://openweathermap.org/img/wn/03d@2x.png";
                } else if (weatherMain == "clear") {
                    var conditionIcon = "http://openweathermap.org/img/wn/01d@2x.png";
                } else {
                    var conditionIcon = "http://openweathermap.org/img/wn/09d@2x.png";
                }
                var pasteT = "<div class=\"dailyForecast\">" + date + "<img class=\"conditionIcon\" src=" + conditionIcon + ">" + weatherMain + "<br>" + "Temp: " + temperature + " &#730C <br>"
                    + "Humidity: " + humidity + "</div>";
                $("#right-panel-bottom").append(pasteT);
            }

        });
})