var fileManager = require('./file-manager');

exports.create = function(req, res){
    fileManager.create(req);
    res.sendStatus(204);
};
