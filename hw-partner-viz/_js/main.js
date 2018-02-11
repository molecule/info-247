"use strict";
// LAB 3
// GOALS:
// -Be able to set up and adjust chart options using the Highcharts API documentation
// (available at: http://api.highcharts.com/highcharts)

// -Be able to load data from a csv file using AJAX

// INSTRUCTIONS:
// You do not need to update the html or css. Just work on the script in this file.
// Part 1 is to set up the chart options and render a chart using the inline data.
// Part 2 is to load external data to the chart you have just set up.
// Follow the instructions in the code below and let us know if you have questions!

// PART 1: SET UP CHART OPTIONS & GENERATE USING INLINE DATA
var options = {
    chart: {
        renderTo: "container",
        // ***Add*** chart type here
        type: "line"
        },

    // ***Add*** title text
    title: {
        text: "Monthly Average Temperature in Four Cities"
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
    series: []
    /*
    series: [{
        name: 'Berkeley',
        data: [9.3,10.9,11.8,12.9,14.3,16,16.4,16.5,17.1,15.9,13,9.9]
    },{
        name: 'Vancouver',
        data: [2.7,4.4,6.1,8.9,12.3,15.1,17.3,17.1,14.3,10.0,5.9,3.7,9.8]
    }, {
        name: 'Nairobi',
        data: [19.5,20.2,20.6,20.3,19.2,17.7,16.8,17.2,18.6,19.7,19.3,19.3,19.0]
    }, {
        name: 'Sydney',
        data: [22.1,22.1,21.0,18.4,15.3,12.9,12.0,13.2,15.3,17.7,19.5,21.2,17.6]
    }]
    */
};

// Generate the chart (comment this out for part 2)
//var chart = new Highcharts.Chart(options);


//PART 2: LOADING DATA FROM A CSV USING AJAX

/*Once you have the code above working and generating a chart, comment out the var chart line directly above here and
uncomment the code below to load the data from the csv using AJAX. You will need to follow the instructions in the code below
to fill in this code and pull in the data. Delete the "/*" at the beginning of the next line and the "* /" at the bottom of the
code to get started.*/

// Ajax call to pull in data from the csv file data.csv

$.get("_data/HospitalErrors.csv", function (data) {
    // ***Add code here*** to create a variable "lines" that splits the csv by line using ("\n")
    // Need a hint? The JavaScript string split method is the same as in python

    var lines = data.split("\n");
    console.log("lines: " + lines);

    //loop through each line of the csv file using $.each
    //Remember: the first argument to the each function is the index iterator
    $.each(lines, function ( lineNo, line ) {

        // ***Add code here*** to set var items equal to an array of the current line's values
        // Make sure to turn each line into an array by splitting on ","

        var items = line.split(",");
        console.log("items: " + items);

        // For first line of data (header) populate xAxis categories with months
        if (lineNo == 0) {
            // Loop through each item in the array items
            $.each(items, function (itemNo, item) {
                // Skip the first item in line 0 because it is the City label
                // For the rest of the first row of data add to the categories variable for the xAxis using push method within the if statement
                if (itemNo != 0) {
                    // ***Add code here*** to use the push method to push each item to the xAxis categories property in options
                    console.log("item: " + item);
                    options.xAxis.categories.push(item);
                }
            })

        } else {
            var seriesData = {
                name: "",
                data: []
            };

            // Grab the seriesData obect and populate with data from items
            // ***Add code here*** to set seriesData.name to the first value in items
            seriesData.name = items[0];

            // Loop through each item in the array items for the current line and add it to the data array
            $.each(items, function (itemNo, item) {
                // Skip the first value in items since you already set it as name
                if (itemNo != 0) {
                    // ***Add code here*** to push values to seriesData.data
                    // Note: you will need to use Number() to change the values from the csv file from strings to floats
                    console.log("item in series: " + item);
                    seriesData.data.push(Number(item));
                };
            })
            console.log("seriesData")
            // Now you have your var seriesData populated with the cities in name and the temperatures in data
            // ***Add code here*** to push seriesData to series in chart options
            options.series.push(seriesData);

        };
    });
    // ***Add code here***
    // Now you can draw the chart by creating a new Highcharts object with the settings defined in options
    //var chart = new Highcharts.Chart(options);

});
