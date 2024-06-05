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
    // Finding selected city 
    const selectedCity = cities.find(city => city.name === event.target.value);
    if (selectedCity) {
      // URL fetches weather station data
        const stationLookupUrl = `https://api.weather.gov/points/${selectedCity.latitude},${selectedCity.longitude}`;
        try {
          // Fetches weather station data from API
            const response = await fetch(stationLookupUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Parsing the JSON (response to get the data)
            const data = await response.json();
            // Extraces URL for weather forecast
            const weatherUrl = data.properties.forecast;
            // Fetches weather data from URL
            getWeather(weatherUrl);
        } catch (error) {
          // possible errors
            console.error("Error fetching station lookup data:", error);
        }
    }
});

//fetch and display the weather data
async function getWeather(weatherUrl) {
  try {
     // Fetches weather data from URL
      const response = await fetch(weatherUrl);
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      // Parsing the JSON response (get weather data)
      const data = await response.json();
      //Extracts forecast periods array from response data
      const forecastArray = data.properties.periods;
      // Displays weather data in table
      displayWeather(forecastArray);
  } catch (error) {
    // possible errors
      console.error("Error fetching weather data:", error);
  }
}

//display weather data in table
  function displayWeather(forecastArray) {
    // Clear existing rows in table body
      weatherTableBody.innerHTML = "";
       // Looping through each period
      forecastArray.forEach(period => {
        // Creates new table row element
          const row = document.createElement("tr");
          // Sets inner HTML of row (weather data for the period)
          row.innerHTML = `
              <td>${period.name}</td>
              <td>${period.temperature} ${period.temperatureUnit}</td>
              <td>${period.windDirection} ${period.windSpeed}</td>
              <td>${period.shortForecast}</td>
          `;
          // Appending row to table body
          weatherTableBody.appendChild(row);
      });
  }
});