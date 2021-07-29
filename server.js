// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;

const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
}

// GET route
app.get("/all", sendData);

function sendData(request, response) {
    response.send(projectData);
}

// POST route
app.post("/add", callBack);

function callBack(req, res) {
    res.send("POST received");
}

// Post an entry
const data = [];

app.get("/allEntries", getData);

function getData(req, res) {
    res.send(data);
    console.log(data);
}

app.post("/addEntry", addEntry);

function addEntry(req, res) {
    newEntry = {
        city: req.body.city,
        temp: req.body.temp,
        icon: req.body.icon,
        date: req.body.date,
        feeling: req.body.feelings,
    };
    data.push(newEntry);
    // console.log(data);
}
