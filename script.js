let weather = {
    apiKey: "9c967f91dda3704a9963f12f55ddea1a",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = "" + description
        
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
}
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");
function updateClock() {
  let now = new Date()
  let dname = now.getDay()
  let dnum = now.getDate()
  let mon = now.getMonth()
  let ye = now.getFullYear()
  let ho = now.getHours()
  let min = now.getMinutes()
  let sec = now.getSeconds()
  let pe = "Am"
  if (ho == 0) {
    ho = 12
    pe = "Pm"
  }
  if (ho>12) {
    ho = ho-12
  }
  let months = ["January", "February" , "March" , "April" , "May", "June" , "July","August","September","October","Nowember","December"]
  let days =  ["Sunday","Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday"];
  let ids = ["dname","dnum" ,"month", "year", "hour", "minute", "second", "pe"];
  let values = [days[dname],dnum,months[mon],ye,ho,min,sec,pe]
  for(let i = 0; i< ids.length; i++)
  document.getElementById(ids[i]).firstChild.nodeValue = values[i]
}
function initClock() {
  updateClock()
  window.setInterval("updateClock()", 1)
}