import React, { useRef } from 'react';
import { ColourPicker } from './ColourPicker';

export const EditNoteModal = (props) => {
    const visToggle = useRef(null);
    const submitClickRef = useRef(null);
    const { theme, note, updateColour, handleSubmitClick, handleTextChange } = props;
    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={visToggle} data-bs-toggle="modal" data-bs-target="#exampleModal">
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

                                {/* for colour */}

                                <div className="mb-3 d-flex w-50 py-3">
                                    <label htmlFor="colour" className="form-label pe-3">Colour</label>
                                    {/* <input type="text" className="form-control" id="colour" name="colour" value={note.colour} onChange={handleTextChange}/> */}
                                    <ColourPicker updateColour={updateColour} mode={theme} />
                                </div>




                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={submitClickRef} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleSubmitClick(note)}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


