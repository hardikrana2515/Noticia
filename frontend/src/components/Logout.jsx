import React, { useState, useContext } from "react";
import userContext from "../context/UserContext/userContext.js";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [showModal, setShowModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(userContext);

  const handleConfirmLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <div className="mt-6 flex justify-center">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow hover:shadow-lg transition duration-200 flex items-center gap-2 text-sm sm:text-base cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <i className="fa-solid fa-right-from-bracket text-base"></i>
          Log Out
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget && !loggingOut) setShowModal(false);
          }}
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-blue-200 dark:border-slate-800 text-center relative transition-colors">
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close modal"
              disabled={loggingOut}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors text-lg p-1 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Icon */}
            <div className="mx-auto w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center mb-4">
              <i className="fa-solid fa-arrow-right-from-bracket text-2xl text-red-600 dark:text-red-400"></i>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Log Out of WordLoom?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Are you sure you want to end your current session? You will need to log back in to manage your notes.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={loggingOut}
                onClick={() => setShowModal(false)}
                className="w-1/2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loggingOut}
                onClick={handleConfirmLogout}
                className="w-1/2 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold rounded-xl shadow transition text-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {loggingOut ? (
                  <>
                    <i className="fa-solid fa-circle-notch animate-spin text-sm"></i>
                    <span>Exiting...</span>
                  </>
                ) : (
                  <span>Log Out</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
