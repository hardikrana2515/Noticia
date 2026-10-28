import React, { useContext } from "react";
import noteContext from "../context/NotesContexts/notesContext.js";

const PopCard = () => {
  const { selectedNote, setSelectedNote } = useContext(noteContext);

  if (!selectedNote) return null;

  const handleClose = () => {
    setSelectedNote(null);
  };

  const serverBaseUrl = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/iNotebook"
  ).replace(/\/iNotebook\/?$/, "");

  const getAuthorAvatar = (imagePath) => {
    if (!imagePath) return "/default-user.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `${serverBaseUrl}${imagePath}`;
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    try {
      const parsed = new Date(dateValue);
      return isNaN(parsed.getTime())
        ? ""
        : parsed.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
    } catch {
      return "";
    }
  };

  const authorName = selectedNote.user?.name || "Community Member";
  const authorUsername = selectedNote.user?.username || "user";
  const authorAvatar = getAuthorAvatar(selectedNote.user?.image);

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-xl relative border border-blue-200 max-h-[85vh] flex flex-col">
        {/* Close button */}
        <button
          type="button"
          aria-label="Close note preview"
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2 text-2xl cursor-pointer"
          onClick={handleClose}
        >
          <i className="ri-close-line"></i>
        </button>

        {/* Author info header */}
        <div className="flex items-center space-x-3 mb-4 pr-10 border-b border-gray-100 pb-3">
          <img
            src={authorAvatar}
            alt={authorName}
            className="h-10 w-10 rounded-full object-cover border-2 border-blue-200 shadow-xs"
          />
          <div>
            <h5 className="text-sm font-bold text-blue-900">{authorName}</h5>
            <p className="text-xs text-gray-500">
              @{authorUsername} • {formatDate(selectedNote.Date || selectedNote.createdAt)}
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-3 break-words">
          {selectedNote.title}
        </h2>

        {/* Tag */}
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            #{selectedNote.tag || "General"}
          </span>
        </div>

        {/* Blog Content body (scrollable) */}
        <div className="overflow-y-auto flex-grow pr-2 text-gray-700 leading-relaxed text-base whitespace-pre-wrap break-words border-t border-gray-100 pt-4">
          {selectedNote.discription}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopCard;
