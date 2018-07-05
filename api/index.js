if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoConfigurator = require('./db/mongoConfigurator');
const passportConfigurator = require('./passportConfigurator');
const endpointConfigurator = require('./endpoints/endpointConfigurator');

const app = express();

mongoConfigurator.connect();
passportConfigurator.configurePassport(app);
endpointConfigurator.configureEndpoints(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Running on port ${port}...`));
