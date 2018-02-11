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
            /*plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]*/
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
        series: []
    };

    //PART 2: LOADING DATA FROM A CSV USING AJAX. 

    // ajax call to pull in data from the csv file data.csv
    $.get("_data/data.csv", function (data) {
    	
    	//split the csv by line using ('\n')
    	var lines = data.split("\n");

    	//loop through each line of the csv file using $.each
    	$.each(lines, function ( lineNo, line ) {
    		
            //set var items equal to an array of the current line's values
            //turn each line into an array by splitting on ","
    		var items = line.split(",");
    		
            //for first line of data (header) populate xAxis categories with months
    		if (lineNo == 0) {
    			
    			//loop through each item in the array items
    			$.each(items, function (itemNo, item) {
    				//skip the first item in line 0 because it is the City label
                    //for the rest of the first row of data add to the categories variable for the xAxis using push method within the if statement
                    if (itemNo != 0) {
                        //use the push method to push each item to the xAxis categories property in options
    					options.xAxis.categories.push(item);
    				}
    				
    			})
    			
    		} else {
    			var seriesData = {
    				name: "",
    				data: []
    			};
	  			//grab the seriesData obect and populate with data from items
                //set the first value in the items array to seriesData.name
    			seriesData.name = items[0];
    			
    			//loop through each item in the array items for current line and add to data array
    			$.each(items, function (itemNo, item) {
                    //skip the first value in items since you already set it as name
    				if (itemNo != 0) {
                        //push values to seriesData.data
    					seriesData.data.push(Number(item));
    				}
    			})
    			//Now you have your var seriesData populated with the cities in name and the temperatures in data
                //push seriesData to series in chart options
    			options.series.push(seriesData);
    		};
    });
    //draw the chart by creating a new Highcharts object with the settings defined in options
    var chart = new Highcharts.Chart(options);
});