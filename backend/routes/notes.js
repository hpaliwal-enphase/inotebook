const express = require("express");
const Note = require('../models/Note');

const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'hellohit@nsh';

const router = express.Router();


//ROUTE1: Fetch all notes of a logged in user. Login is required.
router.get('/fetchallnotes', fetchUser, async(req, res)=>{
    try {
        const userId = req.user.id;
        const userNotes = await Note.find({user: userId});
        res.json(userNotes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error."
        })
    }
})

//ROUTE2: Add a new note for a logged in user. Login is required.
router.post('/addnote', fetchUser, [
    body('title', 'Please enter a valid Title (3+ characters)').isLength({min:3}),
    body('description', 'Please enter a valid Description (5+ characters)').isLength({min:5})
], async(req, res)=>{
    //Return Bad Request and the errors if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
        const userId = req.user.id;
        const {title, description, tag} = req.body;
        const userNote = await Note.create({user: userId, title, description, tag});
        res.json(userNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error."
        })
    }
})

module.exports = router;