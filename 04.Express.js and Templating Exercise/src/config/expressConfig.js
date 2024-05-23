const { urlencoded, static: statichandler } = require('express');
const { router } = require('./routes');

function expressConfig(app) {
    app.use(urlencoded({ extended: true }));
    app.use('/static', statichandler('static'));
    app.use(router);

}

module.exports = { expressConfig }