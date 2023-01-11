import React, {useContext, useState} from 'react';
import AlertContext from '../context/alerts/AlertContext';
import NotesContext from '../context/notes/NoteContext';



const AddNote = () => {
    const context = useContext(NotesContext);
    const alertContext = useContext(AlertContext);
    const {addNote} = context;
    const {showAlert} = alertContext;

    const [note, setNote] = useState({title:"", description:"", tag:""});

    const handleTextChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    const handleSubmitClick = (e) =>{
        e.preventDefault();
        console.log(note.tag);
        if(note.tag === ""){
            addNote(note.title, note.description, "General");
        }
        else{
            addNote(note.title, note.description, note.tag);
        }
        setNote({title:"", description:"", tag:""});
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
                <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
