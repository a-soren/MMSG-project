const fetch = require('node-fetch');
const convert = require('xml-js')

fetch('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')
    .then(function (resp) {
        console.log(resp)
        return resp.text();
    })
    .then(function (xml) {
        var result1 = convert.xml2json(xml, { compact: true, spaces: 4 });
        // console.log(result1);
        let test = JSON.parse(result1)
        console.log(test['gesmes:Envelope']['Cube']['Cube']['Cube'])
    })







// module.exports = server;