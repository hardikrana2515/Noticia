import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/NotesContexts/notesContext";
import Alertmessage from "../components/Alertmessage";

const CreateNote = () => {
  const navigate = useNavigate();
  const { addNotes } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", discription: "", tag: "General" });
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", head: "", isError: false });

  const onchange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  const showAlert = (message, head, isError = false) => {
    setAlert({ show: true, message, head, isError });
    setTimeout(() => {
      setAlert({ show: false, message: "", head: "", isError: false });
    }, 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note.title.trim().length < 3 || note.discription.trim().length < 5) {
      showAlert(
        "Title must be at least 3 characters and Content at least 5 characters.",
        "Validation Error",
        true
      );
      return;
    }

    setSubmitting(true);
    const res = await addNotes(note.title, note.discription, note.tag);
    setSubmitting(false);

    if (res?.success) {
      showAlert("Your blog was published successfully!", "Success", false);
      setNote({ title: "", discription: "", tag: "General" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      showAlert(
        res?.message || "Failed to create note. Please try again.",
        "Error",
        true
      );
    }
  };

  const isInvalid = note.title.trim().length < 3 || note.discription.trim().length < 5;

  return (
    <div className="flex flex-col items-center justify-start bg-gradient-to-b from-blue-50 to-white min-h-[85vh] py-10 px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-8 tracking-wide">
        Create a New Blog
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white border border-blue-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
      >
        <div>
          <label htmlFor="title" className="block text-blue-900 font-semibold mb-2 text-sm">
            Title
          </label>
          <input
            type="text"
            value={note.title}
            id="title"
            className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 text-sm"
            placeholder="e.g. Project Architecture, Meeting Notes..."
            onChange={onchange}
            required
            minLength={3}
          />
        </div>

        <div>
          <label htmlFor="discription" className="block text-blue-900 font-semibold mb-2 text-sm">
            Content
          </label>
          <textarea
            id="discription"
            value={note.discription}
            rows="6"
            className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 text-sm resize-y"
            placeholder="Start typing your note here..."
            onChange={onchange}
            required
            minLength={5}
          ></textarea>
        </div>

        <div>
          <label htmlFor="tag" className="block text-blue-900 font-semibold mb-2 text-sm">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            value={note.tag}
            className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 text-sm"
            placeholder="e.g. Work, Ideas, Personal"
            onChange={onchange}
          />
        </div>

        <button
          type="submit"
          disabled={isInvalid || submitting}
          className={`w-full font-bold py-3 rounded-xl shadow transition duration-200 text-base flex items-center justify-center gap-2 cursor-pointer ${
            isInvalid || submitting
              ? "bg-blue-300 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
          }`}
        >
          {submitting ? (
            <>
              <i className="fa-solid fa-circle-notch animate-spin text-sm"></i>
              <span>Publishing Blog...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-feather text-sm"></i>
              <span>Publish Blog</span>
            </>
          )}
        </button>
      </form>

      {alert.show && (
        <Alertmessage
          message={alert.message}
          head={alert.head}
          isError={alert.isError}
        />
      )}
    </div>
  );
};

export default CreateNote;
