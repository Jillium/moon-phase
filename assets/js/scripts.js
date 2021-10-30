var calendarData = [];
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var currentDay = {};
var currentYear = 2021;
var currentMonth = 5; //June
var calendarDay = document.getElementsByClassName("days");
var calendar = document.querySelector(".calendar");

var clearCityButtonEl = document.querySelector('#clear-city');
var cityNameEl = document.querySelector('#city-name');
var weatherTodayEl = document.querySelector('#weather-today');
var cloudCoverEl = document.querySelector('#cloud-coverage');
var airTempEl = document.querySelector('#air-temp');
var precipitationEl = document.querySelector('#precipitation')
var moonPhaseEl = document.querySelector('#moon-phase');
var moonRiseEl = document.querySelector('#moon-rise');
var moonSetEl = document.querySelector('#moon-set');

var sixthWeek = document.getElementsByClassName("sixth");
var selectedMonth = document.getElementById("start");
var sixthWeek = document.getElementsByClassName("sixth");
var monthEl = document.querySelector(".month");
var yearEl = document.querySelector(".year");
var selectedMonth = document.getElementById("start");
var clearCityButtonEl = document.querySelector('#clear-city');
var weatherDataContainerEl = document.getElementById('weather-data-container');

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
        let dayEl = calendarDay[i].querySelector(".dayBox");
        let imgEl = calendarDay[i].querySelector(".moonImg");
        
        if(!currentDay.day){
            imgEl.style.visibility = "hidden";
            dayEl.textContent="";
        }
        else {
            dayEl.textContent=currentDay.day; 
            dayEl.dataset.stage = currentDay.stage;  
            imgEl.src='./assets/images/Moon/' + currentDay.image; 
            imgEl.alt='Description'; 
            imgEl.style.visibility = "visible";  
        }

        if (currentDay.weekOfMonth == "6"){
            sixthWeek[0].style.visibility = "visible";
            calendar.style.height = "735px";
        }
        currentDay = {};
        
    }
}

//variable for the submit button
var submitButton = document.querySelector("#search-btn");
// variable for the close button on city search error modal
var errorCloseButton = document.querySelector("#error-close");
//variable for the input to search a city 
var cityInputEl = document.querySelector("input");
// variable for the error modal box
var errorBox = document.querySelector(".error-modal-container");

// calculate julian month to get moon phase 
const julianDate = (date) => {
    const time =date.getTime();
    const timeZone = date.getTimezoneOffset()
    
    return (time / 86400000) - (timeZone / 1440) + 2440587.5;
}

// create lunar month  
const lunarMonth = 29.53; 

// const LunarAge = (date = new Date()) => {
//     const percent = LunarAgePercent(date);
//     const age = percent * lunarMonth;
// console.log(age);
//     return age;
// }


const LunarAgePercent = (date) => {
    return normalize((julianDate(date) - 2451550.1) / lunarMonth);
}

const normalize = value => {
    value = value - Math.floor(value);
    if (value < 0)
    value = value + 1
    return value;
}

//get percentages for various phases to tell moon type 
// if statement  use lunar age variable to call 
const lunarPhase = (x) => {
    
    if (x < 1.845) 
    return "New Moon";
    else if (x < 5.53) 
    return "Waxing Cresent";
    else if (x < 9.228)
    return "First Quarter";
    else if (x < 12.919)
    return "Waxing Gibbious";
    else if (x < 16.61)
    return "Full Moon";
    else if (x < 20.30)
    return "Waning Gibbious";
    else if (x < 23.99)
    return "Last Quarter";
    else if (x < 27.68)
    return "Waning Crescent";
    
    return "";
    
}


const moonAge = (date = new Date(newdate)) => {
    const percent = LunarAgePercent(date);
    const age = percent * lunarMonth;
    return age;
}

