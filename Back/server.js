const express = require("express");

const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("common"));
//accept only post request from react
app.use(cors({
    //origin: ["http://localhost:3000"],
    methods: ["POST"],
}));

//app.use(compression());
//helmet

app.post("/getMessages", (req, res) => {
    console.log(req.body);
    var messages = [];
    res.json({
        "response" : "this resource"
    });
});

const port = 8000;
app.listen(port, () => {
    console.log("Listening to requests on http://localhost:" + port);
  });
  