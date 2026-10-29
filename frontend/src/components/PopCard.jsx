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
  const authorUsername = (selectedNote.user?.username || "user").replace(/^@+/, "");
  const authorAvatar = getAuthorAvatar(selectedNote.user?.image);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl w-full max-w-2xl relative border border-blue-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden transition-colors">
        {/* Close button - always on top */}
        <button
          type="button"
          aria-label="Close note preview"
          className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-red-600 transition-colors p-2 rounded-full shadow-md text-lg cursor-pointer z-10"
          onClick={handleClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Scrollable content area — everything scrolls together */}
        <div className="flex-grow overflow-y-auto overscroll-contain scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-slate-600 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-500">
          {/* Banner image (if blog has one) */}
          {selectedNote.image && (
            <div className="w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
              <img
                src={selectedNote.image}
                alt={selectedNote.title || "Blog banner"}
                className="w-full max-h-80 object-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* Author info header */}
            <div className="flex items-center space-x-3 mb-4 pr-10 border-b border-slate-100 dark:border-slate-800 pb-3">
              <img
                src={authorAvatar}
                alt={authorName}
                className="h-10 w-10 rounded-full object-cover border-2 border-blue-200 dark:border-slate-700 shadow-xs"
              />
              <div>
                <h5 className="text-sm font-bold text-blue-950 dark:text-white">{authorName}</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  @{authorUsername} • {formatDate(selectedNote.Date || selectedNote.createdAt)}
                </p>
              </div>
            </div>

            {/* Title */}
            {selectedNote.title && (
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white mb-3 break-words font-serif-heading">
                {selectedNote.title}
              </h2>
            )}

            {/* Tag */}
            <div className="mb-4">
              <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
                #{selectedNote.tag || "General"}
              </span>
            </div>

            {/* Blog Content body */}
            {selectedNote.discription ? (
              <div className="text-slate-700 dark:text-slate-200 leading-relaxed text-base whitespace-pre-wrap break-words border-t border-slate-100 dark:border-slate-800 pt-4">
                {selectedNote.discription}
              </div>
            ) : (
              <div className="text-slate-400 italic text-sm pt-2">
                (Photo note with no caption)
              </div>
            )}
          </div>
        </div>

        {/* Footer - pinned at the bottom, never scrolls away */}
        <div className="flex-shrink-0 px-6 sm:px-8 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-white dark:bg-slate-900 rounded-b-3xl">
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
