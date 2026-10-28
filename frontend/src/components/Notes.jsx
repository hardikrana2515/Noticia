import React, { useContext, useEffect, useState, useMemo } from "react";
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

  // Search & Tag Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // Pagination / Load More State
  const PAGE_SIZE = 9;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Deletion Modal State
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // API Error State
  const [fetchError, setFetchError] = useState(null);

  const serverBaseUrl = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/iNotebook"
  ).replace(/\/iNotebook\/?$/, "");

  const getAuthorAvatar = (imagePath) => {
    if (!imagePath) return "/default-user.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `${serverBaseUrl}${imagePath}`;
  };

  // Fetch on auth or feedFilter change
  const loadNotesData = async (filterType = feedFilter) => {
    setFetchError(null);
    try {
      await fetchNotes(filterType);
    } catch (err) {
      setFetchError(
        err.response?.data?.message || "Failed to load blogs. Please check your connection."
      );
    }
  };

  useEffect(() => {
    if (auth) {
      loadNotesData(feedFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, feedFilter]);

  // Reset pagination & filters on tab switch
  const handleTabChange = (newFilter) => {
    if (feedFilter !== newFilter) {
      setFeedFilter(newFilter);
      setSearchQuery("");
      setSelectedTag("all");
      setVisibleCount(PAGE_SIZE);
    }
  };

  // Extract unique tags from current notes list
  const availableTags = useMemo(() => {
    const safeNotes = Array.isArray(notes) ? notes : [];
    const tags = new Set();
    safeNotes.forEach((note) => {
      if (note.tag && note.tag.trim()) {
        tags.add(note.tag.trim());
      }
    });
    return Array.from(tags).sort();
  }, [notes]);

  // Filter notes by search query and tag
  const filteredNotes = useMemo(() => {
    const safeNotes = Array.isArray(notes) ? notes : [];
    return safeNotes.filter((note) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        note.title?.toLowerCase().includes(q) ||
        note.discription?.toLowerCase().includes(q) ||
        note.user?.name?.toLowerCase().includes(q) ||
        note.user?.username?.toLowerCase().includes(q) ||
        note.tag?.toLowerCase().includes(q);

      const matchesTag =
        selectedTag === "all" ||
        note.tag?.toLowerCase().trim() === selectedTag.toLowerCase().trim();

      return matchesSearch && matchesTag;
    });
  }, [notes, searchQuery, selectedTag]);

  // Paginated slice
  const displayedNotes = useMemo(() => {
    return filteredNotes.slice(0, visibleCount);
  }, [filteredNotes, visibleCount]);

  const hasMore = displayedNotes.length < filteredNotes.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
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
    <div className="w-full">
      {/* ─── SECTION B: BLOG FEED TOOLBAR ─────────────────────────────────── */}
      <div className="mb-8 space-y-4">
        {/* Main Bar: Tabs + Write CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
          
          {/* Primary feed switcher */}
          <div className="inline-flex p-1.5 bg-blue-50/80 rounded-2xl border border-blue-200/80 shadow-xs">
            <button
              type="button"
              onClick={() => handleTabChange("all")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                feedFilter === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-blue-900 hover:bg-blue-100/70"
              }`}
            >
              <i className="fa-solid fa-globe text-sm"></i>
              <span>Community Blogs</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("my")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                feedFilter === "my"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-blue-900 hover:bg-blue-100/70"
              }`}
            >
              <i className="fa-solid fa-user text-sm"></i>
              <span>My Blogs</span>
            </button>
          </div>

          {/* Action Button: Write a Blog */}
          <Link
            to="/Notes"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-xs hover:shadow-md transition duration-200 flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-pen-to-square text-xs"></i>
            <span>Write a Blog</span>
          </Link>
        </div>

        {/* Secondary Controls: Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <i className="fa-solid fa-magnifying-glass text-xs"></i>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search by title, author, keyword..."
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-blue-200 rounded-xl text-sm text-blue-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Category Tag Pills (Horizontal Filter) */}
          {availableTags.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs">
              <span className="text-gray-400 font-semibold mr-1 flex-shrink-0">
                Filter:
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedTag("all");
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition flex-shrink-0 cursor-pointer ${
                  selectedTag === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200/60"
                }`}
              >
                All
              </button>
              {availableTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setSelectedTag(t);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition flex-shrink-0 cursor-pointer ${
                    selectedTag.toLowerCase() === t.toLowerCase()
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200/60"
                  }`}
                >
                  #{t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── FEED CONTENT, STATES & CARD GRID ─────────────────────────────── */}
      {/* 1. Error State */}
      {fetchError && (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center my-8 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 text-lg">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h3 className="text-base font-bold text-red-900 mb-1">Unable to Load Blogs</h3>
          <p className="text-red-700 text-xs sm:text-sm mb-4 leading-relaxed">{fetchError}</p>
          <button
            type="button"
            onClick={() => loadNotesData(feedFilter)}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
          >
            Try Again
          </button>
        </div>
      )}

      {/* 2. Loading State */}
      {notesLoading && (!notes || notes.length === 0) && (
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader />
          <p className="text-xs text-gray-400 mt-4 font-medium tracking-wide">
            Retrieving blog posts...
          </p>
        </div>
      )}

      {/* 3. Empty State (Distinct for Community vs. My Blogs) */}
      {!notesLoading && !fetchError && (!notes || notes.length === 0) && (
        <div className="text-center py-16 bg-white rounded-3xl shadow-xs border border-blue-100 max-w-md mx-auto p-8 my-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className={feedFilter === "my" ? "fa-solid fa-book-open" : "fa-solid fa-newspaper"}></i>
          </div>
          
          <h3 className="font-serif-heading text-2xl font-bold text-blue-950 mb-2">
            {feedFilter === "my" ? "Your writing starts here." : "No community blogs yet."}
          </h3>
          
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            {feedFilter === "my"
              ? "Create a note or publish a blog, and your posts will appear here."
              : "Be the first to share an idea with the Noticia community."}
          </p>
          
          <Link
            to="/Notes"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl shadow-xs hover:shadow-md transition duration-200 text-sm"
          >
            <i className="fa-solid fa-feather text-xs"></i>
            <span>{feedFilter === "my" ? "Write Your First Blog" : "Create Your First Blog"}</span>
          </Link>
        </div>
      )}

      {/* 4. Search Filter Empty State */}
      {!notesLoading && !fetchError && notes.length > 0 && filteredNotes.length === 0 && (
        <div className="text-center py-14 bg-white rounded-3xl border border-blue-100 max-w-md mx-auto p-6 my-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-lg">
            <i className="fa-solid fa-filter-circle-xmark"></i>
          </div>
          <h4 className="text-base font-bold text-blue-950 mb-1">No Matching Posts Found</h4>
          <p className="text-gray-500 text-xs sm:text-sm mb-4">
            Try adjusting your search terms or clearing your category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("all");
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 5. Polished Editorial Card Grid */}
      {!fetchError && displayedNotes.length > 0 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedNotes.map((note) => {
              const isMine = isUserAuthor(note);
              const authorName = note.user?.name || "Community Member";
              const authorUsername = note.user?.username || "user";
              const authorAvatar = getAuthorAvatar(note.user?.image);

              return (
                <div
                  key={note._id}
                  className="bg-white hover:bg-blue-50/20 border border-blue-100 hover:border-blue-200/90 shadow-xs hover:shadow-md transition-all duration-200 rounded-3xl overflow-hidden flex flex-col justify-between group"
                >
                  {/* Banner image if present */}
                  {note.image && (
                    <div
                      className="w-full h-44 sm:h-48 bg-gray-100 overflow-hidden cursor-pointer relative"
                      onClick={() => setSelectedNote({ ...note, editing: false })}
                    >
                      <img
                        src={note.image}
                        alt={note.title || "Blog cover"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-blue-900 px-2 py-0.5 rounded-full shadow-xs">
                        #{note.tag || "Photo"}
                      </span>
                    </div>
                  )}

                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={`Read blog: ${note.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedNote({ ...note, editing: false });
                      }
                    }}
                    onClick={() => setSelectedNote({ ...note, editing: false })}
                    className="p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-b-2xl flex-grow flex flex-col justify-between"
                  >
                    <div>
                      {/* Header: Author Attribution + Privacy Badge */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                        <div className="flex items-center space-x-2.5 overflow-hidden">
                          <img
                            src={authorAvatar}
                            alt={authorName}
                            className="h-8 w-8 rounded-full object-cover border border-blue-200 shadow-xs flex-shrink-0"
                          />
                          <div className="truncate">
                            <p className="text-xs font-bold text-blue-950 truncate">
                              {authorName}
                            </p>
                            <p className="text-[11px] text-gray-400 truncate">
                              @{authorUsername}
                            </p>
                          </div>
                        </div>

                        {isMine ? (
                          <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full flex-shrink-0">
                            You
                          </span>
                        ) : (
                          <span className="text-[10px] bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full flex-shrink-0">
                            Public
                          </span>
                        )}
                      </div>

                      {/* Blog Title */}
                      {note.title && (
                        <h3 className="font-serif-heading text-lg font-bold text-blue-950 mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 break-words">
                          {note.title}
                        </h3>
                      )}

                      {/* Short Content Excerpt */}
                      {note.discription && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed whitespace-pre-wrap break-words">
                          {note.discription}
                        </p>
                      )}
                    </div>

                    {/* Tag Badge & Publication Date */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-50 mt-2">
                      <span className="bg-blue-50 border border-blue-200/80 text-blue-800 font-semibold px-2.5 py-0.5 rounded-lg truncate max-w-[130px]">
                        #{note.tag || "General"}
                      </span>
                      <span className="text-gray-400 font-medium text-[11px]">
                        {formatDate(note.Date || note.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Action Bar: Read Action + Author Only Edit/Delete */}
                  <div className="flex items-center justify-between px-6 py-3.5 bg-gray-50/50 border-t border-gray-100">
                    <button
                      type="button"
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-1.5 cursor-pointer py-1"
                      onClick={() => setSelectedNote({ ...note, editing: false })}
                    >
                      <span>Read blog</span>
                      <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </button>

                    {/* Author-only Controls */}
                    {isMine && (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          aria-label={`Edit ${note.title}`}
                          title="Edit your blog"
                          className="text-blue-600 hover:text-blue-900 hover:bg-blue-100/70 p-2 rounded-xl transition text-xs cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedNote({ ...note, editing: true });
                          }}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>

                        <button
                          type="button"
                          aria-label={`Delete ${note.title}`}
                          title="Delete blog"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition text-xs cursor-pointer"
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

          {/* Load More Pagination Button */}
          {hasMore && (
            <div className="text-center mt-10 pt-4">
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-7 py-3 bg-white hover:bg-blue-50 border border-blue-200 text-blue-900 text-sm font-bold rounded-2xl shadow-xs hover:shadow-md transition cursor-pointer"
              >
                <span>Load More Articles</span>
                <i className="fa-solid fa-chevron-down text-xs"></i>
              </button>
              <p className="text-[11px] text-gray-400 mt-2">
                Showing {displayedNotes.length} of {filteredNotes.length} posts
              </p>
            </div>
          )}

          {!hasMore && displayedNotes.length > 0 && (
            <p className="text-center text-gray-400 text-xs font-medium mt-12 mb-4">
              You&apos;ve reached the end of the feed
            </p>
          )}
        </div>
      )}

      {/* ─── MODALS: READER, EDIT & AUTHOR-AUTHORIZED DELETION ──────────────── */}
      {/* Edit Note Modal */}
      {selectedNote && selectedNote.editing ? (
        <EditNotes />
      ) : selectedNote ? (
        <PopCard />
      ) : null}

      {/* Delete Confirmation Modal */}
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

            <h3 className="font-serif-heading text-xl font-bold text-gray-900 mb-2">
              Delete Blog?
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete{" "}
              <strong className="text-gray-900">&ldquo;{noteToDelete.title}&rdquo;</strong>?
              This action cannot be undone.
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
