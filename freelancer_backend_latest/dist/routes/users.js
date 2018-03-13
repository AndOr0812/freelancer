"use strict";

var _express = _interopRequireDefault(require("express"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
var models  = require('../models');
*/
console.log('Models are:');
console.log(_models.default);

var router = _express.default.Router(); //To handle the User Creation requests from "http://hostname.com/users/signup" URL


router.post('/signup', function (req, res) {
  _models.default.Users.create({
    name: req.body.name,
    emailid: req.body.emailid,
    password: req.body.password,
    type_of_user: req.body.type_of_user
  }).then(function () {
    res.status(200).send("User Successfully Created");
  }).catch(function (err) {
    console.log("Error while creating new User" + err);
    return err;
  });
}); //To handle the Login requests from "http://hostname.com/users/login" URL

router.post('/login', function (req, res) {
  var emailid = req.body.emailid;
  var password = req.body.password;

  _models.default.Users.find({
    where: {
      emailid: emailid,
      password: password
    }
  }).then(function (user) {
    console.log("User is");
    console.log(user);

    if (user === null) {
      res.status(404).send("User doesn't exist");
    } else {
      res.status(200).send(user);
    }
  }).catch(function (err) {
    console.log("Error is");
    console.log(err);
    return err;
  });
});
module.exports = router;