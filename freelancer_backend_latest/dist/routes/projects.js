"use strict";

var _express = _interopRequireDefault(require("express"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

/*import multer from 'multer';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log("The files received are ");
        console.info(file);
        cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer({ storage: storage }).array('files',5);

router.post('/uploads',(req,res)=> {
    console.log("inside the router");
    console.info(req);
    console.info('req body is', req.body);
    upload(req,res,(err)=>{
        console.log("inside the upload function");
        console.info(req.files);
        if (err){
            console.log("An error occurred while uploading");
        }
    else {
            console.log("Everything went fine");
            console.log("Inside the post projects/new router");
            console.log("Body is ");
            console.log(JSON.stringify(req.body));
            console.log("FOrm Data is ");
            console.log(JSON.stringify(req.formData));
            //res.status(200).send("Successfully recieved the request");
        }
    });
});*/
router.get('/', function (req, res) {
  console.log("Inside the project root router");
  res.status(200).send("Inside the projects root router");
});
router.post('/new', function (req, res) {
  var proj_name = req.body.proj_name;
  var proj_desc = req.body.proj_desc;
  var Employer = req.body.Employer;
  var budget_currency = req.body.budget_currency;
  var budget_range = req.body.budget_range;
  /*const skills = JSON.parse(req.body.skills);*/

  var skills = req.body.skills.split(",");
  console.log("Skills are ".concat(skills));

  if (proj_name === undefined || proj_desc === undefined || Employer === undefined || budget_currency === undefined || budget_range === undefined || skills.length === 0) {
    res.status(200).send({
      success: false,
      error: "Please submit the required fields"
    });
    return;
  }

  _models.default.Project.create({
    proj_name: proj_name,
    proj_desc: proj_desc,
    Employer: Employer,
    budget_currency: budget_currency,
    budget_range: budget_range
  }).then(function (project) {
    console.log("After trying to create the user, the returned user details are ");
    console.log(project);
    res.status(200).send({
      success: true,
      project: {
        id: project.id,
        name: project.proj_name,
        desc: project.proj_desc,
        employer: project.Employer,
        budget_currency: project.budget_currency,
        budget_range: project.budget_range
      }
    });
  }).catch(function (err) {
    console.log("There is an error while creating the project, Error is ".concat(err));

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
module.exports = router;