import noteContext from './notesContext.js'
import React, { useState } from 'react'
import API from '../../Api.axios.js'


const Notestate = ({ children }) => {
  const keepnotes = []

  const [notes, setNotes] = useState(keepnotes)
  const [selectedNote, setSelectedNote] = useState(null)

  const fetchNotes = async () => {
    const res = await API.get("/Notes/notes", {
      headers: {
        "authorization": localStorage.getItem("token")
      },
      withCredentials: true
    });
    // console.log("Register response:", res.data);
    setNotes(res.data.data);
  }

  const addNotes = async (title, discription, tag) => {
    // console.log('notes created')
    const res = await API.post("/Notes/create", { title, discription, tag }, {
      headers: {
        "authorization": localStorage.getItem("token")
      },
      withCredentials: true
    });
    if (res.status !== 200) {
      // console.log("Register response:", res);
    }
    const note = {
      _id: res.data._id,
      user: res.data.user,
      title: title,
      discription: discription,
      tag: tag,
      date: res.data.date
    };

    setNotes(notes.concat(note));
  }

  const deleteNotes = async (id) => {
    // console.log('notes deleted ' + id)
    // console.log(id)
    const res = await API.delete(`/Notes/deletenote/${id}`, {
      headers: {
         "authorization": localStorage.getItem("token")
        },
      withCredentials: true
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })

    setNotes(newNotes);
  }

  const editNotes = async (id, title, discription, tag) => {
    const res = await API.put( `/Notes/updateNote/${id}`, { title, discription, tag }, 
      {
        headers: {
          "authorization": localStorage.getItem("token")
        },
        withCredentials: true
      }
    );
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.discription = discription;
        element.tag = tag;
      }
    }
  }

  const OpenNote = (id) => {
    const note = notes.find((note) => note._id === id);
    return note;
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNotes, deleteNotes, editNotes, fetchNotes, OpenNote, selectedNote, setSelectedNote }} >
      {children}
    </noteContext.Provider>
  )
}

export default Notestate
