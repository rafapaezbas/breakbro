var mongoClient = require('mongodb').MongoClient;
var config = require('./config');
var encrytion = require('./encryption');
const { spawn } = require('child_process');

exports.create = async (streamer) => {
    return dbConnection().then(insert({name: streamer.name, password: encrytion.getSHA256(streamer.password), info: streamer.info}));
};

exports.find = (query) => {
    return dbConnection().then(get(query));
};

exports.init = (streamerName) => {
    const path = config.get("streamers.path") + streamerName + "/ezconfig.xml";
    var subprocess = spawn("ezstream",["-c", path]);
    console.log("PID:" + subprocess.pid);
};

const get = (query) => {
    return (client) => {
        var db = client.db('breakbro');
        return db.collection("streamers").findOne(query);
    };
};

const insert = (streamer) => {
    return (client) => {
        var db = client.db('breakbro');
        return db.collection("streamers").insertOne(streamer);
    };
};

const dbConnection = () => {
    return mongoClient.connect(config.get('url.database'));
};
