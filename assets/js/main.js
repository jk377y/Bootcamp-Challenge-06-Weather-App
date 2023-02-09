// Powered by OpenWeatherMap.org
const API_KEY = "d01afd2806e508d282da4f840dd4696a";// API key for OpenWeatherMap API
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;// API URL for OpenWeatherMap API

const cityInput = document.querySelector("#cityInput");// get the city input element
const searchBtn = document.querySelector("#searchBtn");// get the search button element
const currentCity = document.querySelector("#currentCity");// get the current city element
const currentDate = document.querySelector("#currentDate");// get the current date element
const currentIcon = document.querySelector("#currentIcon");// get the current icon element
const currentTemp = document.querySelector("#currentTemp");// get the current temperature element
const currentHumidity = document.querySelector("#currentHumidity");// get the current humidity element
const currentWind = document.querySelector("#currentWind");// get the current wind element
const forecast = document.querySelector("#forecast");// get the forecast element
const searchHistory = document.querySelector("#searchHistory");// get the search history element
const clearHistoryBtn = document.querySelector("#clearHistoryBtn");// get the clear history button element

searchBtn.addEventListener("click", function(event) {// this is the event listener for the search button
    event.preventDefault();// prevent default behavior of the click event
    searchWeather(cityInput.value);// search for weather of the city inputted by the user when the search button is clicked
    });
    
searchHistory.addEventListener("click", function(event) {// this is the event listener for the search history
    if (event.target.tagName === "LI") {// if the user clicks on a city in the search history list
    searchWeather(event.target.textContent);// search for weather of the city that was clicked in the search history list
    }
    });

clearHistoryBtn.addEventListener('click', () => {// this is the event listener for the clear history button
        searchHistory.innerHTML = '';// clear the history list
        localStorage.removeItem('history');// remove the history from local storage
});

function searchWeather(city) {// this function searches for weather of the city inputted by the user
    fetch(`${API_URL}&q=${city}`)// fetch the weather data from the API using the city inputted by the user and the API key
    .then(response => response.json())// convert the response to JSON
    .then(data => {// this is the callback function that will be executed when the response is received from the API 
    const current = data;// get the current weather data from the response
    // const cityName = data.city.name;
    const future = [];// create an empty array to store the future weather data
    for (let i = 7; i < data.list.length; i += 8) {// loop through the list array and get the weather data from index 7, 15, 23, 31, 39; these are times of the day that are 3 hours apart written this way due to the way the API is set up
        future.push(data.list[i]);// push the weather data into the future array
    }
    displayCurrentWeather(current);// call the function to display current weather information 
    displayForecastWeather(future);// call the function to display future weather information
    updateSearchHistory(city);// call the function to update the search history
    });
    }

function displayCurrentWeather(weather) {// this function displays the current weather information
    currentCity.textContent = `${weather.city.name}`;// set the text content of the current city element to the name of the city
    currentDate.textContent = formatDate(weather.list[0].dt * 1000);// set the text content of the current date element to the current date of the weather data
    currentIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`);// set the src attribute of the current icon element to the icon of the weather data received from the API
    var temperature = kelvinToFahrenheit(weather.list[0].main.temp);// set the text content of the current temperature element to the temperature of the weather data received from the API; this is received in Kelvin but I am going to convert it to Fahrenheit 
    var roundedTemperature = temperature.toFixed(1);// round the temperature to 1 decimal place
    currentTemp.textContent = `Temperature: ${roundedTemperature}°F`;// set the modified temp value to the text content of the current temperature element
    currentHumidity.textContent = `Humidity: ${weather.list[0].main.humidity}%`;// set the text content of the current humidity element to the humidity of the weather data received from the API
    currentWind.textContent = `Wind Speed: ${weather.list[0].wind.speed} MPH`;// set the text content of the current wind element to the wind speed of the weather data received from the API
    console.log(weather);
    }

function displayForecastWeather(weathers) {// this function displays the future weather information
    forecast.innerHTML = "";// set the inner HTML of the forecast element to an empty string
    weathers.forEach(weather => {// loop through the future weather data
        const day = document.createElement("div");// create a div element to store the weather data for each day
        day.classList.add("day");// add the class day to the div element
        var temperature = kelvinToFahrenheit(weather.main.temp);
        var roundedTemperature = temperature.toFixed(1);
        day.innerHTML = // set the inner HTML of the div element to the following HTML

        //! the following 5 lines of comments are referring to the template literal below
        // format the date of the weather data received from the API
        // set the src attribute of the image element to the icon of the weather data received from the API
        // set the text content of the p element to the temperature of the weather data received from the API and convert the temperature from Kelvin to Fahrenheit and rounded to the nearest tenth decimal place
        // set the text content of the p element to the wind speed of the weather data received from the API
        // set the text content of the p element to the humidity of the weather data received from the API
        `
        <p>${formatDate(weather.dt * 1000)}</p> 
        <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">
        <p>Temperature: ${roundedTemperature}°F</p> 
        <p>Wind Speed: ${weather.wind.speed} MPH</p>
        <p>Humidity: ${weather.main.humidity}%</p>
        `
        ;
        forecast.appendChild(day);// append the div element to the forecast element
    });
    }

function updateSearchHistory(city) {// this function updates the search history
    let cities = JSON.parse(localStorage.getItem("cities")) || [];// get the cities array from local storage or create an empty array if it doesn't exist
    if (!cities.includes(city)) {// if the city inputted by the user is not in the cities array
        cities.push(city);// push the city inputted by the user into the cities array
        if (cities.length > 5) {// if the cities array has more than 5 cities in it then remove the first city in the array to limit the search history to 5 cities
        cities.splice(0, cities.length - 5);// remove the first city in the array so only the most recent 5 cities are in the array
        }
        localStorage.setItem("cities", JSON.stringify(cities));// set the cities array in local storage to the cities array
    }
    renderSearchHistory();// call the function to render the search history list 
    }

function renderSearchHistory() {// this function renders the search history list
let cities = JSON.parse(localStorage.getItem("cities")) || [];// get the cities array from local storage or create an empty array if it doesn't exist
searchHistory.innerHTML = "";// set the inner HTML of the search history element to an empty string
cities.forEach(city => {// loop through the cities array
    const cityItem = document.createElement("li");// create a list item element
    cityItem.textContent = city;// set the text content of the list item element to the city in the cities array
    searchHistory.appendChild(cityItem);// append the list item element to the search history element
});
}

function kelvinToFahrenheit(temp) {// this function converts the temperature from Kelvin to Fahrenheit
return ((temp - 273.15) * 9) / 5 + 32;// return the value the formula converts from Kelvin to Fahrenheit
}

function formatDate(date) {// this function formats the date of the weather data received from the API
const d = new Date(date);// create a new date object using the date parameter
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];// create an array of months
const month = months[d.getMonth()];// get the month from the date object
const day = d.getDate();// get the day from the date object
const year = d.getFullYear();// get the year from the date object
return `${month} ${day}, ${year}`;// return the formatted date to render as the current date in the current weather section as MM DD, YYYY format
}
