import React, { useState, useContext } from 'react';
import NotesContext from './NoteContext';
import AlertContext from '../alerts/AlertContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    const alertContext = useContext(AlertContext);
    const {showAlert} = alertContext;


    //GET ALL NOTES
    const getAllNotes = async () => {
        const response = fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        response.then((responseData) => {
            return responseData.json();
        }).then((data) => {
            if(data.success){
                setNotes(data.userNotes);
            }
            else{
                // showAlert("Boilerplate Error Msg");
                showAlert("Note could not be fetched", "danger");
            }
        })

    }

    //ADD A NOTE
    const addNote = (title, description, tag, colour, isPinned) => {
        console.log("adding a new note with tag");
        const data = { title, description, tag, colour, isPinned };
        //API Call
        const response = fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {
            console.log(data);
            if(data.success){
                setNotes(notes.concat(data.userNote));
                showAlert("Note Added Successfully", "success");
            }
            else{
                // showAlert("Boilerplate Error Msg");
                showAlert("Note could not be added", "danger");
            }
            
        });
    }

    //DELETE A NOTE
    const deleteNote = (id) => {
        //api call
        const response = fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
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
    const editNote = (id, title, description, tag, colour, isPinned) => {
        console.log("editing note with id: " + id);

        const data = { title, description, tag, colour, isPinned };
        //API Call
        const response = fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {

            if(data.success){
                //logic to edit notes state in client side
                const notesCopy = JSON.parse(JSON.stringify(notes));
                for (let i = 0; i < notes.length; i++) {
                    let element = notes[i];
                    if (element._id === id) {
                        notesCopy[i] = data.userNote;
                        break;
                    }
                }
                setNotes(notesCopy);
                showAlert("Note Edited Successfully", "success");
            }
            else{
                // showAlert("Boilerplate Error Msg");
                showAlert("Note could not be edited", "danger");
            }

        });
    }

    const pinNote = (note) => {
        const {title, description, tag, colour} = note;
        const id = note._id;
        const isPinned = !note.isPinned;
        console.log("pinning note with id: " + id);
        

        const dataPayload = { _id: id, title, description, tag, colour, isPinned: isPinned };
        console.log("pinning note " + JSON.stringify(dataPayload));
        //API Call
        const response = fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(dataPayload)
        });

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {

            if(data.success){
                //logic to pin notes state in client side
                const notesCopy = JSON.parse(JSON.stringify(notes));
                notes.forEach((note, idx) => {
                    if(note._id === id){
                        notesCopy.splice(idx,1);
                        if(isPinned){
                            notesCopy.unshift(dataPayload);
                            return;
                        }
                        else{
                            notesCopy.push(dataPayload);
                            return;
                        }
                    }
                })

                setNotes(notesCopy);
                showAlert("Pinning/Unpinning Successful", "success");
                console.log(notes)
            }
            else{
                showAlert("Note could not be pinned/unpinned", "danger");
            }

            
            
        });


    }

    return (
        <NotesContext.Provider value={{ notes, addNote, deleteNote, editNote, pinNote, getAllNotes }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState;