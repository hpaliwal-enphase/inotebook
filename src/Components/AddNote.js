import React, {useContext, useState} from 'react';
import NotesContext from '../context/notes/NoteContext';



const AddNote = () => {
    const context = useContext(NotesContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:"General"});
    const handleTextChange = (e) => {
        setNote(...note, [e.target.name]=e.target.value);
    }

    const handleSubmitClick = () =>{
        addNote(note.title, note.description, note.tag);
    }

    return (
        <div>
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={handleTextChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handleTextChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
