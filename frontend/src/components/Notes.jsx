import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import noteContext from "../context/NotesContexts/notesContext.js";
import userContext from "../context/UserContext/userContext.js";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader.jsx";
import PopCard from "./PopCard.jsx";
import EditNotes from "./EditNotes.jsx";

const Notes = () => {
    const { notes, deleteNotes, fetchNotes, selectedNote, setSelectedNote } = useContext(noteContext);
    const { auth } = useContext(userContext);
    const navigate = useNavigate();
    const [displayNotes, setDisplayNotes] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token")
        if(auth && token ){
             fetchNotes();
        }else{
            navigate("/")
        }
       
    }, [])
    
    useEffect(() => {
        setDisplayNotes(notes.slice(0, visibleCount));
        setHasMore(notes.length > visibleCount);
    }, [notes, visibleCount]);

    const fetchMoreData = () => {
        if (displayNotes.length >= notes.length) {
            setHasMore(false);
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setDisplayNotes(notes.slice(0, visibleCount + 4));
            setVisibleCount((prev) => prev + 4);
        }, 500);
    };



    return (
        <div className="px-4 sm:px-6 md:px-10 py-6  min-h-screen">
            <InfiniteScroll
                dataLength={displayNotes.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={loading && (
                    <div className="flex justify-center items-center py-6">
                        <Loader />
                    </div>
                )}
                endMessage={
                    <p className="text-center text-gray-500 mt-6">
                        <b>No more notes to display</b>
                    </p>
                }
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {displayNotes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out rounded-xl p-5 cursor-pointer"

                        >
                            <div onClick={() => setSelectedNote({ ...note, editing: false })}>
                                <h5 className="text-xl font-extrabold text-blue-800 mb-2">
                                    {note.title}
                                </h5>
                                <p className="text-gray-700 text-sm line-clamp-4 mb-3">{note.discription}</p>

                                <div className="text-sm text-gray-600 space-y-1">
                                    <p><span className="font-medium text-gray-700">Tag:</span> {note.tag}</p>
                                    <p className="text-xs italic text-rose-500">{note.Date?.$date}</p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-5">
                                <button className="text-blue-700 hover:text-blue-900 text-lg transition-colors duration-200"
                                    onClick={() => {
                                        setSelectedNote({ ...note, editing: true });
                                        console.log("Edit button clicked for note:", note);
                                    }} 
                                    >
                                    <i className="ri-edit-2-line"></i>
                                </button>

                                <button
                                    className="text-red-600 hover:text-red-800 text-lg transition-colors duration-200"
                                    onClick={() => deleteNotes(note._id)}
                                >
                                    <i className="ri-delete-bin-5-line"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>

            {selectedNote && selectedNote.editing ? (
                <EditNotes />
            ) : selectedNote ? (
                <PopCard />
            ) : null}


        </div>

    );
};

export default Notes;
