import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
     const context = useContext(noteContext);
     const { addNote } = context
     const [note, setNote] = useState({ title: "", description: "", tag: "" })

     const handleClick = (e) => {
          e.preventDefault()
          addNote(note.title, note.description, note.tag)
          setNote({ title: "", description: "", tag: "" })
          props.showAlert("Notes ADDED sucessfully", "success")
     }

     const onChange = (e) => {
          setNote({ ...note, [e.target.name]: e.target.value })
     }

     return (
          <div>
               <div className="container my-3">
                    <h1>Add a note</h1>
                    <form className='container my-3'>
                         <div className="form-group">
                              <label >Title</label>
                              <input type="email" className="form-control my-3" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.title} />
                         </div>
                         <div className="form-group">
                              <label >Description</label>
                              <input type="text" className="form-control my-3" id="description" name="description" onChange={onChange} minLength={5} required value={note.description} />
                         </div>
                         <div className="form-group">
                              <label >Tag</label>
                              <input type="text" className="form-control my-3" id="tag" name="tag" onChange={onChange} minLength={5} required value={note.tag} />
                         </div>
                         <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
                    </form>
               </div>
          </div>
     )
}
export default AddNote
