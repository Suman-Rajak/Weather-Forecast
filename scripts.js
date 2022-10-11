// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

// 8d543bc0c5964b377a72a905ea9486d5

const weatherApi = {
    key: "8d543bc0c5964b377a72a905ea9486d5",
    baseurl: "https://api.openweathermap.org/data/2.5/weather"
}


//References

const searchbtn = document.getElementById('search');
const partone = document.querySelector('.partone');
const parttwo = document.querySelector('.parttwo');
const citybox = document.querySelector('#citybox');
let weatherimage = document.querySelector('#weatherimg');
const arrowback = document.getElementById('arrowback');
let info = document.querySelector('.info');
let loc = document.getElementById('loc');
let apiloc;
// const countrybox = document.querySelector('#countrybox');

//Musics

let clearmusic = new Audio('./weather-musics/clear.mp3');
let windmusic = new Audio('./weather-musics/wind.mp3');
let thundermusic = new Audio('./weather-musics/thunder.mp3');
let rainmusic = new Audio('./weather-musics/rain.mp3')

//What will happen when I click on the Search Button

function clickevent() {
    if (citybox.value != "") {
        console.log(citybox.value);
        weatherreport(citybox.value);
    }
}

searchbtn.addEventListener('click', clickevent);

citybox.addEventListener('keypress', () => {
    if (event.keyCode == 13) {
        clickevent();
    }
})


//Getting User's Location

loc.addEventListener('click',()=>{

    if(navigator.geolocation){ //If browser supports geolocation
        navigator.geolocation.getCurrentPosition(Successloc,Errorloc);
    }
    else{
        alert("Geolocation is not Supported by your browser");
    }
});

function Successloc(position){
    const {latitude, longitude} = position.coords;
    apiloc = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApi.key}&units=metric`;
    fetch(apiloc).then(currloc =>{
        return currloc.json();
    }).then((showreport));
}

function Errorloc(error){
    info.style.display="flex";
    info.classList.add('error');
    info.innerText=error.message;
}


// Get Weather Report

function weatherreport(cityandcountry) {
    fetch(`${weatherApi.baseurl}?q=${cityandcountry}&appid=${weatherApi.key}&units=metric`) //By default the json data gives temparature in fahrenheit , &units=metric converts it into celsius.
        .then(weather => {
            return weather.json();
        }).then(showreport);
}


//Show Weather Report 

function showreport(weather) {
    console.log(weather);

    if (weather.message != "city not found") { //checking the city is valid or not

        info.style.display = 'flex';
        info.classList.add('pending');
        info.innerHTML = 'Please Wait...';

        setTimeout(() => {
            arrowback.style.display = "inline";
            partone.style.display = "none";
            parttwo.style.display = "flex";
            citybox.value = "";

            //City
            let city = document.getElementById('city');
            city.innerText = `${weather.name},${weather.sys.country}`;

            //Temparature
            let temp = document.getElementById('temp');
            temp.innerText = `${Math.round(weather.main.temp)} °C`;

            //Min Temp
            let mintemp = document.getElementById('mintemp');
            mintemp.innerText = `${Math.floor(weather.main.temp_min)} °C`;

            //Max Temp
            let maxtemp = document.getElementById('maxtemp');
            maxtemp.innerText = `${Math.ceil(weather.main.temp_max)} °C`;

            // Weather Type
            let weathertype = document.getElementById('weathertype');
            weathertype.innerText = `${weather.weather[0].main}`;


            //Changing Backgrounds
            // background-image: url('./weather-animations/clear.gif');
            if (weathertype.textContent == 'Clear') {
                document.body.style.backgroundImage = "url('./weather-animations/clear.gif')";
                document.body.style.backgroundSize = "cover";

                weatherimage.src="./weather-app-icons/clear.svg";
                clearmusic.play();
            }
            else if (weathertype.textContent == 'Mist' || weathertype.textContent == 'Haze') {
                document.body.style.backgroundImage = "url('./weather-animations/HazeMist.gif')";
                document.body.style.backgroundSize = "cover";

                weatherimage.src="./weather-app-icons/haze.svg";
                clearmusic.play();
            }
            else if (weathertype.textContent == 'Rain') {
                document.body.style.backgroundImage = "url('./weather-animations/thunder.gif')";
                document.body.style.backgroundSize = "cover";

                weatherimage.src="./weather-app-icons/rain.svg"
                rainmusic.play();
            }
            else if (weathertype.textContent == 'Thunderstorm') {
                document.body.style.backgroundImage = "url('./weather-animations/thunder.gif')";
                document.body.style.backgroundSize = "cover";

                weatherimage.src="./weather-app-icons/storm.svg";
                thundermusic.play();
            }
            else if (weathertype.textContent == 'Clouds'){
                document.body.style.backgroundImage = "url('./weather-animations/clouds.gif')";
                document.body.style.backgroundSize = "cover";

                weatherimage.src="./weather-app-icons/cloud.svg";
                windmusic.play();
            }
            else if (weathertype.textContent == 'Snow'){
                document.body.style.backgroundImage = "url('./weather-animations/snowfall.gif')";
                document.body.style.backgroundSize = "cover";

                weatherimage.src="./weather-app-icons/snow.svg";
                windmusic.play();
            }

        }, 1500);
    }
    else {
        info.classList.add('error');
        info.style.display = "flex";
        info.innerHTML = "Please Enter a Valid City Name";
    }
}

arrowback.addEventListener('click', () => {
    parttwo.style.display = "none";
    partone.style.display = "flex";
    arrowback.style.display = "none";
    document.body.style.backgroundImage = "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)";
    info.style.display = "none";
    info.className = "info";

    //Pausing musics

    thundermusic.pause();
    clearmusic.pause();
    rainmusic.pause();
    windmusic.pause();

})


