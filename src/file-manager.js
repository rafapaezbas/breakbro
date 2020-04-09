var formidable = require('formidable');
const { spawn } = require('child_process');
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
        var ezConfig = template.toString().split("\n").map(setMountpoint(streamerName)).map(setCredentials).map(setSelector(streamerName)).join("\n");
        fs.writeFile(path, ezConfig, log("Created " + streamerName + " ez configuration."));
    });
};

const createMusicFolder = (streamerName) => {
    const path = config.get("streamers.path") + streamerName;
    fs.mkdir(path + "/music", log("Created music folder for " + streamerName));
};

const createSelector = (streamerName) => {
    fs.readFile(__dirname +  "/../resources/selector-template.sh", (err, template) => {
        const path = config.get("streamers.path") + streamerName + "/selector.sh";
        var selector = template.toString().split("\n").map(setPath(streamerName)).join("\n");
        fs.writeFile(path, selector, giveExcutablePermissions(streamerName));
    });
};

const setPath = (streamerName) => {
    return (e) => {
        const streamerFolder = config.get("streamers.path") + streamerName;
        const playlistPath = streamerFolder + "/playlist";
        const musicPath = streamerFolder + "/music/*";
        const infoPath = streamerFolder + "/info.json";
        return e.replace("#playlistpath#", playlistPath).replace("#musicpath#",musicPath).replace("#infopath#",infoPath);
    };
}

const giveExcutablePermissions = (streamerName) => {
    return (err) => {
        if (err) throw err;
        const path = config.get("streamers.path") + streamerName + "/selector.sh";
        spawn("chmod", ["+x", path]);
    };
}

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

const setSelector = (streamerName) => {
    return (e) => {
        const selectorPath = config.get("streamers.path") + streamerName + "/selector.sh";
        return e.replace("<filename></filename>","<filename>" + selectorPath + "</filename>");
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
