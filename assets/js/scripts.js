

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
            var lat = data.data[0].latitude;
            var lon = data.data[0].longitude;
            console.log(lat);
            console.log(lon);
            // need to figure out how to pull latitude and longitude from the data, it isn't working
        })
    })


};























// event listener for the submit button-- needs to be near bottom of page 
submitButton.addEventListener("click", submitButtonHandler)

