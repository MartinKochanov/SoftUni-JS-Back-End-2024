const http = require('http');

const { homeHandler } = require('./handlers/home');
const { staticFileHandler } = require('./handlers/static');

const routes = {
    '/': homeHandler,
    'index.html': homeHandler
}


const server = http.createServer((req, res) => {
    const route = routes[req.url];


    if (typeof route === 'function') {
        route(req, res);
        return;
    } else if (staticFileHandler(req, res)) {
        return;
    }

    res.writeHead(404, {
        'content-type': 'text/plaint'
    });
    res.write('404 Not Found');
    res.end();

});

server.listen(5000);