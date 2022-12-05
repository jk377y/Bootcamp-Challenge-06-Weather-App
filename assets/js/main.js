// api key d01afd2806e508d282da4f840dd4696a
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

function weather (event) {
    event.preventDefault;
    var todayDate = document.getElementById('todayDate');
    todayDate.textContent = dayjs().format('MMMM D YYYY');
    // creating variables that will be used to set query parameters
    var cityInput = document.querySelector('#searchCity').value;
    var stateInput = document.querySelector('#searchState').value;
    // creating api variable and the api "math" problem that will be entered into the url box
    var apiKey = 'd01afd2806e508d282da4f840dd4696a'
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=';
    var apiRequest = apiUrl + cityInput + ',' + stateInput + ',' + 'us' + '&limit=1' + '&appid=' + apiKey;
    fetch(apiRequest)
        .then(latLonResponse => {
            //this logs the status response from the page
            return latLonResponse.json();
        })
        .then(dataReturned => {
            //creates latitude and longitude variables
            var lon = dataReturned[0].lon;
            var lat = dataReturned[0].lat;
            // creating api fetch using lat and lon parameters
            var apiKey = 'd01afd2806e508d282da4f840dd4696a'
            var currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat='
            var currentWeatherURLRequest = currentWeatherURL + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
            // returning response from the queried parameters
            fetch(currentWeatherURLRequest)
            .then(currentResponse => {
                return currentResponse.json();
            })
            // deconstructing the returned object to the values i need
            .then(currentDataReturned => {
                var temp = currentDataReturned.main.temp;
                var humidity = currentDataReturned.main.humidity;
                var wind = currentDataReturned.wind.speed;
                var icon = currentDataReturned.weather[0].icon;
                // the queried city is assigned to the "current" weather box, along with the values retreived from above
                var cityInput = document.querySelector('#searchCity').value;
                document.querySelector('#city').textContent = cityInput.toUpperCase();
                document.querySelector('#todayTemp').textContent = temp + '  °F';           
                document.querySelector('#todayWind').textContent = wind + '  mph';
                document.querySelector('#todayHumidity').textContent = humidity + ' %';
                // setting the weather icon to the current day display
                var iconEL = document.querySelector('#todayIcon');
                displayIcon = 'http://openweathermap.org/img/wn/' + icon + '.png';
                iconEL.setAttribute('src', displayIcon);
            })
        })
// =============== fetching 5 day =======================    
}
document.querySelector('#searchBtn').addEventListener('click', weather);
function fiveDay (event) {
    event.preventDefault;
    var cityInput = document.querySelector('#searchCity').value;
    var stateInput = document.querySelector('#searchState').value;
    var apiKey = 'd01afd2806e508d282da4f840dd4696a';
    var fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    var fiveDayRequest = fiveDayUrl + cityInput + ',' + stateInput + ',us&appid=' + apiKey + '&units=imperial';
    fetch(fiveDayRequest)       
        .then(fiveDayResponse => {
            return fiveDayResponse.json();
        })
        .then(returned => {
            //========== day1
            var date1 = dayjs(returned.list[4].dt_txt).format('MM/DD/YYYY');
            document.querySelector('#date1').textContent = date1
            var icon1 = returned.list[4].weather[0].icon;
            var iconEL1 = document.querySelector('#icon1');
            displayIcon1 = 'http://openweathermap.org/img/wn/' + icon1 + '.png';
            iconEL1.setAttribute('src', displayIcon1);
            var temp1 = returned.list[4].main.temp;
            document.querySelector('#temp1').textContent = temp1
            var wind1 = returned.list[4].wind.speed;
            document.querySelector('#wind1').textContent = wind1
            var humidity1 = returned.list[4].main.humidity;
            document.querySelector('#hum1').textContent = humidity1
            //========== day2
            var date2 = dayjs(returned.list[12].dt_txt).format('MM/DD/YYYY');
            document.querySelector('#date2').textContent = date2
            var icon2 = returned.list[12].weather[0].icon;
            var iconEL2 = document.querySelector('#icon2');
            displayIcon2 = 'http://openweathermap.org/img/wn/' + icon2 + '.png';
            iconEL2.setAttribute('src', displayIcon2);
            var temp2 = returned.list[12].main.temp;
            document.querySelector('#temp2').textContent = temp2
            var wind2 = returned.list[12].wind.speed;
            document.querySelector('#wind2').textContent = wind2
            var humidity2 = returned.list[12].main.humidity;
            document.querySelector('#hum2').textContent = humidity2
            //========== day3
            var date3 = dayjs(returned.list[20].dt_txt).format('MM/DD/YYYY');
            document.querySelector('#date3').textContent = date3
            var icon3 = returned.list[20].weather[0].icon;
            var iconEL3 = document.querySelector('#icon3');
            displayIcon3 = 'http://openweathermap.org/img/wn/' + icon3 + '.png';
            iconEL3.setAttribute('src', displayIcon3);
            var temp3 = returned.list[20].main.temp;
            document.querySelector('#temp3').textContent = temp3
            var wind3 = returned.list[20].wind.speed;
            document.querySelector('#wind3').textContent = wind3
            var humidity3 = returned.list[20].main.humidity;
            document.querySelector('#hum3').textContent = humidity3
            //========== day4
            var date4 = dayjs(returned.list[28].dt_txt).format('MM/DD/YYYY');
            document.querySelector('#date4').textContent = date4
            var icon4 = returned.list[28].weather[0].icon;
            var iconEL4 = document.querySelector('#icon4');
            displayIcon4 = 'http://openweathermap.org/img/wn/' + icon4 + '.png';
            iconEL4.setAttribute('src', displayIcon4);
            var temp4 = returned.list[28].main.temp;
            document.querySelector('#temp4').textContent = temp4
            var wind4 = returned.list[28].wind.speed;
            document.querySelector('#wind4').textContent = wind4
            var humidity4 = returned.list[28].main.humidity;
            document.querySelector('#hum4').textContent = humidity4
            //========== day5
            var date5 = dayjs(returned.list[35].dt_txt).format('MM/DD/YYYY');
            document.querySelector('#date5').textContent = date5
            var icon5 = returned.list[35].weather[0].icon;
            var iconEL5 = document.querySelector('#icon5');
            displayIcon5 = 'http://openweathermap.org/img/wn/' + icon5 + '.png';
            iconEL5.setAttribute('src', displayIcon5);
            var temp5 = returned.list[35].main.temp;
            document.querySelector('#temp5').textContent = temp5
            var wind5 = returned.list[35].wind.speed;
            document.querySelector('#wind5').textContent = wind5
            var humidity5 = returned.list[35].main.humidity;
            document.querySelector('#hum5').textContent = humidity5
        })
}
document.querySelector('#searchBtn').addEventListener('click', fiveDay);
clearBtn.addEventListener("click", function() {
    localStorage.clear();
})

var history = [
    [0],    {
                    'city'    :   'dallas',
                    'state'   :   'tx'
            }
            
    [1],    {
                    'city'    :   'miami',
                    'state'   :   'fl'
            }

    [2],    {
                    'city'    :   'seattle',
                    'state'   :   'wa'
            }
];


// var city1 = (history[1].city);
// var state1 = (history[1].state);
var historyArray = [history];
var i = 1
//history.push[0]('hello');
localStorage.setItem('history', JSON.stringify(history[0].city, history[0].state));

//console.log(city1, state1);

// had so much trouble making my for loops work that
// i just put a hammer to this bitch and hard coded it

