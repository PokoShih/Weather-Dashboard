// add event listener to search button
$("#input-search").on("click", function (event) {
    $("#right-panel-top").empty();
    $("#right-panel-bottom").empty();
    event.preventDefault();
    retrieve();
})

$(document).on("click", ".newButtons",retrieve);

// function that actually GETs the data returning with a response with corresponding citynames
    function retrieve() {
        $("#right-panel-top").empty();
        $("#right-panel-bottom").empty();
        var cityName = $("#userInput").val();
        $(".list-group").append("<button id = \"" + cityName + "\"value=\"" + cityName + "\"type=\"button\" class=\"newButtons\">" + cityName + "</button>");
        var apiKey = "c47a977ce2245fa14b93cb800e8c8a50";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var temperature = response.main.temp;
                var humidity = response.main.humidity;
                var windSpeed = response.wind.speed;
                var condition = response.weather[0].main;
                if (condition == "clouds") {
                    var conditionIcon = "http://openweathermap.org/img/wn/03d@2x.png";
                } else if (condition == "clear") {
                    var conditionIcon = "http://openweathermap.org/img/wn/01d@2x.png";
                } else {
                    var conditionIcon = "http://openweathermap.org/img/wn/09d@2x.png";
                }
                var pasteT = "Temperature: " + temperature + " &#730C<br>" +
                    "Humidity: " + humidity + " %<br>" +
                    "Wind speed: " + windSpeed + " KMh<br>";
                $("#right-panel-top").append("<h2>" + cityName + "</h2>" + "<img class=\"conditionIcon\" src=" + conditionIcon + ">" + condition + "<br>");
                $("#right-panel-top").append(pasteT);
            });
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",au" + "&units=metric&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                $("#right-panel-bottom").append("<h6>5Day Forecast</h6>" + "<div class=\"follow\"></div>" + "<br>");
                for (i = 0; i < response.list.length; i += 8) {
                    var date = response.list[i].dt_txt.slice(0, 11);
                    var temperature = response.list[i].main.temp;
                    var humidity = response.list[i].main.humidity;
                    var weatherMain = response.list[i].weather[0].main;
                    if (weatherMain == "clouds") {
                        var conditionIcon = "http://openweathermap.org/img/wn/03d@2x.png";
                    } else if (weatherMain == "clear") {
                        var conditionIcon = "http://openweathermap.org/img/wn/01d@2x.png";
                    } else {
                        var conditionIcon = "http://openweathermap.org/img/wn/09d@2x.png";
                    }
                    var pasteT = "<div  class=\"col-md-2 dailyForecast\">" + date + "<img class=\"conditionIcon\" src=" + conditionIcon + ">" + weatherMain + "<br>" + "Temp: " + temperature + " &#730C <br>"
                        + "Humidity: " + humidity + "</div>";
                    $(".follow").append(pasteT);
                };
            });
    };