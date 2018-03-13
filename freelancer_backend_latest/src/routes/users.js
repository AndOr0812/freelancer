import express from 'express';
/*
var models  = require('../models');
*/
import models from '../models';

console.log('Models are:');
console.log(models);

const router = express.Router();

//To handle the User Creation requests from "http://hostname.com/users/signup" URL
router.post('/signup',(req,res)=> {
    models.Users.create({
        name: req.body.name,
        emailid: req.body.emailid,
        password: req.body.password,
        type_of_user: req.body.type_of_user
    }).then(() => {
        res.status(200).send("User Successfully Created");
    }).catch(err => {
        console.log("Error while creating new User"+err);
        return err;
    })
});


//To handle the Login requests from "http://hostname.com/users/login" URL

router.post('/login',(req,res)=>{
    let emailid = req.body.emailid;
    let password = req.body.password;

    models.Users.find({
        where:{
            emailid:emailid,
            password: password
        }
    }).then(user => {
        console.log("User is");
        console.log(user);
        if (user === null){
            res.status(404).send("User doesn't exist");
        }
        else{
            res.status(200).send(user);
        }
    }).catch(err => {
        console.log("Error is");
        console.log(err);
        return err;
    });
});

module.exports = router;