const dayMappingObj = {
    0: "m",
    1: "t",
    2: "w",
    3: "t",
    4: "f",
    5: "s",
    6: "s"
}

const dayMapping = new Map(Object.entries(dayMappingObj));


function daysInYear(year) {
    return ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;
}

const get_days = (input) => {
    let year = input.slice(0, 1);
    let days = input.slice(1);
    let finalMap = new Map();
    let daysConverted = days.filter((day) => day > 0 && day < daysInYear(year)+1)
    .map((day) => (new Date(Date.UTC(year, 0, day))))
    for (i = 0; i < daysConverted.length; i++) {
        let date = daysConverted[i];
        updateMap(date, finalMap);
    }
    // console.log(daysConverted);
    // console.log(finalMap);
    let finalArr = [];
    // let finalString;
    for (i = 0; i < 12; i++) {

        let arr = finalMap.get(i);
        let string = '       ';
        if (arr) {
            string = checkDays(arr);
            // finalArr[i] = string;
        }
        finalArr.push(string);

        // finalArr[i] = string;
    }
    // console.log(finalArr.join());
    return finalArr.join();
    
    // let result = days.map((day) => console.log(new Date(date.setDate(day))));
    // first check greater than 1 and less than 365
}

function updateMap(date, map) {
    let month = date.getUTCMonth();
    let day = date.getUTCDay();
    let dayHelper;
    if (day == 0) {
        dayHelper = 6;
    } else {
        dayHelper = day - 1;
    }
    if (!map.has(month)) {
        map.set(month, Array(7).fill(" "));
        map.get(month)[dayHelper] = dayMapping.get(dayHelper.toString());
    } else {
        map.get(month)[dayHelper] = dayMapping.get(dayHelper.toString());
    }
}

function checkDays(arr) {
        // check if wkday, wkend, all days
        // does not contain blank space -> all day
        // first 5 no blank and last 2 blank -> week day
        // if last 2 not blank and first 5 all blank -> weekend
        // RETURN STRING
    let string = arr.join('');
    if (string == 'mtwtfss') {
        return 'alldays';
    } else if (string == '     ss') {
        return 'weekend';
    } else if (string == 'mtwtf  ') {
        return 'weekday';
    } else {
        return string;
    }
}

const get_new_year = (output) => {
    let index = output.indexOf(" ");
    // console.log(index);
    let newYear = 2001 + index;
    let firstDay = new Date(Date.UTC(newYear, 0, 1));
    let arr = output.split(",");
    // return the DATE passing in the year and month and day 
    console.log(arr);
    let arrCumDays = [];
    arrCumDays.push(getNumDays(newYear, 0));

    for (i=1; i <12; i++) {
        temp = getNumDays(newYear, i);
        arrCumDays[i] = arrCumDays[i-1] + temp;
    }

    for (i=0; i< 12; i++) {
        let month = i;
        let days = arr[i];
         // year and month, i have first DAY
        firstDay = new Date(Date.UTC(newYear, i)).getUTCDay();
        // if all days, add in first consecutive weekdays of that month
        // if weekend, add in first weekend of that month
        // if weekday, add in first consecutive m-
        // if (days == 'weekend') {
        //     console.log(getNumDays(newYear, month + 1));
            
        // }
    }
    // add the cum of months, then add difference between wkend and first day (and next day after)
    // firstWkEnd = firstDay
    // console.log(new Date(Date.UTC(2022, 8)).getUTCDay())
    console.log(arrCumDays);

}

const getNumDays = (year, month) => {
    return new Date(year, month, 0).getDate();
}


module.exports = { get_days, get_new_year };

module.exports.add = function (x, y) {
    return x + y;
};