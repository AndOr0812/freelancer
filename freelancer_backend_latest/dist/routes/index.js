"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/', function (err, res) {
  res.send('Welcome to the freelancer application');
});
module.exports = router;