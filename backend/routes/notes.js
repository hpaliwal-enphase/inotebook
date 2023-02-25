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
        const {title, description, tag, colour} = req.body;
        const userNote = await Note.create({user: userId, title, description, tag, colour});
        res.json(userNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error."
        })
    }
})


//ROUTE3: Update an existing note for a logged in user using a PUT request. Login is required.
router.put('/updatenote/:id', fetchUser, async(req, res)=>{

    const {title, description, tag, colour} = req.body;

    

    try {
        const userId = req.user.id;
        const {title, description, tag, colour} = req.body;

        const newNote = {};

        if(title){
            newNote.title = title;
        }
    
        if(description){
            newNote.description = description;
        }
    
        if(tag){
            newNote.tag = tag;
        }

        if(colour){
            newNote.colour = colour;
        }

        //find the Note to be updated. Check Permissions.
        const note = await Note.findById(req.params.id);
        if(!note){
            res.status(404).json({
                "error": "Note not found."  
            })
        }

        if(userId !== note.user.toString()){
            res.status(401).json({
                "error": "Access Denied to Note."
            })
        }

        //Update the Note to be updated.
        const userNote = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true} );
        res.json(userNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error."
        })
    }
})


//ROUTE4: Delete an existing note for a logged in user using a DELETE request. Login is required.
router.delete('/deletenote/:id', fetchUser, async(req, res)=>{
    try {
        const userId = req.user.id;

        //find the Note to be deleted. Check Permissions.
        const note = await Note.findById(req.params.id);
        if(!note){
            res.status(404).json({
                "error": "Note not found."  
            })
        }

        if(userId !== note.user.toString()){
            res.status(401).json({
                "error": "Access Denied to Note."
            })
        }

        //Delete the Note to be deleted.
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        res.json({"success": `Note with ${deletedNote._id} has been deleted.`});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error."
        })
    }
})

module.exports = router;