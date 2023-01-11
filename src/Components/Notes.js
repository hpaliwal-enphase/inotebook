import React, { useContext, useEffect, useRef, useState } from 'react';
import AlertContext from '../context/alerts/AlertContext';
import NotesContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NotesContext);
    const { notes, getAllNotes, editNote } = context;

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext; 

    useEffect(() => {
        getAllNotes()
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({id: "", title:"", description:"", tag:"General"});

    const handleTextChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    const handleSubmitClick = (note) =>{
        editNote(note.id, note.title, note.description, note.tag);
        ref2.current.click();
        setNote({id: "", title:"", description:"", tag:"General"});
        showAlert("Note Edited Successfully", 'success');
    }

    const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({...note, title: currentNote.title, description: currentNote.description, tag: currentNote.tag, id: currentNote._id});
    }

    const ref = useRef(null);
    const ref2 = useRef(null);

    return (
        <div className='row my-3'>

            
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Invisible Modal Trigger Button
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit a Note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleTextChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleTextChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleTextChange}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" ref={ref2} data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={()=>handleSubmitClick(note)}>Update Note</button>
                </div>
                </div>
            </div>
            </div>


            <AddNote />

            <div className='my-3 row'>
                <h2>Your Notes</h2>
            {notes.length===0 ? 'No items to display' : 
                notes.map((note) => {
                    return (<NoteItem note={note} key={note._id} updateNote={updateNote} />)
                })
            }
            </div>

        </div>
    )
}

export default Notes
