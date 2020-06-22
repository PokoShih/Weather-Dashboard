// add event listener to search button
$("#input-search").on("click", function (event) {
    $("#right-panel-top").empty();
    $("#right-panel-bottom").empty();
    event.preventDefault();
    retrieve();
})

$(document).on("click", ".newButtons", historySearch);

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
            var condition = response.weather[0].description;
            var conditionIconCurrent = response.weather[0].icon;
            var conditionIcon = "http://openweathermap.org/img/wn/" + conditionIconCurrent + "@2x.png";
            var pasteT = "Temperature: " + temperature + " &#730C<br>" +
                "Humidity: " + humidity + " %<br>" +
                "Wind speed: " + windSpeed + " KMh<br>";
            $("#right-panel-top").append("<h2>" + cityName + "</h2>" + "<img class=\"conditionIcon\" src=" + conditionIcon + ">" + condition + "<br>");
            $("#right-panel-top").append(pasteT);
            var cityLat = response.coord.lat;
            var cityLon = response.coord.lon;
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + apiKey;
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    var uvVal = response.value;
                    $("#right-panel-top").append("<div class=\"uvVal\">" + "UV Index: " + uvVal + "</div>");
                    if (uvVal < 2) {
                        $(".uvVal").css("background-color", "green",);
                        $(".uvVal").css("color", "white");
                    } else if (uvVal >= 2 && uvVal < 5) {
                        $(".uvVal").css("background-color", "yellow");
                        $(".uvVal").css("color", "white");
                    } else if (uvVal >= 5 && uvVal < 7) {
                        $(".uvVal").css("background-color", "orange");
                        $(".uvVal").css("color", "white");
                    } else {
                        $(".uvVal").css("background-color", "red");
                        $(".uvVal").css("color", "white");
                    }
                });
        });
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",au" + "&units=metric&appid=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            $("#right-panel-bottom").append("<div class=\"forecastTitle\" >5Day Forecast</div>" + "<br>" + "<div class=\"follow\"></div>");
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


function historySearch() {
    $("#right-panel-top").empty();
    $("#right-panel-bottom").empty();
    var cityName = $(this).val();
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
            var condition = response.weather[0].description;
            var conditionIconCurrent = response.weather[0].icon;
            var conditionIcon = "http://openweathermap.org/img/wn/" + conditionIconCurrent + "@2x.png";
            var pasteT = "Temperature: " + temperature + " &#730C<br>" +
                "Humidity: " + humidity + " %<br>" +
                "Wind speed: " + windSpeed + " KMh<br>";
            $("#right-panel-top").append("<h2>" + cityName + "</h2>" + "<img class=\"conditionIcon\" src=" + conditionIcon + ">" + condition + "<br>");
            $("#right-panel-top").append(pasteT);
            var cityLat = response.coord.lat;
            var cityLon = response.coord.lon;
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + apiKey;
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    var uvVal = response.value;
                    $("#right-panel-top").append("<div class=\"uvVal\">" + "UV Index: " + uvVal + "</div>");
                    if (uvVal < 2) {
                        $(".uvVal").css("background-color", "green",);
                        $(".uvVal").css("color", "white");
                    } else if (uvVal >= 2 && uvVal < 5) {
                        $(".uvVal").css("background-color", "yellow");
                        $(".uvVal").css("color", "white");
                    } else if (uvVal >= 5 && uvVal < 7) {
                        $(".uvVal").css("background-color", "orange");
                        $(".uvVal").css("color", "white");
                    } else {
                        $(".uvVal").css("background-color", "red");
                        $(".uvVal").css("color", "white");
                    }
                });
        });
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",au" + "&units=metric&appid=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            $("#right-panel-bottom").append("<div class=\"forecastTitle\" >5Day Forecast</div>" + "<br>" + "<div class=\"follow\"></div>");
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