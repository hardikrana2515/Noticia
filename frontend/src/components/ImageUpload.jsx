import React, { useState, useContext, useRef } from "react";
import userContext from "../context/UserContext/userContext";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ error: "", success: "" });
  const fileInputRef = useRef(null);
  const { Profilepic } = useContext(userContext);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ error: "Please select an image first!", success: "" });
      return;
    }

    setUploading(true);
    setStatus({ error: "", success: "" });

    const formData = new FormData();
    formData.append("profilePic", file);

    const res = await Profilepic(formData);
    setUploading(false);

    if (res?.success) {
      setStatus({ error: "", success: "Profile picture updated!" });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setTimeout(() => {
        setStatus({ error: "", success: "" });
      }, 3000);
    } else {
      setStatus({ error: res?.message || "Failed to upload image", success: "" });
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <form
        onSubmit={handleImageUpload}
        className="w-full max-w-xs bg-blue-50/60 rounded-xl p-4 border border-blue-100 space-y-3"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(e) => {
            setFile(e.target.files[0] || null);
            setStatus({ error: "", success: "" });
          }}
          className="block w-full text-xs text-blue-900 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition cursor-pointer"
        />

        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-1.5 px-3 rounded-lg shadow text-xs transition duration-200"
        >
          {uploading ? "Uploading..." : "Update Picture"}
        </button>

        {status.error && (
          <p className="text-red-500 text-xs text-center font-medium">
            {status.error}
          </p>
        )}
        {status.success && (
          <p className="text-green-600 text-xs text-center font-medium">
            {status.success}
          </p>
        )}
      </form>
    </div>
  );
};

export default ImageUpload;
