import React, {useContext, useState} from 'react';
import NotesContext from '../context/notes/NoteContext';
import ThemeContext from '../context/theme/ThemeContext';
import { ColourPicker } from './ColourPicker';


const AddNote = () => {
    const context = useContext(NotesContext);
    const {addNote} = context;

    const themeContext = useContext(ThemeContext);
    const { theme } = themeContext;

    const [note, setNote] = useState({title:"", description:"", tag:"", colour:"Blank", isPinned: false});

    const handleTextChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    const updateColour = (colour) => {
        setNote({...note, colour: colour})
    }


    const handleSubmitClick = (e) =>{
        e.preventDefault();
        // console.log(note.tag);

        if(note.tag === ""){
            addNote(note.title, note.description, "General", note.colour, false);
        }
        else{
            addNote(note.title, note.description, note.tag, note.colour, false);
        }
        setNote({title:"", description:"", tag:"", colour:"Blank", isPinned: false });
        
    }

    return (
        <div data-bs-theme={theme} >
            <h2>Add a Note</h2>
            <form data-bs-theme={theme} style={theme === "dark" ? {color: "#ffffff"} : {color: "#212529"}}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className={`form-control${theme === "dark" ? ' bg-dark' : ''}`} id="title" name="title" value={note.title} onChange={handleTextChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className={`form-control${theme === "dark" ? ' bg-dark' : ''}`} id="description" name="description" value={note.description} onChange={handleTextChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className={`form-control${theme === "dark" ? ' bg-dark' : ''}`} id="tag" name="tag" value={note.tag} onChange={handleTextChange}/>
                </div>
                {/* for colour */}
                <div className="mb-3 d-flex w-75 py-3">
                    <label htmlFor="colour" className="form-label pe-3">Colour</label>
                    {/* <input type="text" className="form-control" id="colour" name="colour" value={note.colour} onChange={handleTextChange}/> */}
                    <ColourPicker updateColour={updateColour} mode={theme}/>
                </div>


                <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
