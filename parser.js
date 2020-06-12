const IGCparser = require('igc-parser');
const fs = require('fs');
const Chart = require('chart.js');

const extractFlightData = async (path) => {
    const rawFlight = await fs.readFileSync(path, 'utf8');
    const flightData = await IGCparser.parse(rawFlight);

    return flightData;
};

const timeParser = time => {
    return {
        hour: parseInt(time.match(/^\d\d/)),
        minute: parseInt(time.match(/(?<!^)\d\d(?<!$)/)),
        second: parseInt(time.match(/\d\d$/))
    }

}

const getFlightDuration = async (flight) => {
    const flightData = extractFlightData(flight);
    const logFixes = await (await flightData).fixes;
    const liftFix = logFixes.find(fix => fix.pressureAltitude >= 20);
    const liftTime = timeParser(liftFix.time);

    const possibleLandTimes = logFixes.find(fix => liftTime.second <= timeParser(fix.time).second)

    //return liftFix.time;
    //return possibleLandTimes.time;
    return `${liftFix.time} ${possibleLandTimes.time}`
}


const getFlightTask = async (flight) => {
    // Return flight task
}

const createChart = (element) => {
    let graph = new Chart(element, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: 'Height',
                data: [50, 100, 200, 300, 300]
            }]
        },
        options: {},

    })
}

module.exports.getFlight = extractFlightData;
module.exports.createChart = createChart;
module.exports.flightDuration = getFlightDuration;