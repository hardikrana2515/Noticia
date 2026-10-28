import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/NotesContexts/notesContext";
import Alertmessage from "../components/Alertmessage";

const CreateNote = () => {
  const navigate = useNavigate();
  const { addNotes } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", discription: "", tag: "General" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", head: "", isError: false });
  const fileInputRef = useRef(null);

  const onchange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showAlert("Please select a valid image file (JPEG, PNG, WEBP, GIF).", "Invalid File", true);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showAlert("Image size must be less than 5MB.", "File Too Large", true);
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeSelectedImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const showAlert = (message, head, isError = false) => {
    setAlert({ show: true, message, head, isError });
    setTimeout(() => {
      setAlert({ show: false, message: "", head: "", isError: false });
    }, 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasImage = Boolean(imageFile);
    const hasText = note.title.trim().length >= 3 && note.discription.trim().length >= 5;

    if (!hasImage && !hasText) {
      showAlert(
        "Please provide an image, or a title (min 3 chars) and content (min 5 chars).",
        "Validation Error",
        true
      );
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", note.title.trim() || (hasImage ? "Photo Blog" : "Untitled"));
    formData.append("discription", note.discription.trim());
    formData.append("tag", note.tag.trim() || "General");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await addNotes(formData);
    setSubmitting(false);

    if (res?.success) {
      showAlert("Your blog was published successfully!", "Success", false);
      setNote({ title: "", discription: "", tag: "General" });
      removeSelectedImage();
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

  const hasImage = Boolean(imageFile);
  const hasText = note.title.trim().length >= 3 && note.discription.trim().length >= 5;
  const isInvalid = !hasImage && !hasText;

  return (
    <div className="flex flex-col items-center justify-start bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-[85vh] py-10 px-4 transition-colors duration-200">
      <div className="w-full max-w-2xl text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 px-3 py-1 rounded-full">
          WordLoom Studio
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 dark:text-white mt-2 tracking-tight">
          Create a New Blog
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Write an article, upload a cover banner, or publish a photo blog
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-blue-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 transition-colors duration-200"
      >
        {/* Blog Image / Banner Upload Area */}
        <div>
          <label className="block text-blue-950 dark:text-slate-200 font-semibold mb-2 text-sm flex items-center justify-between">
            <span>Blog Banner / Photo <span className="text-slate-400 dark:text-slate-500 font-normal text-xs">(Optional or Image-Only Blog)</span></span>
            {imagePreview && (
              <button
                type="button"
                onClick={removeSelectedImage}
                className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <i className="fa-solid fa-trash-can"></i>
                <span>Remove Image</span>
              </button>
            )}
          </label>

          {imagePreview ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-blue-200 dark:border-slate-700 group bg-slate-50 dark:bg-slate-800">
              <img
                src={imagePreview}
                alt="Banner preview"
                className="w-full h-56 sm:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 bg-white text-blue-900 font-semibold text-xs rounded-xl shadow cursor-pointer hover:bg-blue-50"
                >
                  Change Photo
                </button>
                <button
                  type="button"
                  onClick={removeSelectedImage}
                  className="px-3.5 py-1.5 bg-red-600 text-white font-semibold text-xs rounded-xl shadow cursor-pointer hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-blue-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 bg-blue-50/30 dark:bg-slate-800/40 hover:bg-blue-50/70 dark:hover:bg-slate-800 rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shadow-xs">
                <i className="fa-solid fa-cloud-arrow-up"></i>
              </div>
              <p className="text-sm font-bold text-blue-950 dark:text-white">
                Click to upload a banner image
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Supports JPEG, PNG, WEBP, GIF (Up to 5MB, hosted on Cloudinary)
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-blue-950 dark:text-slate-200 font-semibold mb-2 text-sm">
            Title {hasImage ? <span className="text-slate-400 dark:text-slate-500 font-normal text-xs">(Optional for photo blog)</span> : <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            value={note.title}
            id="title"
            className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/40 dark:bg-slate-800 dark:text-white text-sm"
            placeholder="e.g. Microservices vs Monoliths, Daily Musings..."
            onChange={onchange}
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="discription" className="block text-blue-950 dark:text-slate-200 font-semibold mb-2 text-sm">
            Content / Caption {hasImage ? <span className="text-slate-400 dark:text-slate-500 font-normal text-xs">(Optional for photo blog)</span> : <span className="text-red-500">*</span>}
          </label>
          <textarea
            id="discription"
            value={note.discription}
            rows="5"
            className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/40 dark:bg-slate-800 dark:text-white text-sm resize-y"
            placeholder="Write your article, share insights, or add a photo caption..."
            onChange={onchange}
          ></textarea>
        </div>

        {/* Tag */}
        <div>
          <label htmlFor="tag" className="block text-blue-950 dark:text-slate-200 font-semibold mb-2 text-sm">
            Category Tag
          </label>
          <input
            type="text"
            id="tag"
            value={note.tag}
            className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/40 dark:bg-slate-800 dark:text-white text-sm"
            placeholder="e.g. Technology, Thoughts, Photography, Coding"
            onChange={onchange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isInvalid || submitting}
          className={`w-full font-bold py-3.5 rounded-xl shadow transition duration-200 text-base flex items-center justify-center gap-2 cursor-pointer ${isInvalid || submitting
              ? "bg-blue-300 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
            }`}
        >
          {submitting ? (
            <>
              <i className="fa-solid fa-circle-notch animate-spin text-sm"></i>
              <span>Publishing to Feed...</span>
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
