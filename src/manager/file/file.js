const fileManager = require('./file-manager');
const formidable = require('formidable');
const config = require('../config/config');
const jwt = require('../jwt/jwt');

exports.create = function(req, res){
    const streamerName = jwt.validAuth(req);
    if(streamerName == undefined){
        res.sendStatus(403);
    }else{
        var form = new formidable.IncomingForm();
        form.parse(req, fileManager.moveFile(streamerName));
        res.sendStatus(204);
    }
};

exports.list = function(req,res){
    const streamerName = jwt.validAuth(req);
    if(streamerName == undefined){
        res.sendStatus(403);
    }else{
        fileManager.readFiles(streamerName).then(files => res.send(files));
    }
}

