// Powered by OpenWeatherMap.org
// api key d01afd2806e508d282da4f840dd4696a
// api.openweathermap.org/data/2.5/forecast?zip={zip code},{country code}&appid={API key}

// getting started, naming the function getWeather, using a prevent default since i'm using a submit button
let getWeather = (event) => {
    event.preventDefault;
    // using dayjs to place the current date in the #date 
    let dateEl = document.querySelector('#date');
    let currentDate = dayjs().format('dddd, MMMM DD, YYYY');
    dateEl.textContent = currentDate;
    // grabbing the value that is entered in the #zip textbox
    let zipInput = document.querySelector('#zip').value;
    localStorage.setItem(zipInput, JSON.stringify(zipInput))
    
    
    //todo: assign dropdown selection to zipInput
    function getLocalStorage () {
        let zipInput = document.querySelector('#zip').value;
        // declaring the element to hold the dropdown menu
        let dropdown = document.getElementById("dropdown");
        // Get a list of all the keys in local storage
        let keys = Object.keys(localStorage);
        // Loop through the list of keys
        for (var i = 0; i < keys.length; i++) {
            // Create a new option element
            let option = document.createElement("option");
            // Set the value of the option to the zip code
            option.value = keys[i];
            // Set the text of the option to the zip code
            option.text = keys[i];
            // Add the option to the dropdown menu
            dropdown.add(option);
            
        };
        dropdown.addEventListener('click', function() {
            // Get the selected zip code and set to the zipInput value
            zipInput.innerHTML = dropdown.value;
            console.log(zipInput);
        });
    };getLocalStorage()
    
    
    // defining the api key, url, and concatonated fetch url
    let apiKey = 'd01afd2806e508d282da4f840dd4696a';
    let apiURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
    let apiRequest = apiURL + zipInput + '&appid=' + apiKey + '&units=imperial';
    // fetching the apiRequest url
    fetch(apiRequest)
        // returns a response in json format
        .then(apiRequestResponse => apiRequestResponse.json())
        // processing that data
        .then(data => {        
        // declaring variables to represent various elements in the DOM
        let cityEl = document.querySelector('#city');
        let tempEl = document.querySelector('#temp');
        let humidityEl = document.querySelector('#humidity');
        let windEl = document.querySelector('#wind');
        let descriptionEl = document.querySelector('#description');
        let iconEl = document.querySelector('#icon');
        // destructing the data object for the values i want to use; index[0] for todays stats
        let citySrc = data.city.name;
        let tempSrc = data.list[0].main.temp;
        let humiditySrc = data.list[0].main.humidity;
        let windSrc = data.list[0].wind.speed;
        let descriptionSrc = data.list[0].weather[0].main;
        let iconSrc = data.list[0].weather[0].icon;
        //  setting text content of the declared element variables to the destructured values; rounded the temp value with Math.floor so decimal places were not used
        cityEl.textContent = citySrc;
        tempEl.textContent = Math.floor(tempSrc) + 'ºF';
        humidityEl.textContent = humiditySrc;
        windEl.textContent = windSrc;
        descriptionEl.textContent = descriptionSrc;
        // to display the icon, the iconSrc destructured value had to be inserted into the url to grab the image
        displayIconSrc = 'https://openweathermap.org/img/wn/' + iconSrc + '.png';
        iconEl.setAttribute('src', displayIconSrc);
        // there are 40 keys in this array
        let listArray = Object.keys(data.list);
        // there are 8 keys per day (every 3 hours); for 5 days that is 40 total
        // index[0] is used in the current day display
        // for the loop on the 5day forecast, i am starting at index[7] and incrementing by 8 or i+=8
        for (i=7; i<listArray.length; i+=8){
            // i start by creating a div for each iteration
            let daysDiv = document.createElement('div');
            daysDiv.classList.add('days');
            // for each iteration, creating an img element, grabbing the icon value and concatonating it into the url to grab the image, and adding classes of forecastText and icon5
            let iconsOfWeek = data.list[i].weather[0].icon;
            let iconEl = document.createElement('img');
            iconEl.src = 'https://openweathermap.org/img/wn/' + iconsOfWeek + '.png';
            iconEl.classList.add('forecastText', 'icon5');
            // adding iconEl to the iteration div
            daysDiv.appendChild(iconEl);
            // for each iteration, create a dayjs object to give the day only, creating a <p> element with the class='forecastText' and id='day', setting the textContent of the element to this dayjs 'dddd' format, then adding this dayOfWeekEl to the iteration div
            let date = new Date(data.list[i].dt * 1000);
            let dayjsDate = dayjs(date);
            let dayOfWeek = dayjsDate.format('dddd');
            let dayOfWeekEl = document.createElement('p');
            dayOfWeekEl.classList.add('forecastText');
            dayOfWeekEl.setAttribute('id', dayOfWeek);
            dayOfWeekEl.textContent = dayOfWeek;
            daysDiv.appendChild(dayOfWeekEl);
            // for each iteration grab the description value, create a <p> element with class='forecastText' and id='descriptionOfWeek', store the value into the newly created element and add this element to daysDiv container
            let descriptionsOfWeek = data.list[i].weather[0].main;
            let descriptionsOfWeekEl = document.createElement('p');
            descriptionsOfWeekEl.classList.add('forecastText', 'attribute');
            descriptionsOfWeekEl.setAttribute('id', descriptionsOfWeek);
            descriptionsOfWeekEl.textContent = descriptionsOfWeek;
            daysDiv.appendChild(descriptionsOfWeekEl);
            // for each iteration grab the temperature value, create a <p> element with class='forecastText' and id='temperaturesOfWeek', store the value into the newly created element and add this element to daysDiv container
            let temperaturesOfWeek = data.list[i].main.temp;
            let temperaturesOfWeekEl = document.createElement('p');
            temperaturesOfWeekEl.classList.add('forecastText', 'attribute');
            temperaturesOfWeekEl.setAttribute('id', temperaturesOfWeek);
            temperaturesOfWeekEl.textContent = 'Temp:' + temperaturesOfWeek + 'ºF';
            daysDiv.appendChild(temperaturesOfWeekEl);
            // for each iteration grab the wind speed value, create a <p> element with class='forecastText' and id='wind', store the value into the newly created element and add this element to daysDiv container
            let windsOfWeek = data.list[i].wind.speed;
            let windsOfWeekEl = document.createElement('p');
            windsOfWeekEl.classList.add('forecastText', 'attribute');
            windsOfWeekEl.setAttribute('id', windsOfWeek);
            windsOfWeekEl.textContent = 'Winds:' + windsOfWeek + 'mph';
            daysDiv.appendChild(windsOfWeekEl);
            // for each iteration grab the humidity value, create a <p> element with class='forecastText' and id='humidityOfWeek', store the value into the newly created element and add this element to daysDiv container
            let humidityOfWeek = data.list[i].main.humidity;
            let humidityOfWeekEl = document.createElement('p');
            humidityOfWeekEl.classList.add('forecastText', 'attribute');
            humidityOfWeekEl.setAttribute('id', humidityOfWeek);
            humidityOfWeekEl.textContent = 'Humidity:' + humidityOfWeek + '%';
            daysDiv.appendChild(humidityOfWeekEl);
            // take each daysDiv that has been created and put it into the fiveDay element on the DOM
            let fiveDay = document.querySelector('.fiveDay');
            // if 5 generated divs alread exist, then this will remove the old ones so that there are only 5 at any 1 time
            const dayDiv = document.querySelectorAll('.days');
            if (dayDiv.length > 5) {
            for (let i = 0; i < 5; i++) {
                fiveDay.removeChild(dayDiv[i]);
                }
            };
            // completes the merge of the daysDiv to the fiveDay container
            fiveDay.appendChild(daysDiv);
        };
    });
};
document.querySelector('#zipBtn').addEventListener('click', getWeather)
// giving function to the clear history button to clear local storage and reset the page   
let clearBtn = document.querySelector('#clearBtn')
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    window.location.reload();
});