import React from "react";
import Logout from "../components/Logout";
import Profile from "../components/Profile";

const Account = () => {
  return (
    <div className="flex flex-col items-center min-h-[85vh] bg-gradient-to-b from-blue-50 via-white to-blue-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 px-4 transition-colors duration-200">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-blue-200 dark:border-slate-700">
            Account Management
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 dark:text-white mt-2">
            My Account
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            View your personal profile details and manage your WordLoom account session
          </p>
        </div>

        <Profile />
        <Logout />
      </div>
    </div>
  );
};

export default Account;
