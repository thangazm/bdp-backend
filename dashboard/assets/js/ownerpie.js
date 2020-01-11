$(function () {
    /* customJS
     * -------
     * Data and config for customValues
     */
    'use strict';
    const fileownerpercentage = './resources/pyspark/owner-percentage/owner-percentage.csv';

    // total number of rentals for neighborhood groups
    var label = []
    var data = []
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileownerpercentage, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                // var allText = rawFile.responseText;
                var lines = rawFile.responseText.split("\n");
                // alert(lines);
                label.push('Owners with one or less properties', 'Owners with more than one properties')
                data.push(100 - lines[0], lines[0])
                // label.push(text[0]);
                // data.push(text[2]);
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

    var ctx_ownerpie = document.getElementById('ownerpie').getContext('2d');
    var ownerpie = new Chart(ctx_ownerpie, {
        type: 'pie',
        data: {
            labels: label,
            datasets: [{
                label: '# of Owner Percentage',
                backgroundColor: getRandomColorEachEmployee(data.length),
                borderWidth: getRandomColorEachEmployee(data.length),
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            // responsive: true,
            // maintainAspectRatio: false,
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