const http = require('http');

const { homeHandler } = require('./handlers/home');
const { staticFileHandler } = require('./handlers/static');
const { addBreedHandler, postBreedHandler } = require('./handlers/addBreed');
const { addCatHandler } = require('./handlers/addCat');
const { editCatHandler } = require('./handlers/editCat');

const routes = {
    'GET': {
        '/': homeHandler,
        '/index.html': homeHandler,
        '/cats/add-breed': addBreedHandler,
        '/cats/add-cat': addCatHandler,
        '/cats/edit-cat': editCatHandler
    },
    'POST': {
        '/cats/add-breed': postBreedHandler,
        '/cats/add-cat': addCatHandler
    }

}


const server = http.createServer((req, res) => {

    const methodRoutes = routes[req.method];

    if (methodRoutes) {

        const route = methodRoutes[req.url];

        if (typeof route === 'function') {
            route(req, res);
            return;
        }
    }

    if (staticFileHandler(req, res)) {
        return;
    }

    res.writeHead(404, {
        'content-type': 'text/plain'
    });
    res.write('404 Not Found');
    res.end();

});

server.listen(5000);