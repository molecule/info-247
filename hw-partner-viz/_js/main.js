"use strict";
// Highcharts API documentation
// (available at: http://api.highcharts.com/highcharts)

// PART 1: SET UP CHART OPTIONS & GENERATE USING INLINE DATA
var options = {
    chart: {
        renderTo: "container",
        // ***Add*** chart type here
        type: "line"
        },

    // ***Add*** title text
    title: {
        text: "Percent Mortality Rates Decrease Each Year"
    },
    


    // ***Add*** subtitle text
    subtitle: {
        text: "Source: WorldClimate.com"
    },


    // We can leave the x-axis categories blank for now. By default, highcharts will put numbers there.
    xAxis: {
            categories: []
    },

    // declaring y-axis options
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },

    tooltip: {
        // ***Add*** a suffix to your tooltip to show that the temperatures are in Celsius
        valueSuffix: "°C"

    },

    legend: {
        // ***Add*** in the legend variables such that you have a vertical legend on the right side
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },

    // Data for the chart, hardcoded inline; leave as such for Part 1
    // For Part 2 comment out this data and replace with an empty array for series 'series: []'
    //series: []
    
    series: [{
        name: 'NONSENSE',
        data: [45,20,10,5]
    }]
};

// Generate the chart (comment this out for part 2)
//var chart = new Highcharts.Chart(options);


//PART 2: LOADING DATA FROM A CSV USING AJAX

/*Once you have the code above working and generating a chart, comment out the var 
chart line directly above here and
uncomment the code below to load the data from the csv using AJAX. You will need 
to follow the instructions in the code below
to fill in this code and pull in the data. Delete the "/*" at the beginning of the 
next line and the "* /" at the bottom of the
code to get started.*/

// Ajax call to pull in data from the csv file data.csv

$.get("_data/HospitalErrors.csv", function (data) {
    // ***Add code here*** to create a variable "lines" that splits the csv by line using ("\n")
    // Need a hint? The JavaScript string split method is the same as in python

    var lines = data.split("\n"); // Note: if using sublime2, it automatically changes line endings.
                                    // this works w/ "Windows" or "Unix" style line endings, but not "Mac"
    console.log("lines: " + lines);
    var dataCategories = {};

    $.each(lines, function ( lineNo, line ) {
        console.log("line: " + line);
        var items = line.split(",");
        console.log("items: " + items);

        // For first line of data, grab data categories.
        if (lineNo == 0) {
            console.log("lineNo == 0");
            $.each(items, function (itemNo, item) {
                console.log("item: " + item + ", itemNo: " + itemNo);
                dataCategories[String(item)] = []; // each category is an empty array waiting to be filled.

                console.log(dataCategories);
            })
        } else {
            console.log("************** POPULATING SERIES DATA");
            var seriesData = {
                name: "",
                data: []
            };
            // check to see if that seriesData.name is already there, if so, add to it.
            console.log("items[0]: " + items[0]); // Should be error type.
            console.log(options.series);
            var found = false;
            $.each(options.series, function ( seriesNo, serie ) {
                if (serie.name === items[0]) { // already have this category
                    serie.data.unshift(Number(items[1]));
                    found = true;
                } else {

                }
            })

            if (!found) {
                options.series.push({
                    name: items[0],
                    data: [Number(items[1])]
                })
            }

            console.log(options.series);
            /*
            $.each(items, function (itemNo, item) {
                console.log("itemNo: " + itemNo + ", item: " + item);
                if (itemNo == 4) { // 4th element is "% mortality"
                    console.log("item in series: " + item);
                    seriesData.data.push(Number(item));
                };
            })
            //console.log("seriesData")
            // Now you have your var seriesData populated with the cities in name and 
            // the temperatures in data
            // ***Add code here*** to push seriesData to series in chart options
            options.series.push(seriesData);
            */

        };
    });
    // ***Add code here***
    // Now you can draw the chart by creating a new Highcharts object with the settings 
    //defined in options
    var chart = new Highcharts.Chart(options);

});
