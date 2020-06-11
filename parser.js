const IGCparser = require('igc-parser');
const fs = require('fs');

function extractFlightData(path) {
    const rawFlight = fs.readFileSync(path, 'utf8');
    const flightData = IGCparser.parse(rawFlight);

    return flightData;
}

module.exports.getFlight = extractFlightData;