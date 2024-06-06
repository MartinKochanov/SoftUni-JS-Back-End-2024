const { urlencoded, static: statichandler } = require('express');
const { router } = require('./routes');
const cookieParser = require('cookie-parser');
const { session } = require('../middlewares/session');

const secret = 'what a secret';

function expressConfig(app) {
    app.use(cookieParser(secret));
    app.use(session());
    app.use(urlencoded({ extended: true }));
    app.use('/static', statichandler('static'));
    app.use(router);

}

module.exports = { expressConfig }