const IGCparser = require('igc-parser');
const fs = require('fs');

const extractFlightData = async (path) => {
    const rawFlight = await fs.readFileSync(path, 'utf8');
    const flightData = await IGCparser.parse(rawFlight);

    return flightData;
};

const getFlightDuration = async (flight) => {
    // Return flight duration
}

const getFlightTask = async (flight) => {
    // Return flight task
}

module.exports.getFlight = extractFlightData;