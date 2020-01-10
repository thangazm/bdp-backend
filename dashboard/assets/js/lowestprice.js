$(function () {
    /* customJS
     * -------
     * Data and config for customValues
     */
    'use strict';
    const filelowestprice = 'https://bdp-thanga.s3.us-east-1.amazonaws.com/dashboard/resources/hive2.2.3/lowest-top-5.txt'; 

    // total number of rentals for neighborhood groups
    var data = []
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filelowestprice, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                // var allText = rawFile.responseText;
                var lines = rawFile.responseText.split("\n");
                // alert(lines);
                for (var i = 0; i < lines.length; i++) {
                    console.log('text is', lines[i]);
                    var text = lines[i].split(',');
                    data.push({"host": text[0], "price": text[1], "roomtype": text[2]})
                }
            }
        }
    }
    rawFile.send(null);

    // var arrObj = [{ "firstName": "John", "lastName": "Doe", "age": "46" },
    // { "firstName": "James", "lastName": "Blanc", "age": "24" }]
    var objLength = data.length;
    var myvar = '<table class="table">' +
        '<tr>' +
        '<th scope="col">Host</th>' +
        '<th scope="col">Price</th>' +
        '<th scope="col">Room Type</th>' +
        '</tr>';

    for (var i = 0; i < objLength; i++) {
        myvar += '<tr scope="row">' +
            '<td>' + data[i].host + '</td>' +
            '<td>' + data[i].price + '</td>' +
            '<td>' + data[i].roomtype + '</td>' +
            '</tr>'
    }

    myvar += '</table>';

    console.log(myvar);
    document.getElementById('lowestprice').innerHTML = myvar;

});