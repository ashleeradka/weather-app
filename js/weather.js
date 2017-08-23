var x = document.getElementById("info");
var lat;
var lon;
var api = "https://fcc-weather-api.glitch.me/api/current?";
var weatherAPI;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function weatherURL(lon,lat){
  return "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    weatherAPI = weatherURL(lon,lat);
    openRequest(weatherAPI);
}

var request = new XMLHttpRequest();

function openRequest(weatherAPI){
  request.open('GET', weatherAPI);
}

function sendRequest() {
  request.send();
}

request.onreadystatechange = function () {
  if (request.readyState === 4) {
    var weatherData = JSON.parse(request.responseText);
    console.log(weatherData);
    var tempC = Math.round(weatherData.main.temp);
    var tempF = Math.round(weatherData.main.temp * 1.8 + 32);
    document.getElementById("weather").innerHTML = weatherData.name + "'s current temperature is " + tempF + "&deg;F with " + weatherData.weather[0].description + ".";
    var parent = document.getElementById("weather");
    parent.append(document.createElement("img"));

    console.log(tempF);
  }
};
