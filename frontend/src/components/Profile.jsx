import React, { useEffect, useState, useContext } from "react";
import ImageUpload from "./ImageUpload";
import userContext from "../context/UserContext/userContext.js";
import Loader from "./Loader";

const Profile = () => {
  const { GetUser, user, updateProfile } = useContext(userContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!user) {
      GetUser();
    } else {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        username: user.username ? user.username.replace(/^@+/, "") : "",
      });
    }
  }, [user, GetUser]);

  if (!user) {
    return <Loader />;
  }

  const serverBaseUrl = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/iNotebook"
  ).replace(/\/iNotebook\/?$/, "");

  const avatarUrl = user.image
    ? user.image.startsWith("http")
      ? user.image
      : `${serverBaseUrl}${user.image}`
    : "/default-user.png";

  const handleStartEdit = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      username: user.username ? user.username.replace(/^@+/, "") : "",
    });
    setStatusMessage({ type: "", text: "" });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      username: user.username ? user.username.replace(/^@+/, "") : "",
    });
    setStatusMessage({ type: "", text: "" });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (statusMessage.text) {
      setStatusMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: "", text: "" });

    // Client-side validation
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();

    if (!trimmedName) {
      setStatusMessage({ type: "error", text: "Name cannot be empty" });
      return;
    }

    if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setStatusMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    if (!trimmedPhone || !/^\d{10}$/.test(trimmedPhone)) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid 10-digit phone number",
      });
      return;
    }

    // Check if anything actually changed (username is unchangeable)
    const hasChanged =
      trimmedName !== (user.name || "") ||
      trimmedEmail.toLowerCase() !== (user.email || "").toLowerCase() ||
      trimmedPhone !== (user.phone || "");

    if (!hasChanged) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      const res = await updateProfile({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
      });

      if (res?.success) {
        setStatusMessage({
          type: "success",
          text: res.message || "Profile updated successfully!",
        });
        setIsEditing(false);
      } else {
        setStatusMessage({
          type: "error",
          text: res?.message || "Failed to update profile",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "An error occurred while updating profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-transparent px-4 py-8 flex items-center justify-center w-full">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-blue-100 dark:border-slate-800 p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 transition-colors">
        {/* Avatar and upload */}
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src={avatarUrl}
            alt={`${user.name}'s Profile`}
            className="w-36 h-36 rounded-full border-4 border-blue-200 dark:border-slate-700 shadow-md object-cover transition-transform hover:scale-105"
          />
          <ImageUpload />
        </div>

        {/* Profile Info / Edit Form */}
        <div className="flex-1 w-full text-blue-900 dark:text-slate-100">
          <div className="flex items-center justify-between border-b border-blue-100 dark:border-slate-800 pb-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white truncate">
              {isEditing ? "Edit Profile" : user.name}
            </h2>

            {!isEditing && (
              <button
                type="button"
                onClick={handleStartEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer border border-blue-200 dark:border-slate-700"
              >
                <i className="fa-solid fa-pen-to-square text-xs"></i>
                Edit Profile
              </button>
            )}
          </div>

          {statusMessage.text && (
            <div
              className={`mb-4 p-3 rounded-xl text-sm font-medium text-center ${
                statusMessage.type === "success"
                  ? "bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-300"
                  : "bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {!isEditing ? (
            /* View Mode */
            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex items-center justify-between sm:justify-start border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="w-32 font-semibold text-blue-700 dark:text-blue-400">
                  Username:
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                  @{user.username?.replace(/^@+/, "")}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="w-32 font-semibold text-blue-700 dark:text-blue-400">
                  Email:
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                  {user.email}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="w-32 font-semibold text-blue-700 dark:text-blue-400">
                  Phone:
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {user.phone}
                </span>
              </div>
            </div>
          ) : (
            /* Edit Mode Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="profile-name"
                  className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-xs sm:text-sm"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="profile-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-2 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-xs sm:text-sm"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="profile-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-phone"
                  className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-xs sm:text-sm"
                >
                  Phone Number (10 digits)
                </label>
                <input
                  type="tel"
                  id="profile-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="profile-username"
                    className="block text-blue-950 dark:text-slate-200 font-semibold text-xs sm:text-sm"
                  >
                    Username
                  </label>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
                    <i className="fa-solid fa-lock text-[10px]"></i> Unchangeable
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    id="profile-username"
                    name="username"
                    value={formData.username}
                    readOnly
                    disabled
                    tabIndex={-1}
                    title="Username cannot be changed"
                    className="w-full pl-8 pr-10 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-sm cursor-not-allowed select-none focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-lock text-xs"></i>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900 text-white font-semibold py-2.5 rounded-xl shadow transition duration-200 text-sm flex justify-center items-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-check text-xs"></i>
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleCancel}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
