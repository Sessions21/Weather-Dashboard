var weatherContainerEl = document.querySelector("#current-weather");
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
    console.log(name,icon,description,temp,humidity,speed,lat,lon);
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
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};


//variable function for UV index to get data for lat,lon
var getUvIndex = function (lat, lon) {
  var apiKey2 = "6dfa15736b70227566594b9d43d5c411";
  var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely,alerts&appid=${apiKey2}`;
  //fetch for the open weather map API with lat and lon parameters
  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      var { uvi } = data.current
      document.querySelector("#uvi").innerText = uvi;
    });
  });
};


  /* // if and else if statements for value on index for weather conditions, numeric amount taken from Open Weather API
  if (index.value <= 2) {
    uvIndexValue.classList = "favorable";
  } else if (index.value > 2 && index.value <= 8) {
    uvIndexValue.classList = "moderate ";
  } else if (index.value > 8) {
    uvIndexValue.classList = "severe";
  };*/

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      weather.search();
    }
  });

  weather.fetchWeather("Salt lake city");

var timeDisplay = moment();
var timeContainer = $("#currentDay");
timeContainer.append(timeDisplay.format("dddd, MMMM Do YYYY, h:mm:ss a"));