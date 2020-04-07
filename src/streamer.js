const streamerManager = require('./streamer-manager');

exports.get = (req, res) => {
    const streamer = streamerManager.get(id);
    res.send(streamer);
};

exports.create = (req, res) => {
    const streamer = reqToStreamer(req);
    const status = streamerManager.create(streamer);
    res.sendStatus(status);
};

exports.update = (req, res) => {
    const streamer = reqToStreamer(req);
    const status = streamerManager.update(id, streamer);
    res.sendStatus(status);
};

const reqToStreamer = (req) => {
    return {
        name: req.body.name,
        info: req.body.info
    };
};
