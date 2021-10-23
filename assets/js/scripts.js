var calendarData = [];
var currentDay = {};
var currentYear = 2021;
var currentMonth = 5; //June
var calendarDay = document.getElementsByClassName("days");
var  selectedMonth = document.getElementById("start");
console.log(selectedMonth.value);

let loadArray = function(){
    calendarData = [];
    let selected = selectedMonth.value.split('-');
    currentYear = selected[0];
    currentMonth = selected[1];
    console.log(currentMonth);

    let lastDay = new Date(currentYear,currentMonth+1,0).getDate();
    console.log(lastDay);
    
    for (let i = 1; i <= lastDay;i++){
        var d = new Date(currentYear,currentMonth-1,i);
        var date = d.getDate();
        var day = d.getDay();

        var weekOfMonth = Math.ceil((date - 1 - day) / 7)+1;
        console.log(d+":"+date+":"+day+":"+weekOfMonth+":"+currentMonth);
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
    for (let i = 0; i < calendarDay.length; i++) {
        getData(calendarDay[i].dataset.dow, calendarDay[i].dataset.wom);

        if(currentDay){
            calendarDay[i].textContent=currentDay.day;
            
        }
        currentDay = {};
    }
}

let loadPage = function(){
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
    console.log("modal closed");
    modal.style.display = 'none';
}

function outsideModal(event) {
    console.log("clicked outside model");
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
            var cityNameEl = document.querySelector('#city-name');
            
            cityNameEl.textContent = selectedCity;
            cityInputEl.value = "";
            
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
    const cloudCoverage = res.hours[0].cloudCover.noaa + '%'
  console.log(`cloud coverage ${cloudCoverage}`)
    const precipitation = res.hours[0].precipitation.noaa + '%'
  console.log(`precipitation ${precipitation}`)
    const airTemp = res.hours[0].airTemperature.noaa + '°C'
  console.log(`temperature ${airTemp}`)
});

// Astronomy Fetch
let end = 2021-02-28;

fetch(`https://api.stormglass.io/v2/astronomy/point?lat=${lat}&lng=${lng}&end=${end}`, {
  headers: {
    'Authorization': '1e6476cc-3387-11ec-b37c-0242ac130002-1e647744-3387-11ec-b37c-0242ac130002'
  }
}).then((response) => response.json()).then((res) => {
  console.log(res);
  const moonPhase = res.object.data[0].moonPhase.current.text
  console.log(moonPhase);
});
};

getWeather();






















// event listener for the submit button-- needs to be near bottom of page 
submitButton.addEventListener("click", submitButtonHandler)

