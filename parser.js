const IGCparser = require('igc-parser');
const fs = require('fs');
const Chart = require('chart.js');

const extractFlightData = async (path) => {
    const rawFlight = fs.readFileSync(path, 'utf8');
    const flightData = IGCparser.parse(rawFlight);

    return flightData;
};

const timeParser = time => {
    return {
        hour: parseInt(time.match(/^\d\d/)),
        minute: parseInt(time.match(/(?<!^)\d\d(?<!$)/)),
        second: parseInt(time.match(/\d\d$/))
    }
}

const dateParser = time => {
    return {
        year: parseInt(time.match(/^\d{4}/)),
        month: parseInt(time.match(/(?<!^)(?<!\d)\d\d(?<!$)/)),
        day: parseInt(time.match(/\d\d$/))
    }
}

function convertMS(milliseconds) {
    let hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    hour = hour % 24;
    return {
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}

const getLogStartTime = async (flight) => {
    const flightData = await extractFlightData(flight);
    const firstFix = timeParser(flightData.fixes[0].time);
    const fd = dateParser(flightData.date);

    return new Date(fd.year, fd.month, fd.day, firstFix.hour + 2, firstFix.minute, firstFix.second);
}

const getLogFinalTime = async (flight) => {
    const flightData = await extractFlightData(flight);
    const lastFix = timeParser(flightData.fixes[flightData.fixes.length - 1].time);
    const fd = dateParser(flightData.date);

    return new Date(fd.year, fd.month, fd.day, lastFix.hour + 2, lastFix.minute, lastFix.second);
}

const getLogDuration = async (flight) => {
    const lastTimestamp = await getLogFinalTime(flight);
    const firstTimestamp = await getLogStartTime(flight);
    const logTimeDuration = new Date(lastTimestamp.getTime() - firstTimestamp.getTime());

    return convertMS(logTimeDuration);
}

const getFlightDuration = async (flight) => {
    /*

    Check for gps movement and consistant height movement

    Create function for starttime

    create function for laningtime
    
    */
    const flightData = extractFlightData(flight);
    const logFixes = (await flightData).fixes;
    const liftFix = logFixes.find(fix => fix.gpsAltitude >= 50);
    const liftTime = timeParser(liftFix.time);

    const possibleLandTimes = logFixes.find(fix => liftTime.minute < timeParser(fix.time).minute)

    return `lift: ${liftFix.time} ${liftFix.gpsAltitude}m airborn ${possibleLandTimes.time} ${possibleLandTimes.gpsAltitude}m`
}


const getFlightTask = async (flight) => {
    const flightData = extractFlightData(flight);
    return (await flightData).task
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
module.exports.logDuration = getLogDuration;
module.exports.getTask = getFlightTask;