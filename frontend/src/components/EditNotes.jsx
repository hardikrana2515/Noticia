import React, { useContext, useEffect, useState } from 'react';
import noteContext from "../context/NotesContexts/notesContext.js";

const EditNotes = () => {
    const { selectedNote, setSelectedNote,editNotes} = useContext(noteContext);

    const [editNote, setEditNote] = useState({
        title: '',
        discription: '',
        tag: ''
    });

   
    useEffect(() => {
        if (selectedNote) {
            setEditNote({
                title: selectedNote.title || '',
                discription: selectedNote.discription || '',
                tag: selectedNote.tag || ''
            });
        }
    }, [selectedNote]);

    const handleChange = (e) => {
        setEditNote({ ...editNote, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Note updated:", editNote);
         setSelectedNote(null)
    };

    return (
       <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center z-50">
  <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10 tracking-wide drop-shadow-sm">
    Edit Note
  </h1>

  <form
    onSubmit={handleSubmit}
    className="w-full max-w-2xl bg-white border border-blue-300 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-blue-300 relative"
  >
    
    <div className="mb-6">
      <label htmlFor="title" className="block text-blue-800 font-semibold mb-2 tracking-wide">
        Title
      </label>
      <input
        value={editNote.title}
        onChange={handleChange}
        type="text"
        id="title"
        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
      />
    </div>

    <div className="mb-6">
      <label htmlFor="discription" className="block text-blue-800 font-semibold mb-2 tracking-wide">
        Description
      </label>
      <textarea
        value={editNote.discription}
        onChange={handleChange}
        id="discription"
        rows="4"
        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
      ></textarea>
    </div>

    <div className="mb-6">
      <label htmlFor="tag" className="block text-blue-800 font-semibold mb-2 tracking-wide">
        Tag
      </label>
      <input
        value={editNote.tag}
        onChange={handleChange}
        type="text"
        id="tag"
        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg tracking-wider"
      onClick={()=>{editNotes(selectedNote._id, editNote.title, editNote.discription, editNote.tag)}}
    >
      Save Changes
    </button>
  </form>
</div>

    );
};

export default EditNotes;
