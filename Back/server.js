/** Requriement 
 * User Alex should have access (able to see) all 3 resources upon authentication.
 * User Bob should have access (able to see) only resource 2
 * User Matt should have access (able to see) resource 1 and 3 only.
 */
//permissions are set by roles in on Auth0 dashboard Role-Based Access Control (RBAC)
//resources available, assume each resource is mapped to a role
const resources = {
    "m1" : "Message 1: visible to Alex and Matt",
    "m2" : "Message 2: visible to Alex and Bob",
    "m3" : "Message 3: visible to Alex and Matt"
};

require('dotenv').config();
const express = require("express");
const http = require('http');
const morgan = require("morgan");

const cors = require('cors');

const jwt = require('express-jwt');

const app = express();
app.use(morgan("common"));

const appUrl = `http://localhost:${process.env.PORT}`;

//parse body and url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//using cors because request is from 3000
app.use(cors({
    //origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
    //allowedHeaders: ["Content-Type", "Authorization"]
})) ;

//app.use(compression());
//helmet

//check the req body first
//app.post("/getMessages", jwt({ secret: process.env.secret, algorithms: ['RS256'] }),
app.post("/getMessages",
(req, res) => {
    //if (req.user === []) return res.sendStatus(401);
    console.log(req.body);
    var rights = [];    //something from req body
    var messages = (rights.map(
        (x) => {
            return resources[x];
        }
    ));

    //return response to sender
    res.status = 200;
    res.json({
        "messages" : messages
    });
});

app.post("/callback", (req, res) => {
    console.log(res.body);
});

app.post("/logout", (req, res) => {
    console.log(res.body);
});


http.createServer(app).listen(process.env.PORT, () => {
    console.log(`listening on ${appUrl}`);
});