"use strict"

// Import cities
import { cities } from "./cityData.js";

// Add event listener, run function DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  const citySelect = document.getElementById("citySelect");
  const weatherTable = document.getElementById("weatherTable");
  const weatherTableBody = weatherTable.getElementsByTagName("tbody")[0];

  // Loop through each city, populate dropdown menu
  cities.forEach(city => {
      const option = document.createElement("option");
      option.value = city.name;
      option.textContent = city.name;
      citySelect.appendChild(option);
  });

  // Adding an event listener to the city select dropdown for the 'change' event
  citySelect.addEventListener("change", async (event) => {
    // Finding the selected city from the cities array based on the dropdown's value
    const selectedCity = cities.find(city => city.name === event.target.value);
    if (selectedCity) {
      // Constructing the URL to fetch weather station data based on the city's coordinates
        const stationLookupUrl = `https://api.weather.gov/points/${selectedCity.latitude},${selectedCity.longitude}`;
        try {
          // Fetching the weather station data from the API
            const response = await fetch(stationLookupUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Parsing the JSON response to get the data
            const data = await response.json();
            // Extracting the URL for the weather forecast from the response data
            const weatherUrl = data.properties.forecast;
            // Fetching the weather data from the extracted URL
            getWeather(weatherUrl);
        } catch (error) {
          // Logging any errors that occur during the fetch
            console.error("Error fetching station lookup data:", error);
        }
    }
});

//fetch and display the weather data
async function getWeather(weatherUrl) {
  try {
     // Parsing the JSON response (get weather data)
      const response = await fetch(weatherUrl);
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const forecastArray = data.properties.periods;
      displayWeather(forecastArray);
  } catch (error) {
      console.error("Error fetching weather data:", error);
  }
}

  function displayWeather(forecastArray) {
      weatherTableBody.innerHTML = "";
      forecastArray.forEach(period => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${period.name}</td>
              <td>${period.temperature} ${period.temperatureUnit}</td>
              <td>${period.windDirection} ${period.windSpeed}</td>
              <td>${period.shortForecast}</td>
          `;
          weatherTableBody.appendChild(row);
      });
  }
});