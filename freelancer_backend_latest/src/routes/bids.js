import express from 'express';
import models from '../../dist/models/index';
const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).send("Inside the project bids router");
});

router.post('/new',(req,res)=> {
    console.log("Inside the new bid router");
    const bid = req.body.bid;
    const Bidder = req.body.bidder;
    const deliver_in_date = req.body.deliver_in_date;
    const EmployerID = req.body.employerId;
    const ProjectId = req.body.projectId;

    models.cre

});

module.exports = router;