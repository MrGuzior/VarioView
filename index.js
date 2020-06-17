const express = require('express');
const parser = require('./parser.js');

const app = express();


const flights = [
    'IGC/86ULNQR2_rst.igc',
    'IGC/87NLNQR1_rst.igc',
    'IGC/892LNQR1_rst.igc',
    'IGC/05LLN5S1_rst.igc',
    'IGC/06AV2MF1_rst.igc',
    'IGC/0AMLNQR1.IGC'
]

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            res.send("error")
        }
    }
}



app.get('/:id', asyncHandler(async (req, res) => {
    const flight = await parser.getFlight(flights[req.params.id]);
    res.json(flight);
}));

app.get('/', asyncHandler(async (req, res) => {
    res.sendFile('./public/index.html');
}));

app.get('/duration', asyncHandler(async (req, res) => {
    const flightDuration = await parser.flightDuration(flights[4]);
    res.json(flightDuration);
}));

app.get('/log-duration/:id', asyncHandler(async (req, res) => {
    const logDuration = await parser.logDuration(flights[req.params.id]);
    res.json(logDuration);
}));

app.get('/task/:id', asyncHandler(async (req, res) => {
    const flightTask = await parser.getTask(flights[req.params.id]);
    res.json(flightTask);
}));

app.get('/chart', asyncHandler(async (req, res) => {
    res.sendfile('index.html');
}));


app.listen(3000, () => console.log('VarioView listening on port 3000!'));