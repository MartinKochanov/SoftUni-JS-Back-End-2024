const { readFile } = require("../util");

async function staticFileHandler(req, res) {
    if (req.url.endsWith('.css')) {

        sendFile(req.url, 'text/css', res);
        return true;

    } else if (req.url.endsWith('.ico')) {

       sendFile(req.url, 'image/svg+xml', res)
        return true;
    }
    return false;
}

module.exports = {
    staticFileHandler
};

async function sendFile(path, contentType, res) {
    const data = await readFile(path);
    res.writeHead(200, {
        'content-type': contentType
    });
    data.pipe(res);
}