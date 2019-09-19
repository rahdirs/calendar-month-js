function today(dateString, option) {
    //labels
    let dayLabelShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayLabel = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthLabel = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let data = {};
    data.today = dateString;
    //day details
    data.jmonth = data.today.getMonth();
    data.month = data.today.getMonth() + 1;
    data.year = data.today.getFullYear();
    data.days = new Date(data.year,(data.month),0).getDate();
    data.monthStartDay = new Date(data.year,(data.today.getMonth()),1).getDay();
    data.monthEndDay = new Date(data.year,(data.month),0).getDay();
    data.day = data.today.getDay();
    data.dayShortName = dayLabelShort[data.day];
    data.dayFullName = dayLabel[data.day];
    data.monthName = monthLabel[data.today.getMonth()];
    data.date = data.today.getDate();
    data.dateFormat = ((data.today.getDate() < 10 ? '0' : '') + data.today.getDate()) + "-" + ((data.today.getMonth() + 1) < 10 ? '0' : '') + (data.today.getMonth() + 1) + "-" + data.year;
   
    //previous
    data.previous = {};
    data.previous.date = new Date(data.year,(data.jmonth - 1),1);
    if (data.jmonth == 0) {
        data.previous.date = new Date(data.year - 1,11,1);
    }
    data.previous.days = new Date(data.previous.date.getFullYear(),(data.previous.date.getMonth() + 1),0).getDate();
    data.monthList = [];
    //previous month 
    var listCount = 0;
    for (var i = 0; i < data.monthStartDay; i++) {
        data.monthList[listCount] = {};
        var d = (data.previous.days - data.monthStartDay) + (i + 1);
        var l = d % 7;
        data.monthList[listCount]["date"] = d;
        data.monthList[listCount]["day"] = dayLabel[l];
        data.monthList[listCount]["state"] = "previous";
        data.monthList[listCount]["month"] = monthLabel[data.jmonth - 1];
        listCount++;
    }
    //current month 
    for (var i = 0; i < data.days; i++) {
        data.monthList[listCount] = {};
        data.monthList[listCount]["date"] = (i + 1);
        var d = (i + data.monthStartDay) % 7;
        data.monthList[listCount]["day"] = dayLabel[d];
        data.monthList[listCount]["state"] = "current";
        data.monthList[listCount]["month"] = monthLabel[data.jmonth];
        listCount++;
    }
    //next month 
    var last = 1;
    for (var i = data.monthEndDay; i < 6; i++) {
        data.monthList[listCount] = {};
        data.monthList[listCount]["date"] = last;
        var d = (last + data.monthEndDay) % 7;
        data.monthList[listCount]["day"] = dayLabel[d];
        data.monthList[listCount]["state"] = "next";
        data.monthList[listCount]["month"] = monthLabel[data.jmonth + 1];
        listCount++;
        last++;
    }

    return data;
}
