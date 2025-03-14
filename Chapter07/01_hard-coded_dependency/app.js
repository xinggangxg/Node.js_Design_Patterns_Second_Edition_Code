"use strict";

const Express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const http = require('http');

const authController = require('./lib/authController');

let app = Express();
app.use(bodyParser.json());

app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);
app.get('/test', authController.test);

app.use(errorHandler());
http.createServer(app).listen(3000, () => {
  console.log('Express server started');
});
