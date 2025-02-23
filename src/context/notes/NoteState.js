import React, { useState, useContext, useEffect } from 'react';
import NotesContext from './NoteContext';
import AlertContext from '../alerts/AlertContext';
import { getOrderedNotes } from '../../Utils/getOrderedNotes';

const NoteState = (props) => {
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    useEffect(() => {
        getOrderedNotes(notes);
    }, [notes]);

    //GET ALL NOTES
    const getAllNotes = async () => {
        const response = fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            }
        });

        response.then((responseData) => {
            return responseData.json();
        }).then((data) => {
            if (data.success) {
                setNotes(getOrderedNotes(data.userNotes));
            }
            else {
                showAlert("Note could not be fetched", "danger");
            }
        })

    }

    //ADD A NOTE
    const addNote = (title, description, tag, colour, isPinned) => {
        const data = { title, description, tag, colour, isPinned, dateCreated: new Date() };

        //API Call
        const response = fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {
            if (data.success) {
                setNotes(getOrderedNotes(notes, data.userNote));
                showAlert("Note Added Successfully", "success");
            }
            else {
                showAlert("Note could not be added", "danger");
            }

        });
    }

    //DELETE A NOTE
    const deleteNote = (id) => {
        //api call
        const response = fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            }
        })

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {
            const newNotes = notes.filter((note) => {
                return note._id !== id;
            });
            setNotes(newNotes);
        });
    }

    //EDIT A NOTE
    const editNote = (id, title, description, tag, colour, isPinned) => {

        const data = { title, description, tag, colour, isPinned, dateModified: new Date() };
        //API Call
        const response = fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {
            if (data.success) {
                // logic to edit notes state in client side
                const notesCopy = notes.filter((note) => {
                    return note._id !== id;
                });

                setNotes(getOrderedNotes(notesCopy, data.userNote));
                showAlert("Note Edited Successfully", "success");
            }
            else {
                showAlert("Note could not be edited", "danger");
            }
        });
    }

    const pinNote = (note) => {
        const { title, description, tag, colour } = note;
        const id = note._id;
        const isPinned = !note.isPinned;


        const dataPayload = { _id: id, title, description, tag, colour, isPinned: isPinned };

        // API Call
        const response = fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify(dataPayload)
        });

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {

            if (data.success) {
                //logic to pin notes state in client side
                const notesCopy = notes.filter((note) => {
                    return note._id !== id;
                });
                setNotes(getOrderedNotes(notesCopy, data.userNote));
                showAlert("Pinning/Unpinning Successful", "success");
            }
            else {
                showAlert("Note could not be pinned/unpinned", "danger");
            }
        });


    }

    return (
        <NotesContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, pinNote, getAllNotes }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState;