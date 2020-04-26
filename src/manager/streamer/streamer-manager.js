const mongoClient = require('mongodb').MongoClient;
const config = require('../config/config');
const encrytion = require('../encryption/encryption');
const { spawn } = require('child_process');
const axios = require('axios');


exports.create = async (streamer) => {
    const nodes = await dbConnection().then(getNodesByClients()).then(cursor => cursor.toArray());
    const streamerNode = sortByClients(nodes)[0];
    increaseNodeClients(streamerNode);
    const updatedStreamer = {name: streamer.name, node:streamerNode.url, password: encrytion.getSHA256(streamer.password), info: streamer.info};
    persistStreamer(updatedStreamer);
    return axios.get(streamerNode.url + '/streamer?name=' + streamer.name);
};

exports.findByName = (name) => {
    return dbConnection().then(getOne({name: name}));
};

exports.findByNameAndPassword = (name,password) => {
    return dbConnection().then(getOne({name: name,password : password}));
};

exports.findBySearchKey = (searchKey) => {
    const regex = { $regex : new RegExp('.*' + searchKey + '.*')}; // This is equals to SQL LIKE '%_%'
    const query = { $or: [{name: regex},{info: regex}]};
    return dbConnection().then(get(query)).then(cursor => cursor.toArray());
};

exports.init = (streamerName) => {
    const path = config.get("streamers.path") + streamerName + "/ezconfig.xml";
    var subprocess = spawn("ezstream",["-c", path]);
    console.log("PID:" + subprocess.pid);
};

const getNodesByClients = () => {
    return (client) => {
        var db = client.db('breakbro');
        return db.collection("streamerNodes").find();
    };
};

const increaseNodeClients = (node) => {
    return dbConnection().then(update("streamerNodes",{url: node.url},{clients: node.clients + 1}));
};

const persistStreamer = (streamer) => {
    return dbConnection().then(insert(streamer));
}

const update = (collection,query,newValues) => {
    return (client) => {
        var db = client.db('breakbro');
        db.collection(collection).updateOne(query,{$set: newValues}).then((result) => console.log(result));
    };
};

const getOne = (query) => {
    return (client) => {
        var db = client.db('breakbro');
        return db.collection("streamers").findOne(query);
    };
};

const get = (query) => {
    return (client) => {
        var db = client.db('breakbro');
        return db.collection("streamers").find(query);
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


const sortByClients = (nodes) => {
    return nodes.sort((a,b) => a.clients - b.clients); //Sort in ascending order
};


