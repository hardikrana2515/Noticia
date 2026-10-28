import React, { useEffect, useContext } from "react";
import ImageUpload from "./ImageUpload";
import userContext from "../context/UserContext/userContext.js";
import Loader from "./Loader";

const Profile = () => {
  const { GetUser, user } = useContext(userContext);

  useEffect(() => {
    if (!user) {
      GetUser();
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

  return (
    <section className="bg-transparent px-4 py-8 flex items-center justify-center w-full">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-blue-100 p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar and upload */}
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src={avatarUrl}
            alt={`${user.name}'s Profile`}
            className="w-36 h-36 rounded-full border-4 border-blue-200 shadow-md object-cover transition-transform hover:scale-105"
          />
          <ImageUpload />
        </div>

        {/* Profile Info */}
        <div className="flex-1 w-full text-blue-900">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-800 border-b border-blue-100 pb-3 mb-6 text-center md:text-left">
            {user.name}
          </h2>

          <div className="space-y-4 text-sm sm:text-base">
            <div className="flex items-center justify-between sm:justify-start border-b border-gray-100 pb-2">
              <span className="w-32 font-semibold text-blue-700">Username:</span>
              <span className="text-gray-700 font-medium">@{user.username}</span>
            </div>

            <div className="flex items-center justify-between sm:justify-start border-b border-gray-100 pb-2">
              <span className="w-32 font-semibold text-blue-700">Email:</span>
              <span className="text-gray-700 font-medium">{user.email}</span>
            </div>

            <div className="flex items-center justify-between sm:justify-start border-b border-gray-100 pb-2">
              <span className="w-32 font-semibold text-blue-700">Phone:</span>
              <span className="text-gray-700 font-medium">{user.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
