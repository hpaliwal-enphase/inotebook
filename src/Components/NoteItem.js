import React from 'react'

const NoteItem = (props) => {
    const {note} = props;
  return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body my-3">
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                <p className="card-text">{note.description}</p>
                <div className="flex">
                    <i className="fa-regular fa-trash-can mx-2"></i>
                    <i className="fa-regular fa-pen-to-square mx-2"></i>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default NoteItem;
