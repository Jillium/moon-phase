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