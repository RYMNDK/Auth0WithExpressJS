const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(morgan("common"));
app.use(cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(compression());

app.get("/", (req, res) => {
    res.json({
        "response" : "this resource"
    });
});

app.listen(8080, () => {
    console.log(`Listening to requests on http://localhost:8080`);
  });
  