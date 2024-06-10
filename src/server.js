// server.js
const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const fs = require('fs')
const router = require('./routes');
var path = require('path');

const app = express();
const port = 3001;

// app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router(app)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;