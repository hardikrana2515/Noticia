import React from "react";
import Logout from "../components/Logout";
import Profile from "../components/Profile";

const Account = () => {
  return (
    <div className="flex flex-col items-center min-h-[85vh] bg-gradient-to-b from-blue-50 via-white to-blue-50/40 py-10 px-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Account Management
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mt-2">
            My Account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            View your personal profile details and manage your account session
          </p>
        </div>

        <Profile />
        <Logout />
      </div>
    </div>
  );
};

export default Account;
