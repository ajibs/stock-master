const express = require('express');
const routes = require('./routes/index');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// secure app by setting http headers
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// retrieve information from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve up static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/', routes);


module.exports = app;