let loadArray = function(){
    calendarData = [];
    let selected = selectedMonth.value.split('-');
    currentYear = selected[0];
    currentMonth = selected[1];
    
    let lastDay = new Date(currentYear,parseInt(currentMonth),0).getDate();
    
    
    for (let i = 1; i <= lastDay;i++){
        var d = new Date(currentYear,parseInt(currentMonth)-1,i);
        var date = d.getDate();
        var day = d.getDay();
        var moonDate = new Date(currentYear+'-'+ String(currentMonth).padStart(2,'0')+'-'+String(i).padStart(2,'0')+'T23:59:59Z');
        var mAge = moonAge(moonDate);
        
        var weekOfMonth = Math.ceil((date - 1 - day) / 7)+1;
        var moonImage = "Moon-"+Math.floor(mAge)+".jpg";
        calendarData.push({day:i,dayOfWeek:day,weekOfMonth:weekOfMonth,image:moonImage,stage:mAge});
        
    };
}

document.addEventListener("DOMContentLoaded", ()=> {
    const phase = lunarPhase ();
    console.log(phase);
    
    //append this data to modal use div idi 
} );

    
    
    // get modal elements and make variable 
    var modal = document.getElementById('moon-modal');
    //var modalbtn = document.getElementById('modal-btn');
    var closeBtn = document.getElementById('modal-close');
    var dayClick = document.querySelectorAll(".days");
    
    //dayClick is an array of HTMLElement
    dayClick.forEach(element => element.addEventListener("click", function () {
        
        var day = this.getElementsByClassName("dayBox");
        var image = this.getElementsByClassName("moonImg");
    console.log(day);
    (openModal(day[0].innerHTML, image[0].src, day[0].dataset.stage));
}));
closeBtn.addEventListener('click', closeModal);

//click outside modal to close 
document.getElementsByTagName('BODY')[0].addEventListener('click', outsideModal);
console.log("clicked outside modal");

//function to open modal 
function openModal(day, image, stage){
    modal.style.display = 'block';
    // var day = event.target.innerHTML;
    console.log(lunarPhase(stage));
    document.getElementById('modal-link').href=`https://www.moongiant.com/phase/10/${day}/2021/`;
    var newMoonImg = document.createElement('img');
    console.log(image);
    newMoonImg.src=image;
    var modalInfoDiv = document.getElementById("moon-age");
    modalInfoDiv.innerHTML=lunarPhase(stage);
    document.getElementById('moon-img').appendChild(newMoonImg);


// //work on this 
    //put definitions in an array to add to modal depending on moon phase 

    var moonDescriptionElement = [
        {"phase": "NewMoon", "description": "A new moon is when the moon cannot be seen because we are looking at the unlit half of the Moon. The new moon phase occurs when the Moon is directly between the Earth and Sun. A solar eclipse can only happen at new moon."},
        {"phase": "WaxingCrescent", "description": "A waxing crescent moon is when the Moon looks like a crescent and the crescent increases or waxes in size from one day to the next. This phase is usually only seen in the west."},
        {"phase": "FirstQuartar", "description": "The first quarter moon (or a half moon) is when half of the lit portion of the Moon is visible after the waxing crescent phase. It comes a week after new moon."},
        {"phase": "WaxingGibbious", "description":"A waxing gibbous moon occurs when more than half of the lit portion of the Moon can be seen and the shape increases or waxes in size from one day to the next. The waxing gibbous phase occurs between the first quarter and full moon phases."},
        {"phase": "FullMoon",  "description":"A full moon is when we can see the entire lit portion of the Moon. The full moon phase occurs when the Moon is on the opposite side of the Earth from the Sun; called opposition. A lunar eclipse can only happen at full moon."},
        {"phase": "WaningGibbious", "description":"A waning gibbous moon occurs when more than half of the lit portion of the Moon can be seen and the shape decreases or wanes in size from one day to the next. The waning gibbous phase occurs between the full moon and third quarter phases."},
        {"phase": "LastQuarter", "description":"The last quarter moon (or a half moon) is when half of the lit portion of the Moon is visible after the waning gibbous phase."},
        {"phase": "WaningCrescent", "description":"A waning crescent moon is when the Moon looks like a crescent and the crescent decreases or wanes in size from one day to the next."}];
       
        let moonDiv = document.getElementById("moon-descriptions");
         
        console.log(moonDescriptionElement);
        if (lunarPhase(stage) === "New Moon") {
       //    moonDiv.innerHTML= moonDescriptionElement[0].description;
          
        } 
          else if (lunarPhase(stage) === "Waxing Crescent "){
           document.getElementById("moon-descriptions");
           console.log(moonDescriptionElement[1]);
           }
        else if (lunarPhase(stage) === "First Quarter "){
           document.getElementById("#moon-descriptions");
           console.log(moonDescriptionElement[2]);
        } 
        else if (lunarPhase(stage) === "Waxing Gibbious "){
           document.getElementById("moon-descriptions");
           console.log(moonDescriptionElement[3]);
        } 
        else if (lunarPhase(stage) === "Waxing Full Moon "){
           document.getElementById("moon-descriptions");
           console.log(moonDescriptionElement[4]);
        } 
        else if (lunarPhase(stage) === "Waning Gibbious "){
           document.getElementById("moon-descriptions");
           console.log(moonDescriptionElement[5]);
        } 
        else if (lunarPhase(stage) === "Last Quartar "){
           document.getElementById("moon-descriptions");
           console.log(moonDescriptionElement[6]);
        } 
        else if (lunarPhase(stage) === "Waning Crescent "){
           document.getElementById("moon-descriptions");
           console.log(moonDescriptionElement[7]);
        }
    
    }



