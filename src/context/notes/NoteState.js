import React, { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState = (props) => {
     const host = "http://localhost:5000"
     const notesInitial = []
     const [notes, setNotes] = useState(notesInitial)

     const getNotes = async () => {
          // API Call 
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
               },
          })
          const json = await response.json()
          console.log(json)
          setNotes(json)
     }

     const deleteNote = async (id) => {
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
               method: 'DELETE',
               headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
               },
          })
          const json = response.json();
          console.log(json)
          console.log("Deleting the note with id" + id);
          const newNotes = notes.filter((note) => { return note._id !== id })
          setNotes(newNotes)
     }

     const addNote = async (title, description, tag) => {
          const response = await fetch(`${host}/api/notes/addnote`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
               },
               body: JSON.stringify({ title, description, tag })
          })
          const note = await response.json();
          setNotes(notes.concat(note))
     }

     const editNote = async (id, title, description, tag) => {
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
               method: 'PUT',
               headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
               },
               body: JSON.stringify({ title, description, tag })
          })
          const json = await response.json();
          console.log(json)

          let newNotes = JSON.parse(JSON.stringify(notes))

          for (let index = 0; index < newNotes.length; index++) {
               const element = newNotes[index]
               if (element._id === id) {
                    element.title = title
                    element.description = description
                    element.tag = tag
               }
          }
          setNotes(newNotes);
     }

     return (
          <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
               {props.children}
          </NoteContext.Provider >
     )
}

export default NoteState