const jwt  = require('jsonwebtoken');
const config  = require('../config/config');

exports.validAuth = (req) => {
    if(req.headers == undefined || req.headers.authorization == undefined || req.headers.authorization.split(" ")[1] == undefined){
        return undefined;
    }else{
        const token = req.headers.authorization.split(" ")[1];
        const secret = config.get('jwt.sign.secret');
        return jwt.verify(token,secret).sub;
    }
};
