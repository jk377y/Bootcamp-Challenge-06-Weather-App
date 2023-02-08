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

searchBtn.addEventListener("click", function(event) {// this is the event listener for the search button
    event.preventDefault();// prevent default behavior of the click event
    searchWeather(cityInput.value);// search for weather of the city inputted by the user when the search button is clicked
    });
    
    searchHistory.addEventListener("click", function(event) {// this is the event listener for the search history
    if (event.target.tagName === "LI") {// if the user clicks on a city in the search history list
    searchWeather(event.target.textContent);// search for weather of the city that was clicked in the search history list
    }
    });

function searchWeather(city) {// this function searches for weather of the city inputted by the user
    fetch(`${API_URL}&q=${city}`)// fetch the weather data from the API using the city inputted by the user and the API key
    .then(response => response.json())// convert the response to JSON
    .then(data => {// this is the callback function that will be executed when the response is received from the API 
    const current = data.list[0];// get the current weather data from index 0 of the list array
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
    currentCity.textContent = weather.name;// set the text content of the current city element to the name of the city
    currentDate.textContent = formatDate(weather.dt * 1000);// set the text content of the current date element to the current date of the weather data
    currentIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);// set the src attribute of the current icon element to the icon of the weather data received from the API
    currentTemp.textContent = `Temperature: ${kelvinToFahrenheit( weather.main.temp )}°F`;// set the text content of the current temperature element to the temperature of the weather data received from the API and convert the temperature from Kelvin to Fahrenheit
    currentHumidity.textContent = `Humidity: ${weather.main.humidity}%`;// set the text content of the current humidity element to the humidity of the weather data received from the API
    currentWind.textContent = `Wind Speed: ${weather.wind.speed} MPH`;// set the text content of the current wind element to the wind speed of the weather data received from the API
    }


//             let daysDiv = document.createElement('div');
//             daysDiv.classList.add('days');
//             // for each iteration, creating an img element, grabbing the icon value and concatonating it into the url to grab the image, and adding classes of forecastText and icon5
//             let iconsOfWeek = data.list[i].weather[0].icon;
//             let iconEl = document.createElement('img');
//             iconEl.src = 'https://openweathermap.org/img/wn/' + iconsOfWeek + '.png';
//             iconEl.classList.add('forecastText', 'icon5');
//             // adding iconEl to the iteration div
//             daysDiv.appendChild(iconEl);
//             // for each iteration, create a dayjs object to give the day only, creating a <p> element with the class='forecastText' and id='day', setting the textContent of the element to this dayjs 'dddd' format, then adding this dayOfWeekEl to the iteration div
//             let date = new Date(data.list[i].dt * 1000);
//             let dayjsDate = dayjs(date);
//             let dayOfWeek = dayjsDate.format('dddd');
//             let dayOfWeekEl = document.createElement('p');
//             dayOfWeekEl.classList.add('forecastText');
//             dayOfWeekEl.setAttribute('id', dayOfWeek);
//             dayOfWeekEl.textContent = dayOfWeek;
//             daysDiv.appendChild(dayOfWeekEl);
//             // for each iteration grab the description value, create a <p> element with class='forecastText' and id='descriptionOfWeek', store the value into the newly created element and add this element to daysDiv container
//             let descriptionsOfWeek = data.list[i].weather[0].main;
//             let descriptionsOfWeekEl = document.createElement('p');
//             descriptionsOfWeekEl.classList.add('forecastText', 'attribute');
//             descriptionsOfWeekEl.setAttribute('id', descriptionsOfWeek);
//             descriptionsOfWeekEl.textContent = descriptionsOfWeek;
//             daysDiv.appendChild(descriptionsOfWeekEl);
//             // for each iteration grab the temperature value, create a <p> element with class='forecastText' and id='temperaturesOfWeek', store the value into the newly created element and add this element to daysDiv container
//             let temperaturesOfWeek = data.list[i].main.temp;
//             let temperaturesOfWeekEl = document.createElement('p');
//             temperaturesOfWeekEl.classList.add('forecastText', 'attribute');
//             temperaturesOfWeekEl.setAttribute('id', temperaturesOfWeek);
//             temperaturesOfWeekEl.textContent = 'Temp:' + temperaturesOfWeek + 'ºF';
//             daysDiv.appendChild(temperaturesOfWeekEl);
//             // for each iteration grab the wind speed value, create a <p> element with class='forecastText' and id='wind', store the value into the newly created element and add this element to daysDiv container
//             let windsOfWeek = data.list[i].wind.speed;
//             let windsOfWeekEl = document.createElement('p');
//             windsOfWeekEl.classList.add('forecastText', 'attribute');
//             windsOfWeekEl.setAttribute('id', windsOfWeek);
//             windsOfWeekEl.textContent = 'Winds:' + windsOfWeek + 'mph';
//             daysDiv.appendChild(windsOfWeekEl);
//             // for each iteration grab the humidity value, create a <p> element with class='forecastText' and id='humidityOfWeek', store the value into the newly created element and add this element to daysDiv container
//             let humidityOfWeek = data.list[i].main.humidity;
//             let humidityOfWeekEl = document.createElement('p');
//             humidityOfWeekEl.classList.add('forecastText', 'attribute');
//             humidityOfWeekEl.setAttribute('id', humidityOfWeek);
//             humidityOfWeekEl.textContent = 'Humidity:' + humidityOfWeek + '%';
//             daysDiv.appendChild(humidityOfWeekEl);
//             // take each daysDiv that has been created and put it into the fiveDay element on the DOM
//             let fiveDay = document.querySelector('.fiveDay');
//             // if 5 generated divs alread exist, then this will remove the old ones so that there are only 5 at any 1 time
//             const dayDiv = document.querySelectorAll('.days');
//             if (dayDiv.length > 5) {
//             for (let i = 0; i < 5; i++) {
//                 fiveDay.removeChild(dayDiv[i]);
//                 }
//             };
//             // completes the merge of the daysDiv to the fiveDay container
//             fiveDay.appendChild(daysDiv);
//         };
//     });
// };
// document.querySelector('#zipBtn').addEventListener('click', getWeather)
// // giving function to the clear history button to clear local storage and reset the page   
// let clearBtn = document.querySelector('#clearBtn')
// clearBtn.addEventListener("click", function() {
//     localStorage.clear();
//     window.location.reload();
// });