var config = require('./config')
var crypto = require('crypto');

exports.getSHA256 = (input) => {
    const secret = config.get("encrytion.salt");
    for(var i = 0; i < 100; i++){
        input = crypto.createHmac('sha256', secret).update(input).digest('hex');
    }
    return input;
};
