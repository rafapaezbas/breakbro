const streamerManager = require('./streamer-manager');
const fileManager = require('./file-manager');
const config = require('./config');
const jwt = require('./jwt');

exports.create = async (req, res) => {
    const streamer = reqToStreamer(req);
    if(!isValid(streamer) || await streamerManager.findByName(streamer.name) != undefined){ //If there are missing fields or streamer already exists.
        res.sendStatus(202);
    }else{
        var result = await streamerManager.create(streamer);
        createStreamerFolder(streamer.name);
        res.send(result);
    }
};

exports.init = (req, res) => {
    const streamerName = jwt.validAuth(req);
    if(streamerName == undefined){
        res.sendStatus(403);
    }else{
        streamerManager.init(streamerName);
        res.sendStatus(200);
    }
};

exports.search = async (req, res) => {
    const searchKey = req.body.searchKey;
    if(searchKey == undefined){
        res.sendStatus(404);
    }else{
        var result = await streamerManager.findBySearchKey(searchKey);
        res.sendStatus(result);
    }
};

const reqToStreamer = (req) => {
    return {
        name: req.body.name,
        info: req.body.info,
        password: req.body.password
    };
};

const createStreamerFolder = (streamerName) => {
    fileManager.createStreamerFolder(streamerName);
};

const isValid = (streamer) => {
    return streamer.name != undefined && streamer.password != undefined;
};

