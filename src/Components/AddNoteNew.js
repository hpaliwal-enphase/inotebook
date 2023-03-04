import React from 'react';
import "../App.css";

const AddNoteNew = (props) => {
  return (
        <div className="col-md-3">
            <div className="card my-3 shadow carditem bg-grey" style={{opacity: '40%'}}>
                <div className="card-body my-3">
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <i className="fa-regular fa-square-plus m-2" style={{fontSize: '45px', color:'#B0B0B0'}} onClick={()=>{props.addNewNote()}}></i>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddNoteNew;
