var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'freelancer'
});

con.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the Users Route Page');
});


router.post('/signup',function (req,res,next) {
    console.log('into the signup router');
/*   const emailid = req.params.emailid;
   const name = req.params.name;
   const password = req.params.password;
   const type_of_user = req.params.type_of_user;*/

    const emailid = req.body.emailid;
    const name = req.body.name;
    const password = req.body.password;
    const type_of_user = req.body.type_of_user || 1;

    console.log('emailid is' + emailid);
    console.log('name is '+ name);
    console.log('password is'+ password);
    console.log('type_of_user' + type_of_user);

   if (emailid && name && password) {
       console.log('emailid is' + emailid);
       console.log('name is '+ name);
       console.log('password is'+ password);
       console.log('type_of_user' + type_of_user);

       const userdetails = {emailid : emailid,
       name: name,
       password: password,
       type_of_user: type_of_user};

       con.query('INSERT INTO users SET ?', userdetails, function(err, res) {
           if(err) throw err;

       console.log('Last insert ID:', res.insertId);
   });
       res.json(userdetails);
   }
});

router.post('/login',function (req,res,next) {
    console.log('into the Login router');
    const exist_emailid = req.body.emailid;
    const exist_password = req.body.password;

    console.log('emailid is' + exist_emailid);
    console.log('password is'+ exist_password);

    if (exist_emailid && exist_password) {

        console.log('emailid is' + exist_emailid);
        console.log('password is'+ exist_password);

        con.query('SELECT * FROM users WHERE emailid = ? and password= ?', [exist_emailid, exist_password]
            , function (err, rows) {
                if (err) {
                    return console.log(err);
                }

                if (!rows.length) {
                    console.log('user doesnt exist');
                    return res.send("failure");
                }
                else {
                    //console.log('rows data is');
                    //console.log(JSON.stringify(rows));
                    console.log(rows[0].emailid + rows[0].name);
                    return res.json(rows[0]);
                }
            });
    }
    /*if (emailid && password) {
        console.log('emailid is' + emailid);
        console.log('password is'+ password);

        const userdetails = {emailid : emailid,
            name: name,
            password: password,
            type_of_user: type_of_user};

        con.query('INSERT INTO users SET ?', userdetails, function(err, res) {
            if(err) throw err;

            console.log('Last insert ID:', res.insertId);
        });
        res.json(userdetails);
    }*/
});

module.exports = router;
