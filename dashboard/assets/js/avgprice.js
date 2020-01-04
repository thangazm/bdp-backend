$(function () {
    /* customJS
     * -------
     * Data and config for customValues
     */
    'use strict';
    const fileavgpricepr = './resources/hive2.2.1/pr-avg.txt'; 

    // total number of rentals for neighborhood groups
    var label = []
    var data = []
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileavgpricepr, false);
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

    var ctx_avgprice = document.getElementById('avgprice').getContext('2d');
    var avgprice = new Chart(ctx_avgprice, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: '# of Private Room Rentals',
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