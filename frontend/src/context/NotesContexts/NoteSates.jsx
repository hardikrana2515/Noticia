import NoteContext from "./notesContext.js";
import React, { useState } from "react";
import API from "../../Api.axios.js";

const Notestate = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notesLoading, setNotesLoading] = useState(false);
  const [feedFilter, setFeedFilter] = useState("all"); // 'all' (public blogs) | 'my' (user's blogs)

  const fetchNotes = async (filterType = feedFilter) => {
    setNotesLoading(true);
    try {
      const url = filterType === "my" ? "/Notes/notes?filter=my" : "/Notes/notes";
      const res = await API.get(url);
      if (Array.isArray(res.data?.data)) {
        setNotes(res.data.data);
      } else {
        setNotes([]);
      }
    } catch (err) {
      console.error(
        "Failed to fetch notes:",
        err.response?.data?.message || err.message
      );
      setNotes([]);
    } finally {
      setNotesLoading(false);
    }
  };

  const addNotes = async (title, discription, tag) => {
    try {
      const res = await API.post("/Notes/create", {
        title,
        discription,
        tag: tag || "General",
      });

      if (res.data?.data) {
        setNotes((prevNotes) => [res.data.data, ...prevNotes]);
        return {
          success: true,
          note: res.data.data,
          message: "Blog published successfully!",
        };
      }
      return { success: false, message: "Failed to create note." };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create note.";
      return { success: false, message };
    }
  };

  const deleteNotes = async (id) => {
    try {
      await API.delete(`/Notes/deletenote/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      if (selectedNote?._id === id) {
        setSelectedNote(null);
      }
      return { success: true, message: "Blog removed successfully!" };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete note.";
      return { success: false, message };
    }
  };

  const editNotes = async (id, title, discription, tag) => {
    try {
      const res = await API.put(`/Notes/updateNote/${id}`, {
        title,
        discription,
        tag,
      });

      const updated = res.data?.data;
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id
            ? updated || { ...note, title, discription, tag }
            : note
        )
      );

      return { success: true, message: "Blog updated successfully!" };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update note.";
      return { success: false, message };
    }
  };

  const OpenNote = (id) => {
    return notes.find((note) => note._id === id);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNotes,
        deleteNotes,
        editNotes,
        fetchNotes,
        OpenNote,
        selectedNote,
        setSelectedNote,
        notesLoading,
        feedFilter,
        setFeedFilter,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default Notestate;
