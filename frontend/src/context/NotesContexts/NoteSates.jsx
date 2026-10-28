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

  // Supports either formData or object { title, discription, tag, image }
  const addNotes = async (titleOrFormData, discription, tag, imageFile) => {
    try {
      let payload;
      let headers = {};

      if (titleOrFormData instanceof FormData) {
        payload = titleOrFormData;
        headers = { "Content-Type": "multipart/form-data" };
      } else {
        const formData = new FormData();
        if (titleOrFormData) formData.append("title", titleOrFormData);
        if (discription) formData.append("discription", discription);
        if (tag) formData.append("tag", tag || "General");
        if (imageFile) formData.append("image", imageFile);
        payload = formData;
        headers = { "Content-Type": "multipart/form-data" };
      }

      const res = await API.post("/Notes/create", payload, { headers });

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

  // Supports updating note with optional image / removeImage
  const editNotes = async (id, titleOrFormData, discription, tag, imageFile, removeImage) => {
    try {
      let payload;
      let headers = {};

      if (titleOrFormData instanceof FormData) {
        payload = titleOrFormData;
        headers = { "Content-Type": "multipart/form-data" };
      } else {
        const formData = new FormData();
        if (titleOrFormData !== undefined) formData.append("title", titleOrFormData);
        if (discription !== undefined) formData.append("discription", discription);
        if (tag !== undefined) formData.append("tag", tag);
        if (imageFile) formData.append("image", imageFile);
        if (removeImage) formData.append("removeImage", "true");
        payload = formData;
        headers = { "Content-Type": "multipart/form-data" };
      }

      const res = await API.put(`/Notes/updateNote/${id}`, payload, { headers });

      const updated = res.data?.data;
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? updated || { ...note, ...payload } : note
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
