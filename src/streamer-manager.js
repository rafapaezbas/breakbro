var mongoClient = require('mongodb').MongoClient;
var config = require('./config');

exports.create = (streamer) => {
    return dbConnection().then(insert(streamer));
};

exports.find = (query) => {
    return dbConnection().then(get(query));
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
