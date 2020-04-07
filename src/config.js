config = {
    'file.upload.path' : '/home/',
};

exports.get = (key) => {
    return config[key];
};
