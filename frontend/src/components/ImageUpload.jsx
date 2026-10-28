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
        className="w-full max-w-xs bg-blue-50/70 dark:bg-slate-800/80 rounded-2xl p-4 border border-blue-200/80 dark:border-slate-700 space-y-3 transition-colors"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            Change Profile Picture
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(e) => {
              setFile(e.target.files[0] || null);
              setStatus({ error: "", success: "" });
            }}
            className="block w-full text-xs text-slate-700 dark:text-slate-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:file:bg-blue-500 dark:hover:file:bg-blue-600 transition cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-slate-700 dark:disabled:text-slate-500 text-white font-bold py-2 px-3 rounded-xl shadow-xs text-xs transition duration-200 cursor-pointer flex items-center justify-center gap-1.5"
        >
          {uploading ? (
            <>
              <i className="fa-solid fa-circle-notch animate-spin text-xs"></i>
              <span>Uploading to Cloudinary...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-cloud-arrow-up text-xs"></i>
              <span>Update Picture</span>
            </>
          )}
        </button>

        {status.error && (
          <p className="text-red-500 dark:text-red-400 text-xs text-center font-medium">
            {status.error}
          </p>
        )}
        {status.success && (
          <p className="text-green-600 dark:text-green-400 text-xs text-center font-medium">
            {status.success}
          </p>
        )}
      </form>
    </div>
  );
};

export default ImageUpload;