//close modal on button
function closeModal() {
    modal.style.display = 'none';
}

function outsideModal(event) {
    if(event.target == modal) {
        
        modal.style.display = 'none';}
    }
    
    let loadPage = function(){
        sixthWeek[0].style.visibility = "hidden";
        calendar.style.height = "630px";
        loadArray();
        loadCalendar();
    }
    
    loadPage();
    
    

    document.addEventListener("DOMContentLoaded", ()=> {
        const phase = lunarPhase ();
        console.log(phase);
    } )
    //append this data to modal use div idi 
    var modalInfoDiv = document.getElementById("moon-age");
    var divContent = document.createTextNode(lunarPhase.response);
    modalInfoDiv.appendChild(divContent);
    
    // this function runs when the submit button is clicked 
    // this function runs when the submit button is clicked 
    var submitButtonHandler = function (event) {
        event.preventDefault();
        // get city value from input element
        var selectedCity = cityInputEl.value.trim();
        
        // if a city is entered then run code 
        if (selectedCity) {
            getLatLong(selectedCity);
            
            localStorage.setItem('savedCity',selectedCity);
            // errorBox.setAttribute("class", "display: none");
            
        }
        else {
            // error modal appears 
            
            errorBox.setAttribute("class", "display: block");
        }
        
    };
    
    
    // this function will get the latitude and longitude to be used in the weather search 
    var getLatLong = function (selectedCity) {
        // this creates a URL for the api request based off of the city entered
        var apiUrl = "http://api.positionstack.com/v1/forward?access_key=c4bf58a019f128c64c20b6e41582639b&query=" + selectedCity + "&limit=1";
        
        // fetch request to get lat and long from url we just created
        fetch(apiUrl).then(function (response) {
            // take response and convert it to data we cna use
            response.json().then(function (data) {
                
                // Hey Corrie, you can use these variables in your api call for the weather information. This will give you the latitude and longitude based on their search 
                let lat = data.data[0].latitude;
                let lon = data.data[0].longitude;
                console.log(lat);
                console.log(lon);
                
                console.log(`First Log: Lat/Lon ${lat} & ${lon}`);
                
                localStorage.setItem('savedLat', lat);
                localStorage.setItem('savedLon', lon);
                
                cityNameEl.textContent = "Your daily moon and weather information is populating!"
                getWeather();
                
            })
        })
        .catch(function(error) {
            errorCatchBox.setAttribute("style", "display: block");
        })
        
        
    };
    
    // Pulling the weather information
    function getWeather() {
            const lat = localStorage.getItem('savedLat');
            const lng = localStorage.getItem('savedLon');
            
            if (lat && lng) {
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
            })
        .catch(() => {
            errorCatchBox.setAttribute("style", "display: block");
        });
        
        
        // Precipitation Fetch
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minute,hourly,alert&appid=f17ddf4709497b276463e08f28044887`, {
        }).then((response) => response.json()).then((res) => {
            // Pulling in Precipitation
            const precipitation = res.daily[0].rain
            
            if (precipitation) {
                    // Saving Precipitation
            localStorage.setItem('savedPrecipitation',(precipitation));
            }
            
            
            
            
        })
        .catch(() => {
            errorCatchBox.setAttribute("style", "display: block");
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
            
            
        })
        .catch(() => {
            errorCatchBox.setAttribute("style", "display: block");
        });
        
    }
    setTimeout(showWeather,5000);
};

// Function to display saved Weather/Astrology info
function showWeather() {
    const cityName = localStorage.getItem('savedCity');
    
    if (cityName) {
        // Displaying City Weather is pulling
        
        cityNameEl.textContent = cityName;
        cityInputEl.value = "";
        
        // Displaying Today's Date
        
        const today = new Date();
        weatherTodayEl.textContent = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
        
        // Display Cloud Coverage Information
        const cloudCoverageDisplay = localStorage.getItem('savedCloudCoverage')
        cloudCoverEl.textContent = `Cloud Coverage: ${cloudCoverageDisplay}`;
        
        // Display Air Temparature Information
        const airTempDisplay = localStorage.getItem('savedAirTemperature')
        const celsius = Math.round(parseInt(airTempDisplay));
        const fahrenheit = Math.round(celsius * 9/5 + 32);
        airTempEl.textContent = `Temperature: ${celsius}°C/ ${fahrenheit}°F`;
        
        // Display Precipitation
        const precipitationDisplay = localStorage.getItem('savedPrecipitation');

        var precipitationEl = document.querySelector('#precipitation')
        console.log(precipitationDisplay);
        if (precipitationDisplay) {
            precipitationEl.textContent = `Precipitation: ${precipitationDisplay}mm`;
        }
        else {
            precipitationEl.textContent = `Precipitation: None forecasted`;
        }
        
        
        // Displaying Moon Phase
        const moonPhaseDisplay = localStorage.getItem('savedMoonPhase');
        moonPhaseEl.textContent = `Moon Phase: ${moonPhaseDisplay}`;

        // Displaying Moon Rise
        const moonRiseDisplay = localStorage.getItem('savedMoonRise');
        moonRiseEl.textContent = `Moon Rise: ${moonRiseDisplay} am`;

        // Displaying Moon Set
        const moonSetDisplay = localStorage.getItem('savedMoonSet');
        moonSetEl.textContent = `Moon Set: ${moonSetDisplay} pm`;
        }
        else {
            cityNameEl.textContent = "Enter a City to Get Started!"
        };
    };
    
getWeather();
// event listener for error modal close button
errorCloseButton.addEventListener("click", function() {
    errorBox.setAttribute("style", "display: none");
});


// variables for the box to catch general errors
var errorCatchBox = document.querySelector("#error-catch-container");
var errorCatchCloseButton = document.querySelector("#error-catch-close");

// event listener for general error modal close button 
errorCatchCloseButton.addEventListener("click", function() {
    errorCatchBox.setAttribute("style", "display: none");
})


// Clear City Data
clearCityButtonEl.addEventListener('click', function() {
    localStorage.clear();
    cityNameEl.textContent = "Enter a City to Get Started!";    
    weatherTodayEl.textContent = "";
    cloudCoverEl.textContent = "";
    airTempEl.textContent = "";
    precipitationEl.textContent = "";
    moonPhaseEl.textContent = "";
    moonRiseEl.textContent = "";
    moonSetEl.textContent = "";
});
// event listener for the submit button-- needs to be near bottom of page 
submitButton.addEventListener("click", submitButtonHandler);




