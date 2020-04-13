const fileManager = require('./file-manager');
const formidable = require('formidable');
const jwt  = require('jsonwebtoken');
const config = require('./config');

exports.create = function(req, res){
    const streamerName = validAuth(req);
    console.log(streamerName);
    if(streamerName == undefined){
        res.sendStatus(403);
    }else{
        var form = new formidable.IncomingForm();
        form.parse(req, fileManager.moveFile(streamerName));
        res.sendStatus(204);
    }
};

exports.list = function(req,res){
    const streamerName = validAuth(req);
    console.log(streamerName);
    if(streamerName == undefined){
        res.sendStatus(403);
    }else{
        fileManager.readFiles(streamerName).then(files => res.send(files));
    }
}

const validAuth = (req) => {
    if(req.headers == undefined || req.headers.authorization == undefined || req.headers.authorization.split(" ")[1] == undefined){
        return undefined;
    }else{
        const token = req.headers.authorization.split(" ")[1];
        const secret = config.get('jwt.sign.secret');
        return jwt.verify(token,secret).sub;
    }
};
