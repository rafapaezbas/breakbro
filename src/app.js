const express = require("express");
const app = express();
const file = require('./file');
const streamer = require('./streamer');

app.use(express.json())
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});

app.get('/ping',(req, res) => {
	  res.sendStatus(200);
});
app.post('/file',file.create);
app.post('/streamer',streamer.create);
app.post('/streamer/init',streamer.init);

app.listen(80, () => {
	  console.log("Server started in port 80");
});
