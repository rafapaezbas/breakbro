const streamerManager = require('./streamer-manager');
const fileManager = require('./file-manager');
const config = require('./config');
var crypto = require('crypto');

exports.create = async (req, res) => {

    const streamer = await reqToStreamer(req);
    console.log(streamer);

    if(!isValid(streamer) || await streamerManager.find({name: streamer.name}) != undefined ){ //If there are missing fields or streamer already exists.
        res.sendStatus(202);
    }else{
        createStreamerFolder(streamer.name);
        var result = await streamerManager.create(streamer);
        res.send(result);
    }

};

exports.init = (req, res) => {
    const streamer = reqToStreamer(req);
    streamerManager.init(streamer.name);
};

const reqToStreamer = async (req) => {
    return {
        name: req.body.name,
        info: req.body.info,
        password: await getSHA256(req.body.password)
    };
};

const createStreamerFolder = (streamerName) => {
    fileManager.createStreamerFolder(streamerName);
};

const isValid = (streamer) => {
    return streamer.name != undefined && streamer.password != undefined;
};

var getSHA256 = function(input){
    return new Promise( (resolve,reject) => {
        const secret = config.get("encrytion.salt");
        for(var i = 0; i < 100; i++){
            input = crypto.createHmac('sha256', secret).update(input).digest('hex');
        }
        resolve(input);
    });
};
