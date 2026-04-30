const API_KEY = "ac7b354b63d3abadbf23320a911ec7ab";


const btn = document.getElementById("btn");
const input = document.getElementById("city-input");

const currentDiv = document.getElementById("current");
const forecastDiv = document.getElementById("forecast");

btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (!city) return;

  getCurrentWeather(city);
  getForecast(city);
});


function getCurrentWeather(city) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      currentDiv.innerHTML = `
        <div class="card">
          <h2>${data.name}</h2>
          <p> ${Math.round(data.main.temp)}°C</p>
          <p>${data.weather[0].description}</p>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        </div>
      `;
    }
  };

  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`,
    true
  );
  xhr.send();

}


async function getForecast(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pl`
    );

    const data = await res.json();
    console.log(data);
    forecastDiv.innerHTML = "";

    data.list.forEach(item => {
      const date = new Date(item.dt_txt);

      const card = document.createElement("div");
      card.className = "small-card";

      card.innerHTML = `
        <p>${date.toLocaleDateString('pl-PL')}</p>
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
        <p>${Math.round(item.main.temp)}°C</p>
        <p>${item.weather[0].description}</p>
      `;

      forecastDiv.appendChild(card);
    });

  } catch (err) {
    console.error(err);
  }
}
