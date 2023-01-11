import React, { useState } from 'react';
import NotesContext from './NoteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);


    //GET ALL NOTES
    const getAllNotes = async () => {
        const response = fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGQ5NmVkMzNmY2JjY2JkYmRlN2EyIn0sImlhdCI6MTY3MjMzNzc5OH0.X8PKoknQDycE00akfCnADyKTZiet-Z4kdcI3XWel07M'
            }
        });

        response.then((responseData) => {
            return responseData.json();
        }).then((data) => {
            setNotes(data);
        })

    }

    //ADD A NOTE
    const addNote = (title, description, tag) => {
        console.log("adding a new note with tag");
        const data = { title, description, tag };
        //API Call
        const response = fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGQ5NmVkMzNmY2JjY2JkYmRlN2EyIn0sImlhdCI6MTY3MjMzNzc5OH0.X8PKoknQDycE00akfCnADyKTZiet-Z4kdcI3XWel07M'
            },
            body: JSON.stringify(data)
        })

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {
            setNotes(notes.concat(data));
        });
    }

    //DELETE A NOTE
    const deleteNote = (id) => {
        //api call
        const response = fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGQ5NmVkMzNmY2JjY2JkYmRlN2EyIn0sImlhdCI6MTY3MjMzNzc5OH0.X8PKoknQDycE00akfCnADyKTZiet-Z4kdcI3XWel07M'
            }
        })

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {
        });


        let newNotes = notes.filter((note) => {
            return note._id !== id;
        })

        setNotes(newNotes);
    }

    //EDIT A NOTE
    const editNote = (id, title, description, tag) => {
        console.log("editing note with id: " + id);

        const data = { title, description, tag };
        //API Call
        const response = fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGQ5NmVkMzNmY2JjY2JkYmRlN2EyIn0sImlhdCI6MTY3MjMzNzc5OH0.X8PKoknQDycE00akfCnADyKTZiet-Z4kdcI3XWel07M'
            },
            body: JSON.stringify(data)
        });

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {


            //logic to edit notes state in client side
            const notesCopy = JSON.parse(JSON.stringify(notes));
            for (let i = 0; i < notes.length; i++) {
                let element = notes[i];
                if (element._id === id) {
                    notesCopy[i] = data;
                    break;
                }
            }
            setNotes(notesCopy);
        });


    }

    return (
        <NotesContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState;