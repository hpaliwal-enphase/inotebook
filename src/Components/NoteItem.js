import React, {useContext} from 'react';
import NotesContext from '../context/notes/NoteContext';
import AlertContext from '../context/alerts/AlertContext';

const NoteItem = (props) => {
    const context = useContext(NotesContext);
    const {deleteNote, pinNote} = context;
    const { note, updateNote, updatePinnedStatus } = props;

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext; 

    const handlePinClick = (note) =>{
        // updatePinnedStatus({...note, isPinned: !note.isPinned});
        pinNote(note);
    }
    
    return (
        <div className="col-md-3">
            <div className="card my-3 shadow" style={{backgroundColor:`${note.colour}`}}>
                <div className="card-body my-3">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <i className={`fa-${note.isPinned ? `solid` : `regular`} fa-hand`} onClick={()=>handlePinClick(note)}></i>
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    
                    {/* for isPinned */}
                    {/* <p className="card-text">{JSON.stringify(note.isPinned)}</p> */}

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
