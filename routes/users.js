const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {check , validationResult} = require('express-validator');

///@route  POST api/users
///@desc  register a user
///@access public

router.post('/', [

    check('name', 'Please Enter Name..!').not().isEmpty(),
    check('email','Please Enter a Email..!').isEmail(),
    check('password','Please enter password with 6 or more characters!').isLength({min:6})
],
    (req,res)=>{
       const errors = validationResult(req);
       if(!errors.isEmpty()){
           return res.status(400).json({ errors: errors.array()});
       }

       res.send('passed...')
});


module.exports = router;