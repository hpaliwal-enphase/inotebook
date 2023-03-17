const express = require("express");
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'hellohit@nsh';

const router = express.Router();


//ROUTE 1: Create a new  user. No Login Required.
router.post('/createuser', [
    body('email', 'Not a valid email').isEmail(),
    body('name', 'Not a valid name').isLength({ min: 3}),
    body('password', 'Not a valid password').isLength({ min: 5})
] , async(req, res)=>{
    //Return Bad Request and the errors if there are errors
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
                success: false,
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

        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, JWT_SECRET);

        res.json({
            token: authToken,
            success: true
        });
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error.",
            success: false
        })
    }
    

});

//ROUTE 2: Log in as a user. No Login Required.
router.post('/login', [
    body('email', 'Not a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async(req, res) => {

    //Return Bad Request and the errors if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success: false });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email}); //{email} same as {email: email}
        console.log(user);
        if(!user){
            return res.status(400).json({
                error: "This email is not registered with us.",
                success: false
            });
        }

        const pwdCompare = await bcrypt.compare(password, user.password);
        console.log(pwdCompare);
        if(!pwdCompare){
            return res.status(400).json({
                error: "Please enter correct credentials.",
                success: false
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, JWT_SECRET);
        res.json({
            token: authToken,
            success: true
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error.",
            success: false
        })
    }
});


//ROUTE 3: Get LoggedIn User details. Login is Required.

router.post('/getuser', fetchUser,async(req, res) => {

    //Return Bad Request and the errors if there are errors
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId).select('-password');
        res.send(userDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error."
        })
    }
});

module.exports= router;
