import React, { useContext, useEffect, useRef, useState } from 'react';
import NotesContext from '../context/notes/NoteContext';
import ThemeContext from '../context/theme/ThemeContext';
import AddNoteNew from './AddNoteNew';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
import { ColourPicker } from './ColourPicker';

const Notes = () => {
    const context = useContext(NotesContext);
    const { notes, getAllNotes, editNote, addNote } = context;

    const themeContext = useContext(ThemeContext);
    const { theme } = themeContext;

    const navigate = useNavigate();
    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('userDetails'))) {
            getAllNotes()
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "General", colour: "white", isPinned: false });
    const [addingNewNote, setAddingNewNote] = useState(false);

    const handleTextChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSubmitClick = (note) => {
        if (addingNewNote) {
            addNote(note.title, note.description, note.tag, note.colour, note.isPinned);
            setAddingNewNote(false);
        }
        else {
            editNote(note.id, note.title, note.description, note.tag, note.colour, note.isPinned);
        }
        addNewNoteCloseButtonRef.current.click();
        setNote({ id: "", title: "", description: "", tag: "General", colour: "white", isPinned: false });
    }

    const updateNote = (currentNote) => {
        setAddingNewNote(false);
        addNewNoteButtonRef.current.click();
        setNote({ ...note, title: currentNote.title, description: currentNote.description, tag: currentNote.tag, id: currentNote._id, colour: currentNote.colour, isPinned: currentNote.isPinned });
    }

    const updateColour = (colour) => {
        setNote({ ...note, colour: colour })
    }

    const addNewNote = () => {
        addNewNoteButtonRef.current.click();
        setAddingNewNote(true);
    }

    const addNewNoteButtonRef = useRef(null);
    const addNewNoteCloseButtonRef = useRef(null);

    return (
        <div className='row my-3' data-bs-theme={theme}>

            <button type="button" className="btn btn-primary d-none" ref={addNewNoteButtonRef} data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                            <form style={theme === "dark" ? { color: "#ffffff" } : { color: "#212529" }} data-bs-theme={theme}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className={`form-control${theme === "dark" ? ' bg-dark' : ''}`} id="title" name="title" value={note.title} onChange={handleTextChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className={`form-control${theme === "dark" ? ' bg-dark' : ''}`} id="description" name="description" value={note.description} onChange={handleTextChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className={`form-control${theme === "dark" ? ' bg-dark' : ''}`} id="tag" name="tag" value={note.tag} onChange={handleTextChange} />
                                </div>

                                <div className="mb-3 d-flex w-50 py-3">
                                    <label htmlFor="colour" className="form-label pe-3">Colour</label>
                                    <ColourPicker updateColour={updateColour} mode={theme} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={addNewNoteCloseButtonRef} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleSubmitClick(note)}>{addingNewNote ? `Add Note` : `Update Note`}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-3 row'>
                <h2>Your Notes</h2>
                <AddNoteNew addNewNote={addNewNote} />
                {notes.length >= 0 &&
                    <>
                        {notes.map((note) => {
                            return (<NoteItem note={note} key={note._id} updateNote={updateNote} />)
                        })}
                    </>
                }
            </div>

        </div>
    )
}

export default Notes
