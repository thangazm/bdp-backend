$(function () {
    /* customJS
     * -------
     * Data and config for customValues
     */
    'use strict';
    const filehistogram = './resources/pyspark/histogram-month/histogram-month.csv';

    // total number of rentals for neighborhood groups
    var label = []
    var data = []
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filehistogram, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                // var allText = rawFile.responseText;
                var lines = rawFile.responseText.split("\n");
                // alert(lines);
                for (var i = 0; i < lines.length; i++) {
                    console.log('text is', lines[i]);
                    var text = lines[i].split(',');
                    label.push(text[0]);
                    data.push(text[1]);
                }
            }
        }
    }
    rawFile.send(null);

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRandomColorEachEmployee(count) {
        var data = [];
        for (var i = 0; i < count; i++) {
            data.push(getRandomColor());
        }
        return data;
    }

    var ctx_histogram= document.getElementById('histogram').getContext('2d');
    var histogram = new Chart(ctx_histogram, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: '# of monthly histogram',
                backgroundColor: getRandomColorEachEmployee(data.length),
                borderWidth: getRandomColorEachEmployee(data.length),
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});