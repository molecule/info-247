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

// Ajax call to pull in data from the csv file data.csv
$.get("_data/HospitalErrors.csv", function (data) {
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
            var seriesData = {
                name: "",
                data: []
            };
            // check to see if that seriesData.name is already there, if so, add to it.
            var found = false;
            $.each(options.series, function ( seriesNo, serie ) {
                if (serie.name === items[0]) { // already have this category
                    serie.data.unshift(Number(items[1]));
                    found = true;
                }
            })

            if (!found) { // add a new category
                options.series.push({
                    name: items[0],
                    data: [Number(items[1])]
                })
            }

            console.log(options.series);

        };
    });
    // ***Add code here***
    // Now you can draw the chart by creating a new Highcharts object with the settings 
    //defined in options
    var chart = new Highcharts.Chart(options);

});
