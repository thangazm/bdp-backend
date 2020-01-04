$(function () {
    /* customJS
     * -------
     * Data and config for customValues
     */
    'use strict';
    const fileUrl = './resources/mytext.txt'; // provide file location
    var headers = [];
    var labels = [];
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileUrl, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                // var allText = rawFile.responseText;
                var lines = rawFile.responseText.split("\n");
                // alert(lines);
                for (var i = 0; i < lines.length; i++) {
                    console.log('text is', lines[i]);
                    var data = lines[i].split(' ');
                    headers.push(data[0] + ' ' + data[1]);
                    labels.push(data[2]);
                }
            }
        }
    }
    console.log(headers)
    console.log(labels)

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

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: headers,
            datasets: [{
                label: '# of Rentals',
                backgroundColor: getRandomColorEachEmployee(6),
                borderWidth: getRandomColorEachEmployee(6),
                data: labels,
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

    var arrObj = [{ "firstName": "John", "lastName": "Doe", "age": "46" },
    { "firstName": "James", "lastName": "Blanc", "age": "24" }]
    var objLength = arrObj.length;
    var myvar = '<table>' +
        '<tr>' +
        '<th>firstName</th>' +
        '<th>last Name</th>' +
        '<th>age</th>' +
        '</tr>';

    for (var i = 0; i < objLength; i++) {
        myvar += '<tr>' +
            '<td>' + arrObj[i].firstName + '</td>' +
            '<td>' + arrObj[i].lastName + '</tD>' +
            '<td>' + arrObj[i].age + '</th>' +
            '</tr>'
    }

    myvar += '</table>';

    console.log(myvar);
    document.getElementById('myTable').innerHTML = myvar;

    rawFile.send(null);
});