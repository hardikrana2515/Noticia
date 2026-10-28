import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import noteContext from "../context/NotesContexts/notesContext.js";
import userContext from "../context/UserContext/userContext.js";
import Loader from "./Loader.jsx";
import PopCard from "./PopCard.jsx";
import EditNotes from "./EditNotes.jsx";

const Notes = () => {
  const {
    notes,
    deleteNotes,
    fetchNotes,
    selectedNote,
    setSelectedNote,
    notesLoading,
    feedFilter,
    setFeedFilter,
  } = useContext(noteContext);

  const { auth, user } = useContext(userContext);
  const [displayNotes, setDisplayNotes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const serverBaseUrl = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/iNotebook"
  ).replace(/\/iNotebook\/?$/, "");

  const getAuthorAvatar = (imagePath) => {
    if (!imagePath) return "/default-user.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `${serverBaseUrl}${imagePath}`;
  };

  useEffect(() => {
    if (auth) {
      fetchNotes(feedFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, feedFilter]);

  useEffect(() => {
    const safeNotes = Array.isArray(notes) ? notes : [];
    setDisplayNotes(safeNotes.slice(0, visibleCount));
    setHasMore(safeNotes.length > visibleCount);
  }, [notes, visibleCount]);

  const handleTabChange = (newFilter) => {
    if (feedFilter !== newFilter) {
      setFeedFilter(newFilter);
      setVisibleCount(8);
      fetchNotes(newFilter);
    }
  };

  const fetchMoreData = () => {
    const safeNotes = Array.isArray(notes) ? notes : [];
    if (displayNotes.length >= safeNotes.length) {
      setHasMore(false);
      return;
    }

    setLoadingMore(true);
    setTimeout(() => {
      setDisplayNotes(safeNotes.slice(0, visibleCount + 4));
      setVisibleCount((prev) => prev + 4);
      setLoadingMore(false);
    }, 400);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;
    setDeleting(true);
    await deleteNotes(noteToDelete._id);
    setDeleting(false);
    setNoteToDelete(null);
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

  const isUserAuthor = (note) => {
    if (!user || !note.user) return false;
    const authorId = note.user._id || note.user;
    return String(authorId) === String(user._id);
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 min-h-[60vh] max-w-7xl mx-auto">
      {/* Feed Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 border-b border-blue-200/70 pb-4">
        <div className="inline-flex p-1.5 bg-blue-100/70 rounded-2xl shadow-inner border border-blue-200">
          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              feedFilter === "all"
                ? "bg-blue-600 text-white shadow-md"
                : "text-blue-900 hover:bg-blue-200/60"
            }`}
          >
            <i className="fa-solid fa-globe text-sm"></i>
            <span>Community Blogs</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("my")}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              feedFilter === "my"
                ? "bg-blue-600 text-white shadow-md"
                : "text-blue-900 hover:bg-blue-200/60"
            }`}
          >
            <i className="fa-solid fa-user text-sm"></i>
            <span>My Blogs</span>
          </button>
        </div>

        <Link
          to="/Notes"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow hover:shadow-md transition duration-200 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus text-xs"></i>
          Write New Blog
        </Link>
      </div>

      {/* Main Content Area */}
      {notesLoading && (!notes || notes.length === 0) ? (
        <div className="py-20">
          <Loader />
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-blue-100 max-w-lg mx-auto p-8">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className="fa-solid fa-newspaper"></i>
          </div>
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            {feedFilter === "my"
              ? "You have not written any blogs yet"
              : "No community blogs found"}
          </h3>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            {feedFilter === "my"
              ? "Share your knowledge, daily reflections, or code snippets with the community!"
              : "Be the first one to publish a blog post in Noticia!"}
          </p>
          <Link
            to="/Notes"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow hover:shadow-md transition duration-200 text-sm"
          >
            <i className="fa-solid fa-pen-to-square text-sm"></i>
            Create Blog Now
          </Link>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={displayNotes.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            loadingMore && (
              <div className="flex justify-center items-center py-6">
                <Loader />
              </div>
            )
          }
          endMessage={
            displayNotes.length > 0 && (
              <p className="text-center text-gray-400 mt-10 text-sm font-medium">
                All blogs loaded
              </p>
            )
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayNotes.map((note) => {
              const isMine = isUserAuthor(note);
              const authorName = note.user?.name || "Community Member";
              const authorUsername = note.user?.username || "user";
              const authorAvatar = getAuthorAvatar(note.user?.image);

              return (
                <div
                  key={note._id}
                  className="bg-white hover:bg-blue-50/40 border border-blue-200/80 shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl p-5 flex flex-col justify-between group"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => setSelectedNote({ ...note, editing: false })}
                  >
                    {/* Author Attribution Header */}
                    <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                      <div className="flex items-center space-x-2.5 overflow-hidden">
                        <img
                          src={authorAvatar}
                          alt={authorName}
                          className="h-8 w-8 rounded-full object-cover border border-blue-300 shadow-xs flex-shrink-0"
                        />
                        <div className="truncate">
                          <p className="text-xs font-bold text-blue-900 truncate">
                            {authorName}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate">
                            @{authorUsername}
                          </p>
                        </div>
                      </div>

                      {isMine ? (
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                          You
                        </span>
                      ) : (
                        <span className="text-[10px] bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full flex-shrink-0">
                          Public
                        </span>
                      )}
                    </div>

                    {/* Blog Title & Snippet */}
                    <h4 className="text-lg font-extrabold text-blue-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 break-words">
                      {note.title}
                    </h4>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed whitespace-pre-wrap break-words">
                      {note.discription}
                    </p>

                    {/* Tags & Published Date */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="bg-blue-50 border border-blue-200 text-blue-700 font-medium px-2.5 py-0.5 rounded-lg truncate max-w-[130px]">
                        #{note.tag || "General"}
                      </span>
                      <span className="text-gray-400 font-medium text-[11px]">
                        {formatDate(note.Date || note.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1.5 cursor-pointer"
                      onClick={() => setSelectedNote({ ...note, editing: false })}
                    >
                      <span>Read blog</span>
                      <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </button>

                    {isMine && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="Edit blog"
                          title="Edit your blog"
                          className="text-blue-600 hover:text-blue-900 hover:bg-blue-100 p-1.5 rounded-lg transition text-sm cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedNote({ ...note, editing: true });
                          }}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>

                        <button
                          type="button"
                          aria-label="Delete blog"
                          title="Delete blog"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition text-sm cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNoteToDelete(note);
                          }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      )}

      {/* Edit Note Modal */}
      {selectedNote && selectedNote.editing ? (
        <EditNotes />
      ) : selectedNote ? (
        <PopCard />
      ) : null}

      {/* Custom Delete Confirmation Modal */}
      {noteToDelete && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget && !deleting) setNoteToDelete(null);
          }}
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-red-100 text-center relative">
            <button
              type="button"
              aria-label="Cancel delete"
              disabled={deleting}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1 text-lg cursor-pointer"
              onClick={() => setNoteToDelete(null)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <i className="fa-solid fa-trash-can text-2xl text-red-600"></i>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Blog?</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete{" "}
              <strong className="text-gray-900">"{noteToDelete.title}"</strong>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setNoteToDelete(null)}
                className="w-1/2 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition text-sm cursor-pointer"
              >
                Keep Note
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="w-1/2 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold rounded-xl shadow transition text-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {deleting ? (
                  <>
                    <i className="fa-solid fa-circle-notch animate-spin text-sm"></i>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
