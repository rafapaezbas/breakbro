config = {
    'file.upload.path' : '/home/',
    'url.database' : 'mongodb://www.pinkumandrill.com:27017',
    'database.name' : 'breakbro',
    'streamers.path' : '/home/streamers/',
    'master.broadcast.url' : 'http://localhost:38080/',
    'master.broadcast.password' : 'abletonlive99',
    'encrytion.salt' : '1234567',
};

exports.get = (key) => {
    return config[key];
};
