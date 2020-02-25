// const fetch = require('node-fetch');
// const convert = require('xml-js')
// const express = require('express');
// const server = express();
// server.use(express.json());


// let baseCurrency = "USD"
// let targetCurrency = "JPY"
// let amount = 3
// fetch('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')
//     .then(function (response) {
//         // console.log(resp)
//         return response.text();
//     })
//     .then(function (xml) {
//         var converted = convert.xml2json(xml, { compact: true, spaces: 4 });
//         let parced = JSON.parse(converted)
//         let data = parced['gesmes:Envelope'].Cube.Cube.Cube
//         let baseCurrencyRate = data.filter(money => money._attributes.currency === baseCurrency)[0]._attributes.rate
//         let targetCurrencyRate = data.filter(money => money._attributes.currency === targetCurrency)[0]._attributes.rate
//         let finalAmount = (targetCurrencyRate / baseCurrencyRate * amount)
//         console.log(finalAmount)
//     })

// server.get('/conversion', async (req, res) => {
//     const api_url = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
//     const fetch_response = await fetch(api_url);
//     const json = await fetch_response.json();
//     response.json(json);
// })



// module.exports = server;


const fetch = require('node-fetch');
const convert = require('xml-js')
const express = require('express');
const server = express();
server.use(express.json());
server.get('/conversion/:base_currency/:target_currency/:amount', async (req, res) => {
    let baseCurrency = req.params.base_currency
    let targetCurrency = req.params.target_currency
    let amount = req.params.amount
    const api_url = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
    const fetch_response = await fetch(api_url)
        .then(function (response) {
            // console.log(resp)
            return response.text();
        })
        .then(function (xml) {
            console.log(baseCurrency)
            var converted = convert.xml2json(xml, { compact: true, spaces: 4 });
            let parced = JSON.parse(converted)
            let data = parced['gesmes:Envelope'].Cube.Cube.Cube
            let baseCurrencyRate = data.filter(money => money._attributes.currency === baseCurrency)[0]._attributes.rate
            let targetCurrencyRate = data.filter(money => money._attributes.currency === targetCurrency)[0]._attributes.rate
            let finalAmount = (targetCurrencyRate / baseCurrencyRate * amount)
            console.log(finalAmount)
            return (finalAmount);
        })
    const json = await fetch_response;
    res.json(json);
})
module.exports = server;