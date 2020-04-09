var encryption = require('./encryption');
var config = require('./config');
var streamerManager = require('./streamer-manager');
const jwt  = require('jsonwebtoken');

exports.login = async (req, res) => {
    const streamer = reqToStreamer(req);
    if(!isValid(streamer) || await streamerManager.find(streamer) != undefined){
        const token = generateToken(streamer.name);
        res.send({token: token});
    }else{
        res.sendStatus(403);
    }
};

const reqToStreamer = (req) => {
    return {
        name: req.body.name,
        password: encryption.getSHA256(req.body.password)
    };
};

const isValid = (streamer) => {
    return streamer.name != undefined && streamer.password != undefined;
};

const generateToken = (streamerName) => {
    const signSecret = config.get('jwt.sign.secret');
    const token = jwt.sign({sub: streamer.name}, signSecret, { expiresIn: 60 * 60 });
    return token;
}
