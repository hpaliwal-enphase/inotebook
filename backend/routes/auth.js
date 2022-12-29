const express = require("express");
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const {body, validationResult} = require('express-validator');

const router = express.Router();

router.post('/createuser', [
    body('email', 'Not a valid email').isEmail(),
    body('name', 'Not a valid name').isLength({ min: 3}),
    body('password', 'Not a valid password').isLength({ min: 5})
] , async(req, res)=>{

    //Bad Request if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    //check whether the email exists
    try{
        let user = await User.findOne({
            email: req.body.email
        })
        if(user){
            return res.status(400).json({
                error: "A user with this EmailID already exists."
            })
        }
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email
        });
        res.json(user);
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({
            error: "Some Error occurred on the server."
        })
    }
    

})

module.exports= router;
