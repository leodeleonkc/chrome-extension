"use strict";
const resizeOps = () => {
  document.documentElement.style.setProperty(
    "--vh",
    window.innerHeight * 0.01 + "px"
  );
};

resizeOps();
window.addEventListener("resize", resizeOps);

function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

setInterval(getCurrentTime, 1000);

// Get Weather Function

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `icons/${data.weather[0].icon}.png`;
      document.getElementById("weather-info").innerHTML = `
      <img src="${iconUrl}" alt="" class="Weather Icon" width="60" height="60" />
      <h2 class="temp">${Math.round(data.main.temp)}°</h2>


            `;
    })
    .catch((err) => console.error(err));
});

// Search Function

const search = document.getElementById("g-search");

search.addEventListener("keypress", function (e) {
  if (e.key === "Enter")
    document.location.href = `https://www.google.com/search?q=${search.value}`;
});
