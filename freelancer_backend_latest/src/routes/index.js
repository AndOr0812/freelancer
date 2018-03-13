import express from 'express';

const router = express.Router();

router.get('/',(err,res)=>{
    res.send('Welcome to the freelancer application');
});

module.exports = router;