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
    console.log(name,icon,description,temp,humidity,speed);
    document.querySelector("city")
  }
};