/** Requriement 
 * User Alex should have access (able to see) all 3 resources upon authentication.
 * User Bob should have access (able to see) only resource 2
 * User Matt should have access (able to see) resource 1 and 3 only.
 */
//permissions: a dictionary with name to resource mapping
const rights = {
    ["Alex"]: [0, 1, 2],
    ["Bob"]: [1],
    ["Matt"]: [0, 2]
}

//resources available
const resources = [
    "Message 1: visible to Alex and Matt",
    "Message 2: visible to Alex and Bob",
    "Message 3: visible to Alex and Matt"
];

require('dotenv').config();
const express = require("express");
const http = require('http');
const morgan = require("morgan");

var cors = require('cors');

const app = express();
app.use(morgan("common"));

const appUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

//parse body and url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    //origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
    //allowedHeaders: ["Content-Type", "Authorization"]
})) ;

//app.use(compression());
//helmet

const { auth } = require('express-openid-connect');

app.use(auth({
    auth0Logout: true,
    baseURL: appUrl
}));

app.post("/getMessages", (req, res) => {
    console.log(req.body);
    var messages = [];
    res.json({
        "messages" : []
    });
});


http.createServer(app).listen(process.env.PORT, () => {
    console.log(`listening on ${appUrl}`);
});