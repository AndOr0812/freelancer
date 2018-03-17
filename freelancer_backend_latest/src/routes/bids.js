import express from 'express';
import models from '../models';
const router = express.Router();

//Router to handle the placing of new bid for a project
router.post('/new',(req,res)=> {
    console.log("Inside the new bid router");
    const bid = req.body.bid;
    const Bidder = req.body.bidder;
    const deliver_in_date = req.body.deliver_in_date;
    const EmployerID = req.body.employerId;
    const ProjectId = req.body.projectId;

    if(bid === undefined || Bidder === undefined ||
        deliver_in_date === undefined || EmployerID === undefined
        || ProjectId === undefined){
        res.status(200).send({
            success: false,
            message: "Please submit the required fields"
        });
        return;
    }

    //To Check if the user has already placed a bid, if not then place the bid
    models.ProjectBid.findOrCreate({where: {
            Bidder,
            ProjectId
        },
        defaults: {
            bid,
            deliver_in_date,
            EmployerID,
        }}).spread((bid,created)=>{
        console.log(bid);
        if(created) {
            res.status(200).send({
                success : true,
                bid
            });
        }
        else{
            res.status(200).send({
                success: false,
                message: "Bid is already placed."
            });
        }
    });
});

//Router to handle the get request to fetch the details of the bids placed yet for a project
router.get('/list/:projectId',(req,res)=>{
    const ProjectId = req.params.projectId;
    console.log(`The project Id mentioned is : ${ProjectId}`);

    //Fetching the list of all bids as an array of bids
    models.ProjectBid.findAll({where: {ProjectId}}).then(bids => {
            res.status(200).send({
                success: true,
                bids
            });
    });
});

router.post('/hire/:bidId',(req,res)=>{
    const id = req.params.bidId;
    console.log(`The bid Id that is going to be hired is ${id}`);

    models.ProjectBid.findById({id}).then((bid)=>{
        console.log(JSON.stringify(bid));
        cons
    })

    models.ProjectBid.update(
        {bid_status: 'hired'},
        {where:{id}})
        .then(result => {
            console.log(JSON.stringify(result));
                if (result[0]){
                    //Since Employer now successfully hired a employee, the status of the project also needs to be updated here
                    models.Project.update()
                    res.status(200).send({
                        success: true,
                        message: "Hired"
                    });
                }
                else {
                    res.status(200).send({
                        success: false,
                        message: "no bids are found"
                    });
                }
        }).catch(error => {
            res.status(200).send({
                success: false,
                error
            });
        });
    });

router.get('/',(req,res)=>{
    res.status(200).send("Inside the project bids router");
});

module.exports = router;