const request = require('request');
const airtable = require("airtable");

var base = new airtable({ apiKey: 'my_key' }).base('appOHRt0PIDokpuV2');
var counter = 0;

function BtcToUsd() { 
    request('https://blockchain.info/ticker', (error, response, body) => {
        if (error) {
        	console.error(error)
            return error
        }
        const data = JSON.parse(body);
        console.log(data.USD.last);
        var today = new Date().toLocaleString();

        
        base('BTC_table').create([
            {
                "fields": {
                    "id": `${counter++}`,
                    "time": `${today}`,
                    "rate": `${data.USD.last}`
                }
            }
        ], function (err) {
            if (err) {
                console.error(err);
                return err;
            }
        });
    });
}

BtcToUsd();
setInterval(BtcToUsd, 60000)