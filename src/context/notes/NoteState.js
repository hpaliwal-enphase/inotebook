import React, { useState, useContext, useEffect } from 'react';
import NotesContext from './NoteContext';
import AlertContext from '../alerts/AlertContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const pinnedNotesInitial = [];

    const [notes, setNotes] = useState(notesInitial);
    const [pinnedNotes, setPinnedNotes] = useState(pinnedNotesInitial);

    const alertContext = useContext(AlertContext);
    const {showAlert} = alertContext;

    useEffect(()=>{
        notes.sort((a, b)=>{
            const date1 = new Date(a.dateModified);
            const date2 = new Date(b.dateModified);
            
            if(date1 < date2){
                return 1;
            }
            else if(date1 > date2){
                return -1;
            }

            return 0;
        })

        // console.log("after sorting notes are: "+JSON.stringify(notes));
    }, []);

    useEffect(()=>{
        pinnedNotes.sort((a, b)=>{
            const date1 = new Date(a.dateModified);
            const date2 = new Date(b.dateModified);     
            if(date1 < date2){
                return 1;
            }
            else if(date1 > date2){
                return -1;
            }

            return 0;
        });
        // console.log("after sorting pinned notes are: "+JSON.stringify(pinnedNotes));
    }, []);

    //GET ALL NOTES
    const getAllNotes = async () => {
        const response = fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            }
        });

        response.then((responseData) => {
            return responseData.json();
        }).then((data) => {
            if(data.success){
                
                setNotes(data.userNotes.filter((note)=>{
                    return note.isPinned === false;
                }));

                setPinnedNotes(data.userNotes.filter((note)=>{
                    return note.isPinned === true;
                }));
                
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
        const data = { title, description, tag, colour, isPinned, dateCreated: new Date() };
        
        //API Call
        const response = fetch(`${host}/api/notes/addnote`, {
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
            console.log(data);
            if(data.success){
                setNotes([data.userNote].concat(notes));
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
                'auth-token': sessionStorage.getItem('token')
            }
        })

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {
            if(data.pinnedStatus){
                let newPinnedNotes = pinnedNotes.filter((note)=>{
                    return note._id !== id;
                });
                setPinnedNotes(newPinnedNotes)
            }
            else{
                let newNotes = notes.filter((note) => {
                    return note._id !== id;
                });
                setNotes(newNotes);
            }
        });

        

        
    }

    //EDIT A NOTE
    const editNote = (id, title, description, tag, colour, isPinned) => {
        console.log("editing note with id: " + id);

        const data = { title, description, tag, colour, isPinned, dateModified: new Date() };
        //API Call
        const response = fetch(`${host}/api/notes/updatenote/${id}`, {
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

            if(data.success){
                //logic to edit notes state in client side
                if(data.userNote.isPinned){

                    let pinnedNotesCopy = pinnedNotes.filter((note)=>{
                        return note._id !== id;
                    });

                    setPinnedNotes([data.userNote].concat(pinnedNotesCopy))
                    // for (let i = 0; i < pinnedNotes.length; i++) {
                    //     let element = pinnedNotes[i];
                    //     if (element._id === id) {
                    //         pinnedNotesCopy[i] = data.userNote;
                    //         break;
                    //     }
                    // }
                    // setPinnedNotes(pinnedNotesCopy);
                }
                else{
                    const notesCopy = notes.filter((note)=>{
                        return note._id !== id;
                    });
                    setNotes([data.userNote].concat(notesCopy));
                    // for (let i = 0; i < notes.length; i++) {
                    //     let element = notes[i];
                    //     if (element._id === id) {
                    //         notesCopy[i] = data.userNote;
                    //         break;
                    //     }
                    // }
                    // setNotes(notesCopy);
                }
                
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
                'auth-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify(dataPayload)
        });

        response.then((responseData) => {
            return (responseData.json());
        }).then((data) => {

            if(data.success){
                //logic to pin notes state in client side
                if(data.userNote.isPinned){
                    setPinnedNotes([data.userNote].concat(pinnedNotes));
                    let newNotes = notes.filter((note)=>{
                        return note._id !== id;
                    });
                    setNotes(newNotes);

                }
                else{
                    let newPinnedNotes = pinnedNotes.filter((note)=>{
                        return note._id !== id;
                    });
                    setPinnedNotes(newPinnedNotes);
                    setNotes([data.userNote].concat(notes));
                }
                
                
                showAlert("Pinning/Unpinning Successful", "success");
                console.log(pinnedNotes);
                console.log(notes);
            }
            else{
                showAlert("Note could not be pinned/unpinned", "danger");
            }
            
        });


    }

    return (
        <NotesContext.Provider value={{ notes, pinnedNotes, addNote, deleteNote, editNote, pinNote, getAllNotes }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState;