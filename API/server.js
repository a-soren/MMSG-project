const fetch = require('node-fetch');
const cors = require('cors');
const convert = require('xml-js')
const express = require('express');
const server = express();

server.use(cors());
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
            if (baseCurrency !== "EUR" && targetCurrency !== "EUR") {
                let baseCurrencyRate = data.filter(money => money._attributes.currency === baseCurrency)[0]._attributes.rate
                let targetCurrencyRate = data.filter(money => money._attributes.currency === targetCurrency)[0]._attributes.rate
                let finalAmount = (targetCurrencyRate / baseCurrencyRate * parseInt(amount))
                return ({ finalAmount, targetCurrency });
            } else if (baseCurrency === "EUR" && targetCurrency !== "EUR") {
                let targetCurrencyRate = data.filter(money => money._attributes.currency === targetCurrency)[0]._attributes.rate
                let finalAmount = (targetCurrencyRate * parseInt(amount))
                return ({ finalAmount, targetCurrency })
            } else if (baseCurrency !== "EUR" && targetCurrency === "EUR") {
                let baseCurrencyRate = data.filter(money => money._attributes.currency === baseCurrency)[0]._attributes.rate
                let finalAmount = (1 / baseCurrencyRate * parseInt(amount))
                return ({ finalAmount, targetCurrency })
            } else if (baseCurrency === "EUR" && targetCurrency === "EUR") {
                let finalAmount = parseInt(amount)
                return ({ finalAmount, targetCurrency })
            }

        })
    const json = await fetch_response;
    res.json(json);
})
module.exports = server;