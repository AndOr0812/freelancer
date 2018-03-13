"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path'); //var favicon = require('serve-favicon');


var app = (0, _express.default)();
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
app.use((0, _morgan.default)('dev'));
app.use(_bodyParser.default.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', _index.default);
app.use('/users', _users.default);
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;