const express = require("express");

//const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(morgan("common"));
/* app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
})); */

//app.use(compression());
//helmet

app.post("/getMessages", (req, res) => {
    console.log(req.body);
    res.json({
        "response" : "this resource"
    });
});

const port = 8000;
app.listen(port, () => {
    console.log("Listening to requests on http://localhost:" + port);
  });
  