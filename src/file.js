var fileManager = require('./file-manager');

exports.create = function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, fileManager.renameFile);
    res.sendStatus(204);
};
