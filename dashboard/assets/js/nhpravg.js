$(function () {
    /* customJS
     * -------
     * Data and config for customValues
     */
    'use strict';
    const filenhavgprice = './resources/hive2.2.2/top10-nh.txt'; 

    // total number of rentals for neighborhood groups
    var data = []
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filenhavgprice, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                // var allText = rawFile.responseText;
                var lines = rawFile.responseText.split("\n");
                // alert(lines);
                for (var i = 0; i < lines.length; i++) {
                    console.log('text is', lines[i]);
                    var text = lines[i].split(',');
                    data.push({"Neighbourhood": text[0], "Average_price": text[1]})
                }
            }
        }
    }
    rawFile.send(null);

    // var arrObj = [{ "firstName": "John", "lastName": "Doe", "age": "46" },
    // { "firstName": "James", "lastName": "Blanc", "age": "24" }]
    var objLength = data.length;
    var myvar = '<table>' +
        '<tr>' +
        '<th>Neighbourhood</th>' +
        '<th>Average_price</th>' +
        '</tr>';

    for (var i = 0; i < objLength; i++) {
        myvar += '<tr>' +
            '<td>' + data[i].Neighbourhood + '</td>' +
            '<td>' + data[i].Average_price + '</td>' +
            '</tr>'
    }

    myvar += '</table>';

    console.log(myvar);
    document.getElementById('nhavgprice').innerHTML = myvar;

});