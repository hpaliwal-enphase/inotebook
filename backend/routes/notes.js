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
        const userNotes = await Note.find({user: userId}).sort({dateModified: -1});
        res.json({
            userNotes: userNotes,
            success: true
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error.",
            success: false
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
      return res.status(400).json({ 
        errors: errors.array(),
        success: false
      });
    }


    try {
        const userId = req.user.id;
        const {title, description, tag, colour, isPinned, dateCreated} = req.body;
        const userNote = await Note.create({user: userId, title, description, tag, colour, isPinned, dateCreated, dateModified: dateCreated});
        res.json({
            userNote: userNote,
            success: true
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error.",
            success: false
        })
    }
})


//ROUTE3: Update an existing note for a logged in user using a PUT request. Login is required.
router.put('/updatenote/:id', fetchUser, async(req, res)=>{

    const {title, description, tag, colour, isPinned} = req.body;

    

    try {
        const userId = req.user.id;
        const {title, description, tag, colour, isPinned} = req.body;

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

        newNote.isPinned = isPinned;

        newNote.dateModified = new Date();

        //find the Note to be updated. Check Permissions.
        const note = await Note.findById(req.params.id);
        if(!note){
            res.status(404).json({
                "error": "Note not found."  ,
                success: false
            })
        }

        if(userId !== note.user.toString()){
            res.status(401).json({
                "error": "Access Denied to Note.",
                success: false
            })
        }

        //Update the Note to be updated.
        const userNote = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true} );
        res.json({
            userNote: userNote,
            success: true
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error.",
            success: false
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
                "error": "Note not found.",
                success: false  
            })
        }

        if(userId !== note.user.toString()){
            res.status(401).json({
                "error": "Access Denied to Note.",
                success: false
            })
        }

        //Delete the Note to be deleted.
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        res.json({
            message: `Note with ${deletedNote._id} has been deleted.`,
            success: true,
            pinnedStatus: deletedNote.isPinned
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error.",
            success: false
        })
    }
})

module.exports = router;