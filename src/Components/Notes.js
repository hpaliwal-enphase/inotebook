import React, { useContext, useEffect, useRef, useState } from 'react';
import AlertContext from '../context/alerts/AlertContext';
import NotesContext from '../context/notes/NoteContext';
import ThemeContext from '../context/theme/ThemeContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
import { ColourPicker } from './ColourPicker';

const Notes = () => {
    const context = useContext(NotesContext);
    const { notes, getAllNotes, editNote, pinNote } = context;

    const themeContext = useContext(ThemeContext);
    const { theme } = themeContext;

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes()
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "General", colour: "Blank", isPinned: false });

    const handleTextChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSubmitClick = (note) => {
        editNote(note.id, note.title, note.description, note.tag, note.colour, note.isPinned);
        ref2.current.click();
        setNote({ id: "", title: "", description: "", tag: "General", colour: "Blank", isPinned: false });
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ ...note, title: currentNote.title, description: currentNote.description, tag: currentNote.tag, id: currentNote._id, colour: currentNote.colour });
    }

    const updateColour = (colour) => {
        setNote({...note, colour: colour})
    }

    // const updatePinnedStatus = (note) =>{
    //     setNote({...note, isPinned: note.isPinned })
    // }

    const ref = useRef(null);
    const ref2 = useRef(null);

    return (
        <div className='row my-3' data-bs-theme={theme}>


            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Invisible Modal Trigger Button
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit a Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form style={theme === "dark" ? {color: "#ffffff"} : {color: "#212529"}}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" style={{color:'#000000'}} value={note.title} onChange={handleTextChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" style={{color:'#000000'}} value={note.description} onChange={handleTextChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" style={{color:'#000000'}} value={note.tag} onChange={handleTextChange} />
                                </div>

                                {/* for colour */}

                                <div className="mb-3 d-flex w-50 py-3">
                                    <label htmlFor="colour" className="form-label pe-3">Colour</label>
                                    {/* <input type="text" className="form-control" id="colour" name="colour" value={note.colour} onChange={handleTextChange}/> */}
                                    <ColourPicker updateColour={updateColour} mode={theme}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={ref2} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleSubmitClick(note)}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <AddNote />

            <div className='my-3 row'>
                <h2>Your Notes</h2>
                {notes.length === 0 ? 'No items to display' :
                    <>
                    {notes.map((note) => {
                        if(note.isPinned){
                            return (<NoteItem note={note} key={note._id} updateNote={updateNote}/>)
                        }
                    })}{notes.map((note) => {
                        if(!note.isPinned){
                            return (<NoteItem note={note} key={note._id} updateNote={updateNote}/>)
                        }
                    })}
                    </>
                }
            </div>

        </div>
    )
}

export default Notes
