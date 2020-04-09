var mongoClient = require('mongodb').MongoClient;
var config = require('./config');
const spawn = require('child_process');

exports.create = (streamer) => {
    return dbConnection().then(insert(streamer));
};

exports.find = (query) => {
    return dbConnection().then(get(query));
};

exports.init = (streamerName) => {
    const path = config.get("streamers.path") + streamerName + "/ezconfig.xml";
    var subprocess = spawn("ezstream", ["-c", path]);
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
