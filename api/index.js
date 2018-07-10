if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './.env.development' });
}

const express = require('express');
const mongoConfigurator = require('./db/mongoConfigurator');
const passportConfigurator = require('./routes/passportConfigurator');
const routeConfigurator = require('./routes/routeConfigurator');

const app = express();

mongoConfigurator.connect();
passportConfigurator.configurePassport(app);
routeConfigurator.configureRoutes(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Running on port ${port}...`));
