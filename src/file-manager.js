var formidable = require('formidable');
var fs = require('fs');
var config = require('./config');
var move = require('mv');

exports.create = (req) => {
    var form = new formidable.IncomingForm();
    form.parse(req, renameFile);
};

const renameFile = (err, fields, files) => {
    var fileName = files.filetoupload.name;
    var oldPath = files.filetoupload.path;
    var newPath = config.get("file.upload.path") + fileName;
    move(oldPath, newPath, log("Successfull upload: " + fileName));
};

exports.createStreamerFolder = (streamerName) => {
    const path = config.get("streamers.path") + streamerName;
    fs.mkdir(path, createConfig(streamerName));
};

const createConfig = (streamerName) => {
    return (err) => {
        fs.readFile(__dirname +  "/../resources/ezstream-template.xml", (err, template) => {
            templateToConfigFile(template,streamerName);
        });
    };
};

const templateToConfigFile = (template, streamerName) => {
    var file = template.toString().split("\n");
    var configFile = file.map(setMountpoint(streamerName)).join("\n");
    const path = config.get("streamers.path") + streamerName + "/ezconfig.xml";
    fs.writeFile(path,configFile,log("Created " + streamerName + " configuration."));
};

const setMountpoint = (streamerName) => {
    return (e) => {
        const master = config.get("master.broadcast.url");
        return e.replace("<url></url>","<url>" + master + streamerName + "</url>");
    };
}

const setCredentials = (e) => {
    const password = config.get("master.broadcast.password");
    return e.replace("<sourcepassword></sourcepassword>","<sourcepassword>" + password + "</sourcepassword>");
}

var log = (msg) => {
    return  (err) => {
        if (err) {
            throw err;
        }else{
            console.log(Date.now() + ": " + msg);
        }
    };
};
