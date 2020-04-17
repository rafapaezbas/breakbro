const express = require("express");
const app = express();
const file = require('./file');
const streamer = require('./streamer');
const login = require('./login');

app.use(express.json())
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	  next();
});

app.get('/ping',(req, res) => {
	  res.sendStatus(200);
});
app.post('/file',file.create);
app.get('/file',file.list);
app.post('/login',login.login);
app.post('/streamer',streamer.create);
app.get('/streamer/init',streamer.init);
app.post('/streamer/search',streamer.search);

app.listen(38081, () => {
	  console.log("Server started in port 38081");
});
