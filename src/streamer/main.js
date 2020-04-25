const express = require("express");
const app = express();
const streamer = require('./streamer.js');

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/streamer',streamer.create);

app.listen(38082, () => {
    console.log("Server started in port 38082");
});
