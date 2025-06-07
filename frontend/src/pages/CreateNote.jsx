import React, { use, useContext, useState } from 'react';
import noteContext from '../context/NotesContexts/notesContext';
import Alertmessage from '../components/Alertmessage';

const CreateNote = () => {
  const { addNotes } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", discription: "", tag: "defaulte" });
  const [btn, setBtn] = useState("Create Note" );

   const [message, setMessage] = useState("");
   const [head, setHead] = useState("");

  const onchange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });

  };

  const alertM = (msg , head)=>{
        setMessage(msg);
        setHead(head);
       
        setTimeout(() => {
            setMessage("");
            setHead("");
        }, 1000);
    }

  const onclick = (e) => {
    
    e.preventDefault();
    addNotes(note.title, note.discription, note.tag);
    // console.log(note);
    alertM("Note Created Successfully","Success");
    setNote({ title: "", discription: "", tag: "" });
  };

  const desable = note.title.length < 3 || note.discription.length < 10;

  const BtnClass = () => {
    return desable ?  "cursor-not-allowed w-full bg-blue-300 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg tracking-wider" : "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg tracking-wider" ;
  }


  return (
    <div className="flex flex-col items-center justify-start bg-gradient-to-b from-blue-100 to-blue-100 min-h-screen py-5 px-4">
      
      <h1 className="text-4xl font-extrabold text-blue-800 mb-10 tracking-wide drop-shadow-sm">
        Create a New Note
      </h1>

      <form className="w-full max-w-2xl bg-white border border-blue-300 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-blue-300">

        <div className="mb-6">
          <label htmlFor="title" className="block text-blue-800 font-semibold mb-2 tracking-wide" >
            Title
          </label>
          <input
            type="text"
            value={note.title}
            id="title"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
            placeholder="e.g. Shopping list, Meeting notes..."
            onChange={onchange}
            required
            minLength={3}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="discription" className="block text-blue-800 font-semibold mb-2 tracking-wide">
            Content
          </label>
          <textarea
            id="discription"
            value={note.discription}
            rows="6"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm resize-none"
            placeholder="Start typing your note here..."
            onChange={onchange}
            required
            minLength={8}
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="tag" className="block text-blue-800 font-semibold mb-2 tracking-wide">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            value={note.tag}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
            placeholder="#work #personal #inspiration"
            onChange={onchange}
          />
        </div>

        <button
          type="submit"
          onClick={onclick}
          disabled={desable}
          className={BtnClass()}

        >
          Create Note
        </button>
      </form>
      {message && <Alertmessage message={message} head={head} />}
    </div>
  );
};

export default CreateNote;
