import React, { useContext, useEffect, useState, useRef } from "react";
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

  const [newImageFile, setNewImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedNote) {
      setEditNote({
        title: selectedNote.title || "",
        discription: selectedNote.discription || "",
        tag: selectedNote.tag || "",
      });
      setPreviewUrl(selectedNote.image || null);
      setRemoveExistingImage(false);
      setNewImageFile(null);
      setError("");
    }
  }, [selectedNote]);

  const handleChange = (e) => {
    setEditNote({ ...editNote, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return;
      }
      setNewImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setRemoveExistingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setNewImageFile(null);
    setPreviewUrl(null);
    setRemoveExistingImage(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    setSelectedNote(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasImage = (previewUrl && !removeExistingImage) || Boolean(newImageFile);
    const hasText = editNote.title.trim() && editNote.discription.trim();

    if (!hasImage && !hasText) {
      setError("Please provide an image, or both title and description.");
      return;
    }

    setSaving(true);
    setError("");

    const formData = new FormData();
    formData.append("title", editNote.title.trim() || (hasImage ? "Photo Blog" : "Untitled"));
    formData.append("discription", editNote.discription.trim());
    formData.append("tag", editNote.tag.trim() || "General");

    if (newImageFile) {
      formData.append("image", newImageFile);
    } else if (removeExistingImage) {
      formData.append("removeImage", "true");
    }

    const res = await editNotes(selectedNote._id, formData);
    setSaving(false);

    if (res?.success) {
      handleClose();
    } else {
      setError(res?.message || "Failed to update note");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-blue-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto transition-colors">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close edit modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors p-2 text-xl cursor-pointer"
          onClick={handleClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white mb-6 tracking-wide">
          Edit Blog
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Banner Photo Section */}
          <div>
            <label className="block text-blue-950 dark:text-slate-200 font-semibold mb-2 text-sm flex items-center justify-between">
              <span>Banner Image / Photo</span>
              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <i className="fa-solid fa-trash-can"></i>
                  <span>Remove Photo</span>
                </button>
              )}
            </label>

            {previewUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-blue-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 mb-2">
                <img
                  src={previewUrl}
                  alt="Blog preview"
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 hover:bg-white text-blue-900 dark:text-blue-300 text-xs font-bold rounded-xl shadow cursor-pointer transition"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-blue-200 dark:border-slate-700 hover:border-blue-400 bg-blue-50/30 dark:bg-slate-800/40 rounded-2xl text-center text-xs text-blue-800 dark:text-blue-300 font-semibold flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <i className="fa-solid fa-cloud-arrow-up text-base text-blue-600 dark:text-blue-400"></i>
                <span>Upload a banner image to Cloudinary</span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-blue-950 dark:text-slate-200 font-semibold mb-2 text-sm"
            >
              Title
            </label>
            <input
              value={editNote.title}
              onChange={handleChange}
              type="text"
              id="title"
              className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="discription"
              className="block text-blue-950 dark:text-slate-200 font-semibold mb-2 text-sm"
            >
              Description / Caption
            </label>
            <textarea
              value={editNote.discription}
              onChange={handleChange}
              id="discription"
              rows="5"
              className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white resize-y"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="tag"
              className="block text-blue-950 dark:text-slate-200 font-semibold mb-2 text-sm"
            >
              Tag
            </label>
            <input
              value={editNote.tag}
              onChange={handleChange}
              type="text"
              id="tag"
              className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900 text-white font-bold rounded-xl shadow hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              {saving ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotes;
