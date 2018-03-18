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
    const name =  req.body.name;
    const emailId = req.body.emailid;
    const password = req.body.password;
    const typeOfUser = req.body.type_of_user || 1;

    if (name === undefined || emailId === undefined || password === undefined){
        res.status(200).send({
            success: false,
            error: "Please submit the required fields",
        });
        return;
    }

    models.User.create({
        name,
        emailId,
        password,
        typeOfUser,
    }).then((user) => {
        console.log("After trying to create the user, the returned user details are ");
        console.log(user);
        res.status(200).send({
            success: true,
            user : {
                name : user.name,
                emailid : user.emailId
            },
        });
    })//Error in Sequelize
        .catch((error) => {
        console.log(`Error while creating new User ${error}`);
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(200).send({
                success: false,
                error
            });
            return;
        }
        res.status(400).send({
            success: false,
            error
        });
    });//Error in Request
});


//To handle the Login requests from "http://hostname.com/users/login" URL

router.post('/login',(req,res)=>{
    const emailId = req.body.emailid;
    const password = req.body.password;

    if (emailId === undefined || password === undefined){
        res.status(200).send({
            success: false,
            error: "Please submit the required fields",
        });
        return;
    }

    models.User.findOne({
        where:{
            emailId,
            password
        }
    }).then(user => {
        console.log("User is");
        console.log(user);
        if (!user){
            res.status(200).send({
                success: false,
                error:"Invalid Email Id and password",
            });
            return;
        }

        console.log(`Successfully logged in user emailid is ${user.emailId}`);

        const logged_in_user = {
            isLoggedIn : true,
            details :{'name': user.name , 'emailid': user.emailId},
        };

        req.mySession.user = logged_in_user;

        console.log(`Session User Details are ${req.mySession.user}`);

        res.status(200).send({
            success: true,
            user : logged_in_user,
        });
    })//Error in Sequelize
        .catch(error => {
        console.log(`Error is ${error}`);
        res.status(400).send({
            success: false,
            error,
        });
    });
});

//To handle the Logout requests from "http://hostname.com/users/logout" URL
router.post('/logout',(req,res)=>{
    const previousUser = req.mySession.user; // Save the previous user
    req.mySession.reset(); // Reset the cookies

    // Response to client
    res.status(200).send({
        success: true,
        user: previousUser,
    });
});

router.post('/profile/update', (req,res)=> {
    console.log(JSON.stringify(req.body));
    const emailId = req.body.emailId;
    const phone = req.body.phone;
    const imgPath = req.body.imgPath;
    const aboutme = req.body.aboutme;
    const skills = req.body.skills;
    console.log("After destructuring");
    console.log(JSON.stringify(rest));
    console.log('Inside the profile update router');
    models.UserProfile.upsert({
            emailId,
            phone,
            imgPath,
            aboutme,
            skills,
        },
    ).then(result => {
        if (result[0]) {

            models.UserProfile.findOne({
                where: {emailId: rest.emailId}
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
            });
        } else {
            res.status(200).send({
                success: false,
                message: "User profile not updated"
            });
        }
    }).catch(error => {
        res.status(200).send({
            success: false,
            error
        });
    });
});

router.get('/profile/getdetails/:emailId',(req,res)=>{
    const emailId = req.params.emailId;
    console.log(`Email Id passed is ${emailId}`);
    if(emailId === undefined || emailId === null){
        res.status(200).send({
            success: false,
            message: 'Please pass proper emailId of the user'
        })
    }
    models.UserProfile.findOne({
        where: {emailId: emailId}
    }).then(user_profile => {
            if (!user_profile){
                res.status(200).send({
                    success: false,
                    message: `User profile with the passed ${emailId} not found`
                });
                return;
            }
            res.status(200).send({
                success: true,
                user_profile
            });
    }).catch(error=>{
        res.status(200).send({
            success: false,
            error
        });
    });
});
module.exports = router;