const myApiKey = "993b7e8471f404536c7f8a5fa2b17df5"
var btn = document.getElementById("searchbtn")
var city = document.getElementById("city")
var key = "cityname";
var cityArray = JSON.parse(localStorage.getItem(key))||[];
var weatherHisDiv = document.getElementById('weatherHis');

  function searchWeather() {
    var city = document.getElementById('cityName').value;
    fetchweather(city);
    console.log(city);
    cityArray.push(city);
    localStorage.setItem(key, JSON.stringify(cityArray));
    cityArray = JSON.parse(localStorage.getItem(key));
    displayWeatherHistory()
  }
  function displayWeatherHistory() {
    weatherHisDiv.textContent=''

    cityArray.forEach(function(city){
      var button = document.createElement("button");
      button.style.backgroundColor='lightblue';
      document.body.appendChild(button);
      button.innerText = city;
      button.addEventListener("click",() => {fetchweather(city)});
      weatherHisDiv.appendChild(button);
    })
  }
  btn.addEventListener("click",searchWeather);
    displayWeatherHistory()
  
function fetchweather(city) {

  var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + myApiKey;

   fetch(weatherUrl)
       .then(function (response) {
           if (!response.ok) {
               throw response.json();
           }
           return response.json();
       })
       .then(function (weatherRes) {
          var weatherArray = weatherRes.list;

           var oldDate = weatherArray[0].dt_txt.split(" ")[0];
           var newDate;
          var weatherHTML= "<table <tr><td colspan='5'>";
           weatherHTML += "<table border='10' >";          
           weatherHTML += "<tr><td>" + city + " (" + oldDate + ")<img src='http://openweathermap.org/img/wn/" + weatherArray[0].weather[0].icon + ".png'></img></td></tr>";
          weatherHTML += "<tr><td>Temp: " + weatherArray[0].main.temp + "&#176;F</td></tr>";
           weatherHTML += "<tr><td>Wind: " + weatherArray[0].wind.speed + " MPH </td></tr>";
           weatherHTML += "<tr><td>Humidity: " + weatherArray[0].main.humidity + "%</td></tr>";
          weatherHTML += "</table>";
           weatherHTML += "</td></tr><tr><td colspan='5'>5-Day Forecast:</td></tr><tr>";

           for (let i = 0; i < weatherArray.length; i++) {

               newDate = weatherArray[i].dt_txt.split(" ")[0];

          if (oldDate != newDate) {
             weatherHTML += "<td><table border='1'>";
                  weatherHTML += "<tr><td>" + newDate + "</td></tr>";
                  weatherHTML += "<tr><td><img src='http://openweathermap.org/img/wn/" + weatherArray[i].weather[0].icon + ".png'></img></td></tr>";
                  weatherHTML += "<tr><td>Temp: " + weatherArray[i].main.temp + "&#176;F</td></tr>";
                  weatherHTML += "<tr><td>Wind: " + weatherArray[i].wind.speed + " MPH </td></tr>";
                   weatherHTML += "<tr><td>Humidity: " + weatherArray[i].main.humidity + "%</td></tr>";
                   weatherHTML += "</table></td>";

                  oldDate = newDate;
               }
           }
 document.getElementById("weatherForecast").innerHTML = weatherHTML;
})}

