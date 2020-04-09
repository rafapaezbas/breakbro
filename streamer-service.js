var mongoClient = require('mongodb').MongoClient;
var config = require('./config');

exports.create = (streamer) => {
    dbConnection(insert,streamer);
};

const insert = (db,obj) => {
    db.collection("streamers").insertOne(obj, function(err, res) {
        if (err) throw err;
        console.log("Inserted: " + obj);
    });
};

const dbConnection = (callback, obj) => {
    mongoClient.connect(config.get('url.database'), function(err, db) {
        if (err) throw err;
        const db = db.db(config.get('database.name'));
        callback(db, obj);
    });
};
