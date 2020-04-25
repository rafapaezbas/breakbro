const { spawn } = require('child_process');
var config = require('./config');
var move = require('mv');
const { promisify } = require('util');
var fs = require('fs');

exports.moveFile = (streamerName) => {
    return (err, fields, files) => {
        var fileName = files.filetoupload.name;
        var oldPath = files.filetoupload.path;
        var newPath = config.get("file.upload.path") + streamerName + "/music/" + fileName;
        move(oldPath, newPath, log("Successfull upload: " + fileName));
    };
};

exports.readFiles = (streamerName) => {
    const path = config.get("streamers.path") + streamerName + "/music";
    const readdir = promisify(fs.readdir);
    return readdir(path);
};


