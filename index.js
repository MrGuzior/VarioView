const express = require('express');
const IGCparser = require('igc-parser');

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to VarioView');
})

app.listen(3000, () => console.log('VarioView listening on port 3000!'))