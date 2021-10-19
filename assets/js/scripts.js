//variable for the submit button
var submitButton = document.querySelector("#search-btn");
//variable for the input to search a city 
var cityInputEl = document.querySelector("input")
// variable for the selected city







// this function runs when the submit button is clicked 
var submitButtonHandler = function(event) {
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

}


// this function will get the latitude and longitude to be used in the weather search 
var getLatLong = function(selectedCity) {
    var apiUrl = "http://api.positionstack.com/v1/forward?access_key=c4bf58a019f128c64c20b6e41582639b&query=" + selectedCity
    console.log(apiUrl);


}























// event listener for the submit button-- needs to be near bottom of page 
submitButton.addEventListener("click", submitButtonHandler)