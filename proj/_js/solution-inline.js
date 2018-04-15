	//PART 1: SET UP CHART OPTIONS & GENERATE USING INLINE DATA
	var options = {
		chart: {
			renderTo: "container",
			type: "line"
		},
        title: {
            text: 'Monthly Average Temperature in Four Cities',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
             categories: []
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }

        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        //here is the data for the chart, hardcoded inline
        series: [{
            name: 'Berkeley',
            data: [9.3,10.9,11.8,12.9,14.3,16,16.4,16.5,17.1,15.9,13,9.9]
        },{
            name: 'Vancouver',
            data: [2.7,4.4,6.1,8.9,12.3,15.1,17.3,17.1,14.3,10.0,5.9,3.7]
        }, {
            name: 'Nairobi',
            data: [19.5,20.2,20.6,20.3,19.2,17.7,16.8,17.2,18.6,19.7,19.3,19.3]
        }, {
            name: 'Sydney',
            data: [22.1,22.1,21.0,18.4,15.3,12.9,12.0,13.2,15.3,17.7,19.5,21.2]
        }]
    };
    var chart = new Highcharts.Chart(options);