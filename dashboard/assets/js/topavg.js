$(function () {
    /* customJS
     * -------
     * Data and config for customValues
     */
    'use strict';
    const filenhavgprice = './resources/pyspark/number-of-rentals/number-of-rentals.csv'; 

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
                    data.push({"neighbourhood": text[0], "number_of_rentals": text[1]})
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
        '<th scope="col">Neighbourhood</th>' +
        '<th scope="col">Number of rentals</th>' +
        '</tr>';

    for (var i = 0; i < objLength; i++) {
        myvar += '<tr scope="row">' +
            '<td>' + data[i].neighbourhood + '</td>' +
            '<td>' + data[i].number_of_rentals + '</td>' +
            '</tr>'
    }

    myvar += '</table>';

    console.log(myvar);
    document.getElementById('topavg').innerHTML = myvar;

});