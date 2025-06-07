import React, { useContext } from 'react';
import noteContext from "../context/NotesContexts/notesContext.js";

const PopCard = () => {
  const { selectedNote, setSelectedNote } = useContext(noteContext);

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md relative border border-blue-200">

        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition duration-300 text-xl"
          onClick={() => setSelectedNote(null)}
        >
          ❌
        </button>

        <h2 className="text-3xl font-extrabold text-blue-700 mb-4 border-b pb-2">
          {selectedNote.title}
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
          {selectedNote.discription}
        </p>

        <p className="text-sm text-blue-500 font-medium">
          <span className="font-semibold text-gray-800">Tag:</span> {selectedNote.tag}
        </p>
      </div>
    </div>
  );
};

export default PopCard;
