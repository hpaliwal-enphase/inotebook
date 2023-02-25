import React, {useContext, useState} from 'react';
import AlertContext from '../context/alerts/AlertContext';
import NotesContext from '../context/notes/NoteContext';
import { ColourPicker } from './ColourPicker';


const AddNote = () => {
    const context = useContext(NotesContext);
    const alertContext = useContext(AlertContext);
    const {addNote} = context;
    const {showAlert} = alertContext;

    const [note, setNote] = useState({title:"", description:"", tag:"", colour:"Blank"});

    const handleTextChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    const updateColour = (colour) => {
        setNote({...note, colour: colour})
    }

    const handleSubmitClick = (e) =>{
        e.preventDefault();
        console.log(note.tag);
        if(note.tag === ""){
            addNote(note.title, note.description, "General");
        }
        else{
            addNote(note.title, note.description, note.tag, note.colour);
        }
        setNote({title:"", description:"", tag:"", colour:"Blank"});
        showAlert("Note Added Successfully", "success");
    }

    return (
        <div>
            <h2>Add a Note</h2>
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
                {/* for colour */}
                <div className="mb-3 d-flex w-50 py-3">
                    <label htmlFor="colour" className="form-label pe-3">Colour</label>
                    {/* <input type="text" className="form-control" id="colour" name="colour" value={note.colour} onChange={handleTextChange}/> */}
                    <ColourPicker updateColour={updateColour}/>
                </div>


                <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
