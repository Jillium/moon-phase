var calendarData = [];

// calendarData.push("February");

let lastDay = new Date(2021,2,0).getDate();
console.log(lastDay);

for (let i = 1; i <= lastDay;i++){
    var d = new Date(2021,2,i);
    var date = d.getDate();
    var day = d.getDay();

    var weekOfMonth = Math.ceil((date - 1 - day) / 7)+1;

    calendarData.push({day:i,dayOfWeek:day,weekOfMonth:weekOfMonth,image:'magine name',brightness:.1});

};

console.log(calendarData);


var currentDay = {};
calendarData.forEach(function(entry) {
    currentDay = entry;
    console.log(currentDay.dayOfWeek);
});

// let index = calendarData.findIndex(a => a.dayOfWeek === 2);

// var index;
// calendarData.some(function(entry, i) {
//     if (entry.dayOfWeek === 2) {
//         index = i;
//         return true;
//     }
//     console.log(entry.dayOfWeek);
// });

// console.log(index);

// var x = document.getElementsByClassName("days");
// var i;
// for (i = 0; i < x.length; i++) {
//     console.log(x[i].textContent);

// }