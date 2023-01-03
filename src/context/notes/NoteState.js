import React, { useState } from 'react';
import NotesContext from './NoteContext';

const NoteState = (props) =>{
    const notesInitial= [
        {
            "_id": "63ae8c94521ed691e00cf7d2",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note",
            "description": "XYZXYZXYZ",
            "tag": "General",
            "__v": 0
        },
        {
            "_id": "63b33226a29cf7237b2bda07",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note 2",
            "description": "XYZXYZXYZXYZ",
            "tag": "Temporary",
            "__v": 0
        },
        {
            "_id": "63ae3c94521ed691e00cf7d2",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note",
            "description": "XYZXYZXYZ",
            "tag": "General",
            "__v": 0
        },
        {
            "_id": "63b33214a29cf7237b2bda07",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note 2",
            "description": "XYZXYZXYZXYZ",
            "tag": "Temporary",
            "__v": 0
        },{
            "_id": "63ae8c95521ed691e00cf7d2",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note",
            "description": "XYZXYZXYZ",
            "tag": "General",
            "__v": 0
        },
        {
            "_id": "63b33216629cf7237b2bda07",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note 2",
            "description": "XYZXYZXYZXYZ",
            "tag": "Temporary",
            "__v": 0
        },{
            "_id": "63ae8c94521ed691700cf7d2",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note",
            "description": "XYZXYZXYZ",
            "tag": "General",
            "__v": 0
        },
        {
            "_id": "63b33216a29cf7837b2bda07",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note 2",
            "description": "XYZXYZXYZXYZ",
            "tag": "Temporary",
            "__v": 0
        },{
            "_id": "63ae8c94521ed699e00cf7d2",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note",
            "description": "XYZXYZXYZ",
            "tag": "General",
            "__v": 0
        },
        {
            "_id": "63b33216129cf7237b2bda07",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note 2",
            "description": "XYZXYZXYZXYZ",
            "tag": "Temporary",
            "__v": 0
        },{
            "_id": "63ae8c94521ed611e00cf7d2",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note",
            "description": "XYZXYZXYZ",
            "tag": "General",
            "__v": 0
        },
        {
            "_id": "63b33216a29cf7237b21da07",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": "My Gen Note 2",
            "description": "XYZXYZXYZXYZ",
            "tag": "Temporary",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    //ADD A NOTE
    const addNote = (title, description, tag) => {
        console.log("adding a new note");
        const note = {
            "_id": "83ae8c94521e1691e00cf7d2",
            "user": "63add96ed33fcbccbdbde7a2",
            "title": title,
            "description": description,
            "tag": tag,
            "__v": 0
        }

        setNotes(notes.concat(note));
    }

    //DELETE A NOTE
    const deleteNote = () => {
        
    }

    //EDIT A NOTE
    const editNote = () => {
        
    }
    
    return(
    <NotesContext.Provider value={{notes, addNote, deleteNote, editNote}}>
        {props.children}
    </NotesContext.Provider>
    )
}

export default NoteState;