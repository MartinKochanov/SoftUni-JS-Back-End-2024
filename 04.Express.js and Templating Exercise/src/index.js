const express = require('express');
const { hbsConfig } = require('./config/hbsConfig');
const { expressConfig } = require('./config/expressConfig');
const { configDatabase } = require('./config/databaseConfig');

const PORT = process.env.PORT || 3000;

async function start() {

    const app = express();

    await configDatabase();
    expressConfig(app);
    hbsConfig(app);


    app.listen(PORT, console.log(`App is listening on port ${PORT}...`));
}

start();