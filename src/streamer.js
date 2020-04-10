const streamerManager = require('./streamer-manager');
const fileManager = require('./file-manager');
const config = require('./config');

exports.create = async (req, res) => {

    const streamer = reqToStreamer(req);

    if(!isValid(streamer) || await streamerManager.find({name: streamer.name}) != undefined){ //If there are missing fields or streamer already exists.
        res.sendStatus(202);
    }else{
        var result = await streamerManager.create(streamer);
        createStreamerFolder(streamer.name);
        res.send(result);
    }
};

exports.init = (req, res) => {
    const streamer = reqToStreamer(req);
    streamerManager.init(streamer.name);
    res.sendStatus(200);
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

