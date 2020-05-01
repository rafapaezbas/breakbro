config = {
    'streamers.path' : '/home/streamers/',
    'master.broadcast.url' : 'http://icecast2:38080/',
    'master.broadcast.password' : 'abletonlive99',
};

exports.get = (key) => {
    return config[key];
};
