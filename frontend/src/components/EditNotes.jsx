import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/NotesContexts/notesContext.js";

const EditNotes = () => {
  const { selectedNote, setSelectedNote, editNotes } = useContext(noteContext);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [editNote, setEditNote] = useState({
    title: "",
    discription: "",
    tag: "",
  });

  useEffect(() => {
    if (selectedNote) {
      setEditNote({
        title: selectedNote.title || "",
        discription: selectedNote.discription || "",
        tag: selectedNote.tag || "",
      });
      setError("");
    }
  }, [selectedNote]);

  const handleChange = (e) => {
    setEditNote({ ...editNote, [e.target.id]: e.target.value });
  };

  const handleClose = () => {
    setSelectedNote(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editNote.title.trim() || !editNote.discription.trim()) {
      setError("Please fill in both title and description.");
      return;
    }

    setSaving(true);
    setError("");
    const res = await editNotes(
      selectedNote._id,
      editNote.title,
      editNote.discription,
      editNote.tag
    );
    setSaving(false);

    if (res?.success) {
      handleClose();
    } else {
      setError(res?.message || "Failed to update note");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-blue-200">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close edit modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2 text-2xl"
          onClick={handleClose}
        >
          <i className="ri-close-line"></i>
        </button>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-6 tracking-wide">
          Edit Note
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-blue-900 font-semibold mb-2 text-sm"
            >
              Title
            </label>
            <input
              value={editNote.title}
              onChange={handleChange}
              type="text"
              id="title"
              required
              className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
            />
          </div>

          <div>
            <label
              htmlFor="discription"
              className="block text-blue-900 font-semibold mb-2 text-sm"
            >
              Description
            </label>
            <textarea
              value={editNote.discription}
              onChange={handleChange}
              id="discription"
              rows="5"
              required
              className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 resize-y"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="tag"
              className="block text-blue-900 font-semibold mb-2 text-sm"
            >
              Tag
            </label>
            <input
              value={editNote.tag}
              onChange={handleChange}
              type="text"
              id="tag"
              className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl shadow hover:shadow-lg transition flex items-center gap-2"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotes;
