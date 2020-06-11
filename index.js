const express = require('express');
const parser = require('./parser.js');

const app = express();

const flights = [
    'IGC/86ULNQR2_rst.igc',
    'IGC/87NLNQR1_rst.igc',
    'IGC/892LNQR1_rst.igc',
    'IGC/05LLN5S1_rst.igc',
    'IGC/06AV2MF1_rst.igc'
]

app.get('/', (req, res) => {
    const flight = parser.getFlight(flights[4]);
    res.json(flight);
})

app.listen(3000, () => console.log('VarioView listening on port 3000!'));