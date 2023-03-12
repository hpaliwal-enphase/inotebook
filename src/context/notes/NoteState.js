import React, { useState, useContext } from 'react';
import NotesContext from './NoteContext';
import AlertContext from '../alerts/AlertContext';
import Heap from '../../Utils/Heap';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = new Heap((a, b) => b.title - a.title);
    const pinnedNotesInitial = new Heap((a, b) => b.title - a.title);


    const [notes, setNotes] = useState(notesInitial);
    const [pinnedNotes, setPinnedNotes] = useState(pinnedNotesInitial);

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;


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
            if (data.success) {
                // setNotes(data.userNotes);
                let tempHeap = new Heap((a, b) => b.title - a.title);
                let pinnedTempNotes = new Heap((a, b) => b.title - a.title);
                for (let note in data.userNotes) {
                    if (!note.isPinned) {
                        tempHeap.add(note);
                    }
                    else {
                        pinnedTempNotes.add(note);
                    }
                }
                setNotes(tempHeap);
                setPinnedNotes(pinnedTempNotes);
            }
            else {
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
            if (data.success) {
                let tempHeap = notes;
                tempHeap.add(data.userNote);
                setNotes(tempHeap);
                showAlert("Note Added Successfully", "success");
            }
            else {
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

            if (data.note.isPinned) {
                let pinnedTempNotes = pinnedNotes;
                let pinnedTempHeap2 = new Heap((a, b) => b.title - a.title);

                while (pinnedTempNotes.size() > 0 && pinnedTempNotes.peek()._id !== id) {
                    pinnedTempHeap2.add(pinnedTempNotes.poll());
                }

                if (pinnedTempNotes._id === id) {
                    pinnedTempNotes.poll();
                }

                while (pinnedTempHeap2.size() > 0) {
                    pinnedTempNotes.add(pinnedTempHeap2.poll());
                }

                setPinnedNotes(pinnedTempNotes);
            }

            else {
                let tempHeap = notes;
                let tempHeap2 = new Heap((a, b) => b.title - a.title);

                while (tempHeap.size() > 0 && tempHeap.peek()._id !== id) {
                    tempHeap2.add(tempHeap.poll());
                }

                if (tempHeap._id === id) {
                    tempHeap.poll();
                }

                while (tempHeap2.size() > 0) {
                    tempHeap.add(tempHeap2.poll());
                }

                setNotes(tempHeap);
            }


            // let newNotes = notes.filter((note) => {
            //     return note._id !== id;
            // })


        });


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

            if (data.success) {
                //logic to edit notes state in client side
                const notesCopy = JSON.parse(JSON.stringify(notes));
                // for (let i = 0; i < notes.length; i++) {
                //     let element = notes[i];
                //     if (element._id === id) {
                //         notesCopy[i] = data.userNote;
                //         break;
                //     }
                // }

                if (!data.userNote.isPinned) {
                    let pinnedTempHeap = pinnedNotes;
                    let pinnedTempHeap2 = new Heap((a, b) => b.title - a.title);

                    while (pinnedTempHeap.size() > 0 && pinnedTempHeap.peek()._id !== id) {
                        pinnedTempHeap2.add(pinnedTempHeap.poll());
                    }

                    if (pinnedTempHeap._id === id) {
                        let editableNote = pinnedTempHeap.poll();
                        editableNote = data.userNote;
                        pinnedTempHeap.add(editableNote);
                    }

                    while (pinnedTempHeap2.size() > 0) {
                        pinnedTempHeap.add(pinnedTempHeap2.poll());
                    }

                    // setNotes(notesCopy);
                    setPinnedNotes(pinnedTempHeap);
                }
                else{
                    let tempHeap = notes;
                    let tempHeap2 = new Heap((a, b) => b.title - a.title);

                    while (tempHeap.size() > 0 && tempHeap.peek()._id !== id) {
                        tempHeap2.add(tempHeap.poll());
                    }

                    if (tempHeap._id === id) {
                        let editableNote = tempHeap.poll();
                        editableNote = data.userNote;
                        tempHeap.add(editableNote);
                    }

                    while (tempHeap2.size() > 0) {
                        tempHeap.add(tempHeap2.poll());
                    }

                    // setNotes(notesCopy);
                    setNotes(tempHeap);
                }


                showAlert("Note Edited Successfully", "success");
            }
            else {
                // showAlert("Boilerplate Error Msg");
                showAlert("Note could not be edited", "danger");
            }

        });
    }

    const pinNote = (note) => {
        const { title, description, tag, colour } = note;
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

            if (data.success) {
                //logic to pin notes state in client side
                const notesCopy = JSON.parse(JSON.stringify(notes));
                notes.forEach((note, idx) => {
                    if (note._id === id) {
                        notesCopy.splice(idx, 1);
                        if (isPinned) {
                            notesCopy.unshift(dataPayload);
                            return;
                        }
                        else {
                            notesCopy.push(dataPayload);
                            return;
                        }
                    }
                })

                setNotes(notesCopy);
                showAlert("Pinning/Unpinning Successful", "success");
                console.log(notes)
            }
            else {
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