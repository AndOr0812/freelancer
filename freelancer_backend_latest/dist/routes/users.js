"use strict";

var _express = _interopRequireDefault(require("express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
var models  = require('../models');
*/
console.log('Models are:');
console.log(_models.default);

var router = _express.default.Router(); //To handle the User Creation requests from "http://hostname.com/users/signup" URL


router.post('/signup', function (req, res) {
  var name = req.body.name;
  var emailId = req.body.emailid;
  var password = req.body.password;
  var typeOfUser = req.body.type_of_user || 1;

  if (name === undefined || emailId === undefined || password === undefined) {
    res.status(200).send({
      success: false,
      error: "Please submit the required fields"
    });
    return;
  }

  _bcrypt.default.hash(password, 10, function (err, hash) {
    if (err) {
      res.status(200).send({
        success: false,
        message: "Password encryption failed"
      });
      return;
    } // Store hash in your password DB.


    _models.default.User.create({
      name: name,
      emailId: emailId,
      password: hash,
      typeOfUser: typeOfUser
    }).then(function (user) {
      console.log("After trying to create the user, the returned user details are ");
      console.log(user);
      res.status(200).send({
        success: true,
        user: {
          name: user.name,
          emailid: user.emailId
        }
      });
    }) //Error in Sequelize
    .catch(function (error) {
      console.log("Error while creating new User ".concat(error));

      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(200).send({
          success: false,
          error: error
        });
        return;
      }

      res.status(400).send({
        success: false,
        error: error
      });
    }); //Error in Request

  });
}); //To handle the Login requests from "http://hostname.com/users/login" URL

router.post('/login', function (req, res) {
  var emailId = req.body.emailid;
  var password = req.body.password;

  if (emailId === undefined || password === undefined) {
    res.status(200).send({
      success: false,
      error: "Please submit the required fields"
    });
    return;
  }

  _models.default.User.findOne({
    where: {
      emailId: emailId
    }
  }).then(function (user) {
    console.log("User is");
    console.log(user);

    if (!user) {
      res.status(200).send({
        success: false,
        error: "Invalid Email Id"
      });
      return;
    }

    console.log("User emailid passed is ".concat(user.emailId));

    _bcrypt.default.compare(password, user.password).then(function (result) {
      if (!result) {
        res.status(200).send({
          success: false,
          error: "Invalid password"
        });
        return;
      }

      var logged_in_user = {
        isLoggedIn: true,
        details: {
          'name': user.name,
          'emailid': user.emailId
        }
      };
      req.mySession.user = logged_in_user;
      console.log("Session User Details are ".concat(req.mySession.user));
      res.status(200).send({
        success: true,
        user: logged_in_user
      });
    });
  }) //Error in Sequelize
  .catch(function (error) {
    console.log("Error is ".concat(error));
    res.status(400).send({
      success: false,
      error: error
    });
  });
}); //To handle the Logout requests from "http://hostname.com/users/logout" URL

router.post('/logout', function (req, res) {
  var previousUser = req.mySession.user; // Save the previous user

  req.mySession.reset(); // Reset the cookies
  // Response to client

  res.status(200).send({
    success: true,
    user: previousUser
  });
});
router.post('/profile/update', function (req, res) {
  console.log(JSON.stringify(req.body));
  var emailId = req.body.emailId;
  var phone = req.body.phone;
  var imgPath = req.body.imgPath;
  var aboutme = req.body.aboutme;
  var skills = JSON.stringify(req.body.user_skills);
  console.log("After destructuring");
  console.log('Inside the profile update router');

  _models.default.UserProfile.upsert({
    emailId: emailId,
    phone: phone,
    imgPath: imgPath,
    aboutme: aboutme,
    skills: skills
  }, {
    where: {
      emailId: emailId
    }
  }).then(function (result) {
    if (result) {
      console.log("Result is ".concat(result));
      /*            models.UserProfile.findOne({
                      where: {emailId: emailId}
                  })
                      .then((updated_user_profile) => {
                          res.status(200).send({
                              success: true,
                              updated_user_profile
                          });
                      }).catch(error => {
                      res.status(200).send({
                          success: false,
                          error
                      });
                  });*/
    } else {
      res.status(200).send({
        success: false,
        message: "User profile not updated"
      });
    }
  }).catch(function (error) {
    res.status(200).send({
      success: false,
      error: error
    });
  });
}); //This router is to fetch the details of the user profile

router.get('/profile/getdetails/:emailId', function (req, res) {
  var emailId = req.params.emailId;
  console.log("Email Id passed is ");
  console.log(emailId);

  if (emailId === undefined || emailId === null) {
    res.status(200).send({
      success: false,
      message: 'Please pass proper emailId of the user'
    });
  }

  _models.default.UserProfile.findOne({
    where: {
      emailId: emailId
    }
  }).then(function (user_profile) {
    if (!user_profile) {
      res.status(200).send({
        success: false,
        message: "User profile with the passed emailId not found"
      });
      return;
    }

    res.status(200).send({
      success: true,
      user_profile: user_profile
    });
  });
});
module.exports = router;