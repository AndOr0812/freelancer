var express = require('express');

var router = express.Router();

var multer = require('multer');

var glob = require('glob');

var temp_file = "";
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function filename(req, file, cb) {
    temp_file = file.fieldname + '-' + Date.now() + '.jpeg';
    console.log('file name is');
    console.log(temp_file);
    cb(null, temp_file
    /*file.fieldname + '-' + Date.now() + '.jpeg'*/
    );
  }
});
var upload = multer({
  storage: storage
});
/* GET users listing. */

router.get('/', function (req, res, next) {
  var resArr = [];
  glob("public/uploads/*.jpeg", function (er, files) {
    var resArr = files.map(function (file) {
      var imgJSON = {};
      imgJSON.img = 'uploads/' + file.split('/')[2];
      imgJSON.cols = 2;
      return imgJSON;
    });
    console.log(resArr);
    res.status(200).send(resArr);
  });
});
router.post('/upload', upload.single('mypic'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  console.log('file name is');
  console.log(temp_file);
  res.status(200).send({
    success: true,
    filename: temp_file
  });
});
module.exports = router;