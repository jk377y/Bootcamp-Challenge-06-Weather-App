// api key d01afd2806e508d282da4f840dd4696a

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


//todo:  set up api url "math" that can be used in the url box, create variables

function weather () {
    // creating variables that will be used to set query parameters
    var cityInput = document.querySelector('#searchCity').value;
    var stateInput = document.querySelector('#searchState').value;
    console.log(cityInput);
    console.log(stateInput);


}
document.querySelector('#searchBtn').addEventListener('click', weather);