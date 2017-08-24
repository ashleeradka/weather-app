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

function weatherURL(lon, lat) {
  return (
    "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon
  );
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  weatherAPI = weatherURL(lon, lat);
  openRequest(weatherAPI);
}

var request = new XMLHttpRequest();

function openRequest(weatherAPI) {
  request.open("GET", weatherAPI);
}

function sendRequest() {
  request.send();
}

request.onreadystatechange = function() {
  if (request.readyState === 4) {
    var weatherData = JSON.parse(request.responseText);
    var tempC = Math.round(weatherData.main.temp);
    var tempF = Math.round(weatherData.main.temp * 1.8 + 32);
    var currentTime = new Date();
    document.getElementById("info").innerHTML =
      weatherData.name + ", " + weatherData.sys.country;
    document.getElementById("weather").innerHTML = "Temp: " + tempF + "&deg;F";
    document.getElementById("sky").innerHTML =
      weatherData.weather[0].main + ": " + weatherData.weather[0].description;
    document.getElementById("icon").src = weatherData.weather[0].icon;
    background(currentTime.getHours());
  }
};

function changeF() {
  arr = document.getElementById("weather").innerHTML.split(" ");
  temp = arr[1];
  num = temp.split("F")[0].slice(0, -1);
  tempC = Math.round((num - 32) / 1.8);
  arr[1] = tempC + "&deg;" + "C";
  document.getElementById("weather").innerHTML = arr.join(" ");
  document.getElementById("temp").innerHTML = "Change to &deg;F";
  document.getElementById("temp").setAttribute("onclick", "changeC()");
}

function changeC() {
  arr = document.getElementById("weather").innerHTML.split(" ");
  temp = arr[1];
  num = temp.split("C")[0].slice(0, -1);
  tempC = Math.round(num * 1.8 + 32);
  arr[1] = tempC + "&deg;" + "F";
  document.getElementById("weather").innerHTML = arr.join(" ");
  document.getElementById("temp").innerHTML = "Change to &deg;C";
  document.getElementById("temp").setAttribute("onclick", "changeF()");
}

function background(hour) {
  if (hour > 8 && hour < 19) {
    document.getElementById("back").setAttribute("class", "day");
  } else {
    document.getElementById("back").setAttribute("class", "night");
  }
}
