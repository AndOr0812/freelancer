import express from 'express';
const router = express.Router();
import models from '../models';
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

router.get('/',(req,res)=>{
    console.log("Inside the project root router");
    res.status(200).send("Inside the projects root router");
});

router.post('/new',(req,res) => {
    const proj_name = req.body.proj_name;
    const proj_desc = req.body.proj_desc;
    const Employer = req.body.Employer;
    const budget_currency = req.body.budget_currency;
    const budget_range = req.body.budget_range;
    const skills = (req.body.skills);
    console.log(`Skills are ${skills}`);

    if (proj_name === undefined || proj_desc === undefined
        || Employer === undefined || budget_currency === undefined
        || budget_range === undefined || skills === undefined){
        res.status(200).send({
            success: false,
            error: "Please submit the required fields",
        });
        return;
    }

    models.Project.create({
        proj_name,
        proj_desc,
        Employer,
        skills,
        budget_currency,
        budget_range
    }).then((project)=>{
        console.log("After trying to create the user, the returned user details are ");
        console.log(project);

        res.status(200).send({
            success: true,
            project : {
                id : project.id,
                name : project.proj_name,
                desc : project.proj_desc,
                employer: project.Employer,
                skills: project.skills,
                budget_currency: project.budget_currency,
                budget_range: project.budget_range
            },
        });
    }).catch(error => {
        console.log(`There is an error while creating the project, Error is ${err}`);
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(200).send({
                success: false,
                error
            });
            return;
        }
        res.status(200).send({
            success: false,
            error
        });
    });//Error in Request
});

module.exports = router;