var calendarData = [];
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var currentDay = {};
var currentYear = 2021;
var currentMonth = 5; //June
var calendarDay = document.getElementsByClassName("days");
var sixthWeek = document.getElementsByClassName("sixth");
var monthEl = document.querySelector(".month");
var yearEl = document.querySelector(".year");
var selectedMonth = document.getElementById("start");
var clearCityButtonEl = document.querySelector('#clear-city');
var weatherDataContainerEl = document.getElementById('weather-data-container');
console.log(selectedMonth.value);

document.querySelector("body > main > div.columns > div.calendar > div.monthYear.columns > div.month.column")
let loadArray = function(){
    calendarData = [];
    let selected = selectedMonth.value.split('-');
    currentYear = selected[0];
    currentMonth = selected[1];
    
    let lastDay = new Date(currentYear,parseInt(currentMonth),0).getDate();
    console.log(lastDay);

    for (let i = 1; i <= lastDay;i++){
        var d = new Date(currentYear,parseInt(currentMonth)-1,i);
        var date = d.getDate();
        var day = d.getDay();

        var weekOfMonth = Math.ceil((date - 1 - day) / 7)+1;
        calendarData.push({day:i,dayOfWeek:day,weekOfMonth:weekOfMonth,image:'image name',brightness:.1});
        
    };
}

let getData = function(dOW,wOM){
    
    calendarData.forEach(function(entry) {
        if((entry.dayOfWeek == dOW) && (entry.weekOfMonth == wOM)){
            currentDay = entry;
            return true;
        }
});
}

let loadCalendar = function() {
    monthEl.innerHTML = months[parseInt(currentMonth)-1];
    yearEl.textContent = currentYear;
    for (let i = 0; i < calendarDay.length; i++) {
        getData(calendarDay[i].dataset.dow, calendarDay[i].dataset.wom);

        calendarDay[i].textContent=currentDay.day;   

        if (currentDay.weekOfMonth == "6"){
            sixthWeek[0].style.visibility = "visible";
        }
        currentDay = {};
        
    }

    
    console.log(monthEl.innerHTML);

}

let loadPage = function(){
    sixthWeek[0].style.visibility = "hidden";
    loadArray();
    loadCalendar();
}

loadPage();



// get modal elements and make variable 
var modal = document.getElementById('moon-modal');
var modalbtn = document.getElementById('modal-btn');
var closeBtn = document.getElementById('modal-close');

//listen for open click 
modalbtn.addEventListener('click', openModal);

//close click listener 
closeBtn.addEventListener('click', closeModal);

//click outside modal to close 
window.addEventListener('click', outsideModal);

//function to open modal 
function openModal(){
    modal.style.display = 'block';
    modalbtn.style.display = 'none';
}

//close modal on button
function closeModal() {
    modal.style.display = 'none';
}

function outsideModal(event) {
    if(event.target == modal) {
        modal.style.display = 'none';}
    }

    
    
    //variable for the submit button
    var submitButton = document.querySelector("#search-btn");
    //variable for the input to search a city 
    var cityInputEl = document.querySelector("input")
    // variable for the selected city
    
    
    
    
    
    // this function runs when the submit button is clicked 
    var submitButtonHandler = function (event) {
        event.preventDefault();
        // get city value from input element
        var selectedCity = cityInputEl.value.trim();
        
        // if a city is entered then run code 
        if (selectedCity) {
            getLatLong(selectedCity);

            localStorage.setItem('savedCity',selectedCity);
            
        }
        else {
            // I need to make this into a modal 
            alert("please enter a city");
        }
        
    };
    
    
    // this function will get the latitude and longitude to be used in the weather search 
    var getLatLong = function (selectedCity) {
        // this creates a URL for the api request based off of the city entered
        var apiUrl = "http://api.positionstack.com/v1/forward?access_key=c4bf58a019f128c64c20b6e41582639b&query=" + selectedCity + "&limit=1";
        console.log(apiUrl);
        // fetch request to get lat and long from url we just created
        fetch(apiUrl).then(function (response) {
            // take response and convert it to data we cna use
            response.json().then(function (data) {
                
                // Hey Corrie, you can use these variables in your api call for the weather information. This will give you the latitude and longitude based on their search 
                let lat = data.data[0].latitude;
                let lon = data.data[0].longitude;
                console.log(lat);
                console.log(lon);
                
                localStorage.setItem('savedLat', lat);
                localStorage.setItem('savedLon', lon);

                getWeather();
                // need to figure out how to pull latitude and longitude from the data, it isn't working
            })

        })
        
        
    };
    
    // Pulling the weather information
    function getWeather() {
        const lat = localStorage.getItem('savedLat');
        const lng = localStorage.getItem('savedLon');
        
        console.log(`Lat/Lon ${lat} & ${lng}`);
        
        // Storm Glass API 1e6476cc-3387-11ec-b37c-0242ac130002-1e647744-3387-11ec-b37c-0242ac130002
        let params = 'cloudCover,precipitation,airTemperature';
        
        // Weather Fetch
        fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
            headers: {
                'Authorization': '1e6476cc-3387-11ec-b37c-0242ac130002-1e647744-3387-11ec-b37c-0242ac130002'
            }
            }).then((response) => response.json()).then((res) => {
    
            
            // Pulling in Cloud Coverage
            const cloudCoverage = res.hours[0].cloudCover.noaa + '%'
            // Saving Cloud Coverage
            localStorage.setItem('savedCloudCoverage', cloudCoverage);
            

            // Pulling in Air Temp
            const airTemp = res.hours[0].airTemperature.noaa
            // Saving Temp
            localStorage.setItem('savedAirTemperature', airTemp);
            
            // // Pulling in Precipitation
            // const precipitation = res.hours[0].precipitation.noaa + '%'
            // // Saving Precipitation
            // localStorage.setItem('savedPrecipitation', precipitation);
            
            
        });

        // Precipitation Fetch
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minute,hourly,alert&appid=f17ddf4709497b276463e08f28044887`, {
            }).then((response) => response.json()).then((res) => {
            // Pulling in Precipitation
            const precipitation = res.daily[0].rain
            // Saving Precipitation
            localStorage.setItem('savedPrecipitation', precipitation);
            
            
        });
        
        // Astronomy Fetch
        let end = '2021-11-30';
        
        fetch(`https://api.stormglass.io/v2/astronomy/point?lat=${lat}&lng=${lng}&end=${end}`, {
            headers: {
                'Authorization': '1e6476cc-3387-11ec-b37c-0242ac130002-1e647744-3387-11ec-b37c-0242ac130002'
            }
        }).then((response) => response.json()).then((res) => {

            // Pulling in Moon Phase
            const moonPhase = res.data[0].moonPhase.current.text
            // Saving Moon Phase
            localStorage.setItem('savedMoonPhase', moonPhase);
            
            // Pulling in Moon Rise
            const moonRise = res.data[0].moonrise
            const moonRiseDate = moonRise.replace(/202.+?-.+?-.+?T0/, '');
            const moonRiseTime = moonRiseDate.slice(0, -9)
            // Saving Moon Rise
            localStorage.setItem('savedMoonRise', moonRiseTime);
            
            // Pulling in Moon Rise
            const moonSet = res.data[0].moonset
            const moonSetDate = moonSet.replace(/202.+?-.+?-.+?T/, '');
            const moonSetTime = moonSetDate.slice(0, -9)
            // Saving Moon Rise
            localStorage.setItem('savedMoonSet', moonSetTime);
        });
        
        showWeather();
    };
    
    // Function to display saved Weather/Astrology info
    function showWeather() {
        const cityName = localStorage.getItem('savedCity');
        
        if (cityName) {
        // Displaying City Weather is pulling
        var cityNameEl = document.querySelector('#city-name');
        
        cityNameEl.textContent = cityName;
        cityInputEl.value = "";
        
        // Displaying Today's Date
        var weatherTodayEl = document.querySelector('#weather-today');
        
        const today = new Date();
        weatherTodayEl.textContent = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
        
        // Display Cloud Coverage Information
        const cloudCoverageDisplay = localStorage.getItem('savedCloudCoverage')
        var cloudCoverEl = document.querySelector('#cloud-coverage');
        cloudCoverEl.textContent = `Cloud Coverage: ${cloudCoverageDisplay}`;
        
        // Display Air Temparature Information
        const airTempDisplay = localStorage.getItem('savedAirTemperature')
        var airTempEl = document.querySelector('#air-temp');
        const celsius = Math.round(parseInt(airTempDisplay));
        const fahrenheit = Math.round(celsius * 9/5 + 32);
        airTempEl.textContent = `Temperature: ${celsius}°C/ ${fahrenheit}°F`;
        
        // Display Precipitation
        const precipitationDisplay = localStorage.getItem('savedPrecipitation');
        var precipitationEl = document.querySelector('#precipitation')
        precipitationEl.textContent = `Precipitation: ${precipitationDisplay}mm`;
        
        // Displaying Moon Phase
        const moonPhaseDisplay = localStorage.getItem('savedMoonPhase');
        var moonPhaseEl = document.querySelector('#moon-phase');
        moonPhaseEl.textContent = `Moon Phase: ${moonPhaseDisplay}`;

        // Displaying Moon Rise
        const moonRiseDisplay = localStorage.getItem('savedMoonRise');
        var moonRiseEl = document.querySelector('#moon-rise');
        moonRiseEl.textContent = `Moon Rise: ${moonRiseDisplay} am`;

        // Displaying Moon Set
        const moonSetDisplay = localStorage.getItem('savedMoonSet');
        var moonSetEl = document.querySelector('#moon-set');
        moonSetEl.textContent = `Moon Set: ${moonSetDisplay} pm`;
        }
        else {
            weatherDataContainerEl.textContent = "Enter a City to Get Started!"
        };
    };
    
getWeather();


// Clear City Data
clearCityButtonEl.addEventListener('click', function() {
    localStorage.clear();
    weatherDataContainerEl.textContent = "Enter a City to Get Started!"
});
// event listener for the submit button-- needs to be near bottom of page 
submitButton.addEventListener("click", submitButtonHandler)

