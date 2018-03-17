"use strict";

var _express = _interopRequireDefault(require("express"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); //Router to handle the placing of new bid for a project


router.post('/new', function (req, res) {
  console.log("Inside the new bid router");
  var bid = req.body.bid;
  var Bidder = req.body.bidder;
  var deliver_in_date = req.body.deliver_in_date;
  var EmployerID = req.body.employerId;
  var ProjectId = req.body.projectId;

  if (bid === undefined || Bidder === undefined || deliver_in_date === undefined || EmployerID === undefined || ProjectId === undefined) {
    res.status(200).send({
      success: false,
      message: "Please submit the required fields"
    });
    return;
  } //To Check if the user has already placed a bid, if not then place the bid


  _models.default.ProjectBid.findOrCreate({
    where: {
      Bidder: Bidder,
      ProjectId: ProjectId
    },
    defaults: {
      bid: bid,
      deliver_in_date: deliver_in_date,
      EmployerID: EmployerID
    }
  }).spread(function (bid, created) {
    console.log(bid);

    if (created) {
      res.status(200).send({
        success: true,
        bid: bid
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Bid is already placed."
      });
    }
  });
}); //Router to handle the get request to fetch the details of the bids placed yet for a project

router.get('/list/:projectId', function (req, res) {
  var ProjectId = req.params.projectId;
  console.log("The project Id mentioned is : ".concat(ProjectId)); //Fetching the list of all bids as an array of bids

  _models.default.ProjectBid.findAll({
    where: {
      ProjectId: ProjectId
    }
  }).then(function (bids) {
    res.status(200).send({
      success: true,
      bids: bids
    });
  });
});
router.post('/hire/:bidId', function (req, res) {
  var id = req.params.bidId;
  console.log("The bid Id that is going to be hired is ".concat(id));

  _models.default.ProjectBid.findById(id).then(function (bid) {
    console.log(JSON.stringify(bid));

    if (!bid) {
      res.status(200).send({
        success: false,
        message: "No bids found"
      });
      return;
    }

    _models.default.ProjectBid.update({
      bid_status: 'hired'
    }, {
      where: {
        id: id
      }
    }).then(function (result) {
      console.log(JSON.stringify(result));

      if (result[0]) {
        //Since Employer now successfully hired a employee, the status of the project also needs to be updated here
        _models.default.Project.update({
          project_status: 'HIRED'
        }, {
          where: {
            id: bid.ProjectId
          }
        }).then(function (result) {
          console.log(JSON.stringify(result));

          if (result[0]) {
            res.status(200).send({
              success: true,
              message: "Hired"
            });
            return;
          }

          res.status(200).send({
            success: false,
            message: "no project for the projectID in bid was found"
          });
        }).catch(function (error) {
          res.status(200).send({
            success: false,
            error: error
          });
        });
      } else {
        res.status(200).send({
          success: false,
          message: "no bids are found"
        });
      }
    }).catch(function (error) {
      res.status(200).send({
        success: false,
        error: error
      });
    });
  }).catch(function (error) {
    res.status(200).send({
      success: false,
      error: error
    });
  });
});
router.get('/', function (req, res) {
  res.status(200).send("Inside the project bids router");
});
module.exports = router;