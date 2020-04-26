const streamerManager = require('./streamer-manager');

exports.create = async (req, res) => {
    const streamerName = req.query.name;
    streamerManager.create(streamerName);
    res.sendStatus(200);
};

const reqToStreamer = (req) => {
    return {
        name: req.body.name,
        info: req.body.info,
        password: req.body.password
    };
};
