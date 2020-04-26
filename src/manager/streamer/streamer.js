const streamerManager = require('./streamer-manager');
const config = require('../config/config');
const jwt = require('../jwt/jwt');

exports.create = async (req, res) => {
    const streamer = reqToStreamer(req);
    if(!isValid(streamer) || await streamerManager.findByName(streamer.name) != undefined){ //If there are missing fields or streamer already exists.
        res.sendStatus(400);
    }else{
        streamerManager.create(streamer).then(successfullRequest(res),failedRequest(res));
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
        var filteredResult = result.map(e => ({name: e.name, info: e.info}) ); //Remove password and ids for response
        res.send(filteredResult);
    }
};

const reqToStreamer = (req) => {
    return {
        name: req.body.name,
        info: req.body.info,
        password: req.body.password
    };
};


const isValid = (streamer) => {
    return streamer.name != undefined && streamer.name.length > 0 && streamer.password != undefined && streamer.password.length > 0;
};

const successfullRequest = (res) => {
    return (result) => {
        console.log(result);
        res.sendStatus(200);
    };
};

const failedRequest = (res) => {
    return (result) => {
        console.log(result);
        res.sendStatus(503);
    };
};
