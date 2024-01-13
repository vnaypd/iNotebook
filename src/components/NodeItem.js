import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NodeItem = (props) => {
     const context = useContext(noteContext);
     const { deleteNote } = context;
     const { note, updateNote } = props;
     return (
          <div className="col-md-3 my-3">
               <div className="card" >
                    <div className="card-body align-items-center">
                         <div className="d-flex">
                              <h5 className="card-title"> {note.title}</h5>
                              <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Notes deleted sucessfully", "success") }} ></i>
                              <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                         </div>
                         <p className="card-text">{note.description}</p>
                    </div>
               </div>
          </div>
     )
}

export default NodeItem
