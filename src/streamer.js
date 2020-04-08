const streamerManager = require('./streamer-manager');
const fileManager = require('./file-manager');
const config = require('./config');

exports.create = async (req, res) => {
    const streamer = reqToStreamer(req);
    var persistedStreamer = await streamerManager.find({name: streamer.name});
    if(persistedStreamer == undefined){
        createStreamerFolder(streamer.name);
        var result = await streamerManager.create(streamer);
        res.send(result);
    }else{
        res.sendStatus(202);
    }
};

const reqToStreamer = (req) => {
    return {
        name: req.body.name,
        info: req.body.info
    };
};

const createStreamerFolder = (streamerName) => {
    fileManager.createStreamerFolder(streamerName);
};

