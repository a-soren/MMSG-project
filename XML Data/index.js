const fetch = require('node-fetch');

//this code can pull the xml code from an xml file and turn it into a JSON object

// var fs = require('fs');
// var xml2js =  require('xml2js');
// var parser = new xml2js.Parser();

// fs.readFile('note.xml', function(err,data) {
//     parser.parseString(data,function(err,result){
//         console.log(result)
//     })
// })

// data = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"

// data = `<note>
// <date>2015-09-01</date>
// <hour>08:30</hour>
// <to>Tove</to>
// <from>Jani</from>
// <body>Don't forget me this weekend!</body>
// </note>`

//this code turns a string of XML into a JSON object

var xml2js = require('xml2js');


// xml = xml.parseFromString(xmlhttp.responseText, 'text/xml');
// var result = xmlToJson(xml);

var DOMParser = require('xmldom').DOMParser;
// var doc = new DOMParser().parseFromString(
//     '<xml xmlns="a" xmlns:c="./lite">\n'+
//         '\t<child>test</child>\n'+
//         '\t<child></child>\n'+
//         '\t<child/>\n'+
//     '</xml>'
//     ,'text/xml');
// doc.documentElement.setAttribute('x','y');
// doc.documentElement.setAttributeNS('./lite','c:x','y2');
// var nsAttr = doc.documentElement.getAttributeNS('./lite','x')
// console.info(nsAttr)
// console.info(doc)

fetch('#').then(function (resp) {
    return resp.text();
})
    .then(function (converter) {
        var xml = new DOMParser().parseFromString(converter, 'text/xml');
        return (xml.getElementsByTagName('Cube')[0]);
    })
    .then(function (data) {
        // console.log(typeof(data))
        xml2js.parseStringPromise(data).then(function (result) {
            console.dir(result)
            // console.dir(result.Currency);
            console.log('Done');
        })
            .catch(function (err) {

            });
    })
    .catch((err) => {
        console.log(err)
    });
