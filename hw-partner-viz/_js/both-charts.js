"use strict";

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

var options_percentageMortality = {
    chart: {
        renderTo: "container-percentageMortality",
        type: "line"

        },

    title: {
        text: 'Percentage Mortality Per Problem Type vs Year',
        x: -20 //center
      },

      subtitle: {
        text: "Source: Info247-fictitious-data.edu"
    },


    xAxis: {
            categories: ['2012', '2013','2014','2015']
    },

    // declaring y-axis options
    yAxis: {
        title: {
            text: 'Mortality (%)'

        },
        tickInterval: 10,
        max: 100
    },

    tooltip: {
        // ***Add*** a suffix to your tooltip to show that the temperatures are in Celsius
        valueSuffix: "%"
    },

    legend: {
        // ***Add*** in the legend variables such that you have a vertical legend on the right side
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },

    series: []
};



$.get("_data/HospitalErrors-edited.csv", function (data) {
    var lines = data.split("\n") ;
    $.each(lines, function ( lineNo, line ) {
        var items = line.split(",") ;
        if (lineNo == 0) {
            $.each(items, function (itemNo, item) {
                if (itemNo != 0) {
                    options_percentageMortality.xAxis.categories.push(item);
                }
            })

        } else {
            var seriesData = {
                name: "",
                data: [],
                color: colors(items[0])
            };
            seriesData.name = items[0];
            $.each(items, function (itemNo, item) {
      				if (itemNo >= 9) {
  						    seriesData.data.push(Number(item));
      				}
      			})
            options_percentageMortality.series.push(seriesData);
        };
    });
    var chart = new Highcharts.Chart(options_percentageMortality);
});

Highcharts.setOptions({
    lang: {
        thousandsSep: ',' // add "," at appropriate points in numbers.
    }
});

var options = {
    chart: {
        renderTo: "container-numOccurrences",
        type: "line"
        },

    title: {
        text: "Occurrences of Avoidable Medical and Operational Errors Decrease Each Year"
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
        },
        tickInterval: 500
    },

    tooltip: {
        valueSuffix: " errors"
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

        if (lineNo != 0) { // first line is categories.
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

