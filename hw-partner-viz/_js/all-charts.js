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
        return "#033860";
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
        categories: ['2012', '2013','2014','2015'],
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 0.5,
            label: {
                rotation: 0,
                y: 15,
                style: {
                    fontStyle: 'italic',
                    fontSize: '12px',
                    fontWeight: 'bold'
                },
                text: '<i>Lisa Simpson joins <br> as Chief Administrator.</i>'
            },
            zIndex: 3
        }],
        plotBands: {
            color: 'rgba(0, 0, 0, 0.03)',
            from: 0.5,
            to: 4
        }
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

var options_numOccurrences = {
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
        categories: ['2012', '2013','2014','2015'],
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 0.5,
            label: {
                rotation: 0,
                y: 15,
                style: {
                    fontStyle: 'italic',
                    fontSize: '12px',
                    fontWeight: 'bold'
                },
                text: '<i>Lisa Simpson joins <br> as Chief Administrator.</i>'
            },
            zIndex: 3
        }],
        plotBands: {
            color: 'rgba(0, 0, 0, 0.03)',
            from: 0.5,
            to: 4
        }
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

    series: []
};

// Ajax call to pull in data from the csv file data.csv
$.get("_data/HospitalErrors.csv", function (data) {
    var lines = data.split("\n"); // Note: if using sublime2, it automatically changes line endings.
                                    // this works w/ "Windows" or "Unix" style line endings, but not "Mac"
    console.log("lines: " + lines);

    $.each(lines, function ( lineNo, line ) {
        var itemIndex = 1; // 1st elem is # occurrences
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
            $.each(options_numOccurrences.series, function ( seriesNo, serie ) {
                if (serie.name === items[0]) { // already have this category
                    serie.data.unshift(Number(items[itemIndex]));
                    found = true;
                }
            })

            console.log("items[0]: " + items[0]);
            console.log("colors: " + colors[items[0]]);

            if (!found) { // add a new category
                options_numOccurrences.series.push({
                    name: items[0],
                    data: [Number(items[itemIndex])],
                    color: colors(items[0])
                })
            }

            console.log(options_numOccurrences.series);

        };
    });
    // Draw the chart
    var chart = new Highcharts.Chart(options_numOccurrences);
});

var options_trainingDays = {
    chart: {
        renderTo: "container-trainingDays",
        type: "column",
        /*
        events: {
            load: addCalloutBubbles
          }
          */
        },

    title: {
        text: "Average Number of Training Days Does Not Change"
    },

    subtitle: {
        text: "Source: Info247-fictitious-data.edu"
    },

    // We can leave the x-axis categories blank for now. By default, highcharts will put numbers there.
    xAxis: {
        categories: ['2012', '2013','2014','2015'],
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 0.5,
            label: {
                rotation: 0,
                y: 15,
                style: {
                    fontStyle: 'italic',
                    fontSize: '12px',
                    fontWeight: 'bold'
                },
                text: '<i>Lisa Simpson joins <br> as Chief Administrator.</i>'
            },
            zIndex: 3
        }],
        plotBands: {
            color: 'rgba(0, 0, 0, 0.03)',
            from: 0.5,
            to: 4
        }
    },

    // declaring y-axis options
    yAxis: {
        title: {
            text: 'Average Number of Training Days'
        },
        //tickInterval: 500
    },

    tooltip: {
        valueSuffix: " training days"
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },

    series: []
};

function addCalloutBubbles() {
    console.log("addCalloutBubbles, series[0]: ");
    console.log(options_trainingDays.series[0]);
    options_trainingDays.series[0].points[1].update({
      dataLabels: {
        enabled: true,
        format: 'Early 1980s<br>recession',
        align: 'left',
        verticalAlign: 'middle',
        x: 13
      }
    });
}

// Ajax call to pull in data from the csv file data.csv
$.get("_data/HospitalErrors.csv", function (data) {
    var lines = data.split("\n"); // Note: if using sublime2, it automatically changes line endings.
                                    // this works w/ "Windows" or "Unix" style line endings, but not "Mac"
    console.log("lines: " + lines);

    $.each(lines, function ( lineNo, line ) {
        var itemIndex = 3; // 3rd elem is # training days.
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
            $.each(options_trainingDays.series, function ( seriesNo, serie ) {
                if (serie.name === items[0]) { // already have this category
                    serie.data.unshift(Number(items[itemIndex]));
                    found = true;
                }
            })

            console.log("items[1]: " + items[0]);

            if (!found) { // add a new category
                options_trainingDays.series.push({
                    name: items[0],
                    data: [Number(items[itemIndex])],
                    color: colors(items[0])
                })
            }

            console.log(options_trainingDays.series);

        };
    });
    // Draw the chart
    var chart = new Highcharts.Chart(options_trainingDays);
});