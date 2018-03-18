import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import sessions from "client-sessions";
var cors = require('cors');
var path = require('path');
//var favicon = require('serve-favicon');

import index from './routes/index';
import users from './routes/users';
import projects from './routes/projects';
import bids from './routes/bids';
import files from './routes/files';

let app = express();

//Enable CORS
app.use(cors());

app.use(sessions({
    cookieName: 'mySession', // cookie name dictates the key name added to the request object
    secret: 'askjnd3akjnd78fkjd64nfdad', // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());


app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials",true);

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();

});

//Any routes with /uploads will be handled by this for handling static files
app.use('/uploads/', express.static(path.join('./', 'public','uploads')));


app.use('/',index);
app.use('/users',users);
app.use('/projects',projects);
app.use('/bids',bids);
app.use('/files',files);


app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;