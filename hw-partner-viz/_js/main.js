"use strict";
// Highcharts API documentation
// (available at: http://api.highcharts.com/highcharts)

// function to return color
function colors(name) {
    var val = name.toLowerCase();
    console.log("colors, val: " + val);
    switch(val) {
      case "surgicalinfection":
        return "#A31621";
        break;
      case "catheterinfection":
        return "#FA7921";
        break;
      case "surgicalerror":
        return "#FCBA04";
        break;
      case "incorrectdosage":
        return "#B7F0AD";
        break;
      case "incorrectmedicaiton":
        return "#DDDDDD";
        break;
      case "delayintreatment":
        return "#2292A4";
        break;
      case "misdiagnosis":
        return "#4464AD";
        break;
      case "iverror":
        return "#D1D2F9";
        break;
    };
  };

Highcharts.setOptions({
    lang: {
        thousandsSep: ',' // add "," at appropriate points in numbers.
    }
});

var options = {
    chart: {
        renderTo: "container",
        type: "line"
        },

    title: {
        text: "Percent Mortality Rates Decrease Each Year"
    },

    subtitle: {
        text: "Source: Info247-fictitious-data.edu"
    },

    // We can leave the x-axis categories blank for now. By default, highcharts will put numbers there.
    xAxis: {
            categories: []
    },

    // declaring y-axis options
    yAxis: {
        title: {
            text: 'Number of Event Occurrences'
        }
    },

    tooltip: {
        valueSuffix: "patients"
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2012
        }
    },


    series: []
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

            console.log("items[1]: " + items[0]);
            console.log("colors: " + colors[items[0]]);

            if (!found) { // add a new category
                options.series.push({
                    name: items[0],
                    data: [Number(items[1])],
                    color: colors(items[0])
                })
            }

            console.log(options.series);

        };
    });
    // Draw the chart
    var chart = new Highcharts.Chart(options);

});
