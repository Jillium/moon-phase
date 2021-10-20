var calendarData = [];
var currentYear = 2021;
var currentMonth = 5; //June

// calendarData.push("February");

let lastDay = new Date(currentYear,currentMonth,0).getDate();
console.log(lastDay);

for (let i = 1; i <= lastDay;i++){
    var d = new Date(currentYear,currentMonth,i);
    var date = d.getDate();
    var day = d.getDay();

    var weekOfMonth = Math.ceil((date - 1 - day) / 7)+1;

    calendarData.push({day:i,dayOfWeek:day,weekOfMonth:weekOfMonth,image:'image name',brightness:.1});

};

console.log(calendarData);

var currentDay = {};
let getData = function(dOW,wOM){

    calendarData.forEach(function(entry) {
    if((entry.dayOfWeek == dOW) && (entry.weekOfMonth == wOM)){
    currentDay = entry;
    return true;
    }
});
}

var calendarDay = document.getElementsByClassName("days");
var i;
for (i = 0; i < calendarDay.length; i++) {
    getData(calendarDay[i].dataset.dow, calendarDay[i].dataset.wom);

    if(currentDay){
        calendarDay[i].textContent=currentDay.day;
        
    }
    currentDay = {};
}