import React, {useContext} from 'react';
import NotesContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NotesContext);
    const { notes, setNotes } = context;
    return (
        <div className='row my-3'>
            <AddNote/>

            <div className='my-3'>
                <h2>Your Notes</h2>
            </div>
            {
                notes.map((note) => {
                    return (<NoteItem note={note}/>)
                })
            }
            
        </div>
    )
}

export default Notes
