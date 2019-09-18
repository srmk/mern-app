require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error_handler');

var emitter = require('fs');

console.log(emitter);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users_controller'));

// global error handler
app.use(errorHandler);

// start server
const ports = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8000;
const server = app.listen(ports, function () {
    var host = server.address().address;  
    var port = server.address().port;  
    console.log('Server listening on port '+ host + port );
});