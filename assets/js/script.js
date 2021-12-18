var weatherContainerEl = document.querySelector("#current-weather");
var searchHistory;
var weather = {
  apikey: "6dfa15736b70227566594b9d43d5c411",
  fetchWeather: function (city) {
    fetch (
      "https://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      + "&units=imperial&appid=" 
      + this.apikey

    ).then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data) {
    var { name } = data;
    var { icon, description } = data.weather[0];
    var { temp, humidity } = data.main;
    var { speed } = data.wind;
    var { lat, lon } = data.coord;
    document.querySelector(".city").innerText = name;
    document.querySelector(".description").innerText = description;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
    document.querySelector(".temp").innerText = temp + "F";
    document.querySelector(".humidity").innerText = humidity +"%";
    document.querySelector(".wind").innerText = speed +"mph";
    //call for UV Index variable
    getUvIndex(lat, lon);
  }, 
  search: function () {
    var cityInput = document.querySelector(".search-bar").value
    searchHistory = cityInput
    this.fetchWeather(cityInput);
  },
};



//variable function for UV index to get data for lat,lon
var getUvIndex = function (lat, lon) {
  var apiKey2 = "6dfa15736b70227566594b9d43d5c411";
  var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely,alerts&appid=${apiKey2}`;
  //fetch for the open weather map API with lat and lon parameters
  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      var { uvi } = data.current;
     var uv = document.querySelector("#uvi");
     uv.innerText = uvi;
      if (uvi <= 2) {
        uv.classList.add("favorable");
      } else if (uvi > 2 && uvi <= 8) {
        uv.classList.add("moderate");
      } else if (uvi > 8) {
        uv.classList.add("severe");
      };
      fiveDayForecast(lat, lon, apiKey2);

    });
  });
};
var fiveDayDiv = document.getElementById("five-day");

var fiveDayForecast = function (lat, lon, apikey2) {
var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey2}`;
fetch(apiURL).then(function (response) {
  response.json().then(function (data) {
    while(fiveDayDiv.firstChild) {
      fiveDayDiv.removeChild(fiveDayDiv.firstChild);
    }
    for (let i = 0; i < data.list.length; ) {

      var dailyDiv = document.createElement("div");
      dailyDiv.classList.add("col-2");
      fiveDayDiv.appendChild(dailyDiv);

      // Display Date
      var dailyDate = document.createElement("div");
      var dateDisplay = data.list[i].dt_txt;
      dateDisplay = dateDisplay.split(" ")[0]
      dailyDate.innerHTML = dateDisplay;
      dailyDiv.appendChild(dailyDate);

      // Display Icon
      var dailyIcon = document.createElement("img");
      iconData = data.list[i].weather[0].icon;
      dailyIcon.setAttribute("src", "https://openweathermap.org/img/wn/"+ iconData + "@2x.png");
      console.log(dailyIcon);
      dailyDiv.appendChild(dailyIcon);

      var dailyTemp = document.createElement("div");
      dailyDiv.appendChild(dailyTemp);

      var dailyWind = document.createElement("div");
      dailyDiv.appendChild(dailyWind);

      var dailyHumid = document.createElement("div");
      dailyDiv.appendChild(dailyHumid);

      i = i + 8
    }
  });
});
}

document.querySelector("#search").addEventListener("click", function () {
  weather.search();
  console.log("click")
});

// document.querySelector(".search-bar").addEventListener("keypress", function (event) {
//     if (event.key === "enter") {
//       weather.search();
//     }
//   });

  // weather.fetchWeather("Salt lake city");

var timeDisplay = moment();
var timeContainer = $("#currentDay");
timeContainer.append(timeDisplay.format("dddd, MMMM Do YYYY, h:mm:ss a"));