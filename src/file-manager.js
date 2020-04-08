var formidable = require('formidable');
var fs = require('fs');
var config = require('./config');
var move = require('mv');

exports.create = (req) => {
    var form = new formidable.IncomingForm();
    form.parse(req, renameFile);
};

exports.createStreamerFolder = (streamerName) => {
    const path = config.get("streamers.path") + streamerName;
    fs.mkdir(path, createConfig(streamerName));
};

const renameFile = (err, fields, files) => {
    var fileName = files.filetoupload.name;
    var oldPath = files.filetoupload.path;
    var newPath = config.get("file.upload.path") + fileName;
    move(oldPath, newPath, log("Successfull upload: " + fileName));
};


const createConfig = (streamerName) => {
    return (err) => {
        if (err) throw err;
        createEzConfig(streamerName);
        createMusicFolder(streamerName);
        createSelector(streamerName);
        createPlaylist(streamerName);
    };
};

const createEzConfig = (streamerName) => {
    fs.readFile(__dirname +  "/../resources/ezstream-template.xml", (err, template) => {
        const path = config.get("streamers.path") + streamerName + "/ezconfig.xml";
        var ezConfig = template.toString().split("\n").map(setMountpoint(streamerName)).join("\n");
        fs.writeFile(path, ezConfig, log("Created " + streamerName + " ez configuration."));
    });
};

const createMusicFolder = (streamerName) => {
    const path = config.get("streamers.path") + streamerName;
    fs.mkdir(path + "/music", log("Created music folder for" + streamerName));
};

const createSelector = (streamerName) => {
    fs.readFile(__dirname +  "/../resources/selector-template.sh", (err, template) => {
        const path = config.get("streamers.path") + streamerName + "/selector.sh";
        var selector = template.toString();
        fs.writeFile(path, selector, log("Created " + streamerName + " selector."));
    });
};

const createPlaylist = (streamerName) => {
    const path = config.get("streamers.path") + streamerName + "/playlist";
    fs.open(path, "a", log("Created " + streamerName + " playlist."));
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
