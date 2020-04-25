const http = require('http');

exports.get = (hostname, port, path) => {
    return new Promise ((resolve, reject) => {
        http.get({
            hostname: hostname,
            port: port,
            path: path
        }, (response) => {
            console.log(response);
            if(response.statusCode == 200){
                resolve();
            }else{
                reject();
            }
        });
    });
};
