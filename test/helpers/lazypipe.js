const vs = require('vinyl-string');
const map = require('map-stream');

module.exports.lazypipeFromString = (input, path, func) => {
    return new Promise((res, rej) => {
        let contents = false;
        const vFile = vs(input, { path });

        vFile
            .pipe(func())
            .pipe(map((file, cb) => {
                contents = file;
                cb(null, file);
            }))
            .on('error', e => {
                rej(e);
            })
            .on('end', () => {
                res(contents);
            });
    });
};