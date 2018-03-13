import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
var path = require('path');
//var favicon = require('serve-favicon');


import index from './routes/index';
import users from './routes/users';


let app = express();

/*db.authenticate()
    .then(()=> {
        console.log('Connected to the Database successfully.');
    })
    .catch(err=>{
        console.error("Unable to connect to DB",err);
    });*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());


app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();

});

app.use('/',index);
app.use('/users',users);

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