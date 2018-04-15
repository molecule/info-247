# INFO247_Lab3_Highcharts
<em>Lab exercise for INFO 247: Information Visualization and Presentation at UC Berkeley School of Information</em>

<h3>Goals</h3>
<ul>
<li>Set up and adjust chart options using the Highcharts API documentation (available at: http://api.highcharts.com/highcharts)</li>
<li>Set up and load data from a csv file using AJAX</li>
</ul>

<h3>Instructions</h3>
<p>You do not need to update the html or css. Just work on the script in this file.</p>
<strong>Part 1</strong> is to set up the chart options and render a chart using the inline data. Take a look at part1_solution.png but feel free to play around with chart options as well. Note: for this part your x-axis will just show numbers (0-11), we'll add the months in Part 2. 

<strong>Part 2</strong> is to load external data to the chart you have just set up. Do Part 2 in the same index.html file. There are detailed instructions in the file to let you know what you need to comment out and uncomment. Please ask if any of this is confusing!

Follow the instructions in the code and let us know if you have questions! 

<h3>Hints/Debugging</h3>
<p>A few tips if you run into trouble</p>
<ul>
<li>Remember to use your browser's developer console to check for errors (often it ends up being small things like forgetting a comma or bracket</li>
<li>Make sure to close all your executable statements with a ;</li>
<li>In Part 2 if your chart is not rendering and you aren't seeing any errors in the console there may be an issue loading the data. If you open the csv file in Excel or another program it may mess up the encoding and get rid of the newlines. I would recommend using TextWrangler to check your encoding and make sure it is set to Unicode (UTF-8) and Unix (LF). Ask if you are having issues with this.</li>

