var express = require('express');
var router = express.Router();

/* Main Route . */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/add', function (req, res, next) {

    var reqUsername = req.body.number1;
    var reqPassword = req.body.number2;
    var operate = req.body.operate;

    console.log("Number 1 :" +reqUsername);
    console.log("Number 2 :" +reqPassword);
    console.log("Operation :" +operate);

    console.log(reqPassword.length)
    if(reqUsername.length==0 || reqPassword.length==0)
    {
        console.log("reached B")
        res.status(401).json({message: "Invalid Numbers"});
    }
    else
    {
                console.log("reached Addition")
                var sum = parseFloat(reqUsername) + parseFloat(reqPassword);
                console.log(sum);
                res.status(201).json({message: "Addition is : " + sum})

    }


});

router.post('/sub', function (req, res, next) {

    var reqUsername = req.body.number1;
    var reqPassword = req.body.number2;
    var operate = req.body.operate;

    console.log("Number 1 :" +reqUsername);
    console.log("Number 2 :" +reqPassword);
    console.log("Operation :" +operate);

    console.log(reqPassword.length)
    if(reqUsername.length==0 || reqPassword.length==0)
    {
        console.log("reached C")
        res.status(401).json({message: "Invalid Numbers"});
    }
    else
    {
        console.log("reached Subtraction")
        var sub = parseFloat(reqUsername) - parseFloat(reqPassword);
        console.log(sub);
        res.status(201).json({message: "Subtraction is : " + sub})

    }
});

router.post('/mul', function (req, res, next) {

    var reqUsername = req.body.number1;
    var reqPassword = req.body.number2;
    var operate = req.body.operate;

    console.log("Number 1 :" +reqUsername);
    console.log("Number 2 :" +reqPassword);
    console.log("Operation :" +operate);

    console.log(reqPassword.length)
    if(reqUsername.length==0 || reqPassword.length==0)
    {
        console.log("reached D")
        res.status(401).json({message: "Invalid Numbers"});
    }
    else
    {
        console.log("reached Multiplication")
        var mul = parseFloat(reqUsername) * parseFloat(reqPassword);
        console.log(mul);
        res.status(201).json({message: "Multiplication is : " + mul})

    }
});

router.post('/div', function (req, res, next) {

    var reqUsername = req.body.number1;
    var reqPassword = req.body.number2;
    var operate = req.body.operate;

    console.log("Number 1 :" +reqUsername);
    console.log("Number 2 :" +reqPassword);
    console.log("Operation :" +operate);

    console.log(reqPassword.length)
    if(reqUsername.length==0 || reqPassword.length==0)
    {
        console.log("reached E")
        res.status(401).json({message: "Invalid Numbers"});
    }
    else
    {
        if(parseFloat(reqPassword)==0)
        {res.status(401).json({message: "Cannot divide by zero"});}
        else{
            console.log("reached Division")
            var div = parseFloat(reqUsername) / parseFloat(reqPassword);
            console.log(div);
            res.status(201).json({message: "Division is : " + div})}

    }
});

module.exports = router;
