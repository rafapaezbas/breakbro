var formidable = require('formidable');
var fs = require('fs');
var config = require('./config');
var move = require('mv');

exports.create = (req) => {
    var form = new formidable.IncomingForm();
    form.parse(req, renameFile);
};

var renameFile = (err, fields, files) => {
    var fileName = files.filetoupload.name;
    var oldPath = files.filetoupload.path;
    var newPath = config.get('file.upload.path') + fileName;
    move(oldPath, newPath ,printIfSuccess(fileName));
};

var printIfSuccess = (fileName) => {
    return  (err) => {
        if (err) {
            throw err;
        }else{
            console.log(Date.now() + " successfull upload:" + fileName);
        }
    };
};
