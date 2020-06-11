const IGCparser = require('igc-parser');
const fs = require('fs');

const extractFlightData = async (path) => {
    const rawFlight = await fs.readFileSync(path, 'utf8');
    const flightData = await IGCparser.parse(rawFlight);

    return flightData;
}

module.exports.getFlight = extractFlightData;