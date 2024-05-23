const express = require('express');
const { hbsConfig } = require('./config/hbsConfig');
const { expressConfig } = require('./config/expressConfig');

const app = express();
const PORT = process.env.PORT || 3000;

expressConfig(app);
hbsConfig(app);


app.listen(PORT, console.log(`App is listening on port ${PORT}...`));
