var weatherContainerEl = document.querySelector("#current-weather");
var searchHistory;
var cities = [];
var weather = {
  apikey: "6dfa15736b70227566594b9d43d5c411",
  fetchWeather: function (city) {
    fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apikey
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
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText = humidity +"%";
    document.querySelector(".wind").innerText = speed +"mph";
    //call for UV Index variable
    getUvIndex(lat, lon);
  }, 
  search: function () {
    var cityInput = document.querySelector(".search-bar").value
    this.fetchWeather(cityInput);

    saveCitySearch(cityInput);
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

// 5 Day Forecast Display
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
      dailyDiv.appendChild(dailyIcon);

      // DIsplay Temp
      var dailyTemp = document.createElement("h6");
      dailyTemp.innerHTML = "Temp: " + data.list[i].main.temp + "°F";
      dailyDiv.appendChild(dailyTemp);

      // Display Wind
      var dailyWind = document.createElement("div");
      dailyWind.innerHTML = "Wind: " + data.list[i].wind.speed + "mph";
      dailyDiv.appendChild(dailyWind);

      // Display humidity
      var dailyHumid = document.createElement("div");
      dailyHumid.innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
      dailyDiv.appendChild(dailyHumid);

      i = i + 8
    }
  });
});
}

// adding event listener to search button
document.querySelector("#cityInput").addEventListener("keypress", function (e) {
  if (e.which == 13) {
    document.querySelector("#searchButton").click();
  }
});

document.querySelector("#searchButton").addEventListener("click", function() {
  weather.search();
});

//Adding search history

// var searchList = document.getElementById('searchList');

var createSearchEl = function (city){
  var searchEl = document.createElement("li");
      searchEl.innerHTML = city;
      document.getElementById('searchList').appendChild(searchEl);
};


var saveCitySearch = function (city) {
    cities.push(city)
    localStorage.setItem("city", JSON.stringify(cities));
    createSearchEl(city);
  };

var loadCitySearch = function () {
  var savedCities = localStorage.getItem("city");
  console.log(savedCities);
  if(!savedCities) {
    return false;
  }
  console.log("saved cities found!");

  savedCities = JSON.parse(savedCities);

  for (var i = 0; i < savedCities.length; i++) {
    createSearchEl(savedCities[i]);
  };
  document.getElementById("cityInput").value = savedCities[savedCities.length-1];
  weather.search();
};



loadCitySearch();


//weather.fetchWeather("Salt lake city");

var timeDisplay = moment();
var timeContainer = $("#currentDay");
timeContainer.append(timeDisplay.format("dddd, MMMM Do YYYY, h:mm:ss a"));