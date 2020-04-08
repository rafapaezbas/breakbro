config = {
    'file.upload.path' : '/home/',
    'url.database' : 'mongodb://www.pinkumandrill.com:27017',
    'database.name' : 'breakbro',
    'streamers.path' : '/home/streamers/',
    'master.broadcast.url' : 'http://localhost:8000/',
    'master.broadcast.password' : 'password',
};

exports.get = (key) => {
    return config[key];
};
