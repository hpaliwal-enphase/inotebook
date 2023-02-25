import React, {useContext} from 'react';
import NotesContext from '../context/notes/NoteContext';
import AlertContext from '../context/alerts/AlertContext';

const NoteItem = (props) => {
    const context = useContext(NotesContext);
    const {deleteNote} = context;
    const { note, updateNote } = props;

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext; 

    
    return (
        <div className="col-md-3">
            <div className="card my-3 border border-light border-2" style={{backgroundColor:`${note.colour}`}}>
                <div className="card-body my-3">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <div className="flex">
                        <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); showAlert("Note Deleted Successfully", "success")}}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
