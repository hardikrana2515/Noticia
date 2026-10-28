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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget && !loggingOut) setShowModal(false);
          }}
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-blue-200 text-center relative">
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close modal"
              disabled={loggingOut}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-lg p-1 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Icon */}
            <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <i className="fa-solid fa-arrow-right-from-bracket text-2xl text-red-600"></i>
            </div>

            <h3 className="text-xl font-extrabold text-blue-900 mb-2">
              Log Out of Noticia?
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Are you sure you want to end your current session? You will need to log in again to manage your notes.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={loggingOut}
                onClick={() => setShowModal(false)}
                className="w-1/2 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loggingOut}
                onClick={handleConfirmLogout}
                className="w-1/2 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold rounded-xl shadow hover:shadow-md transition text-sm flex items-center justify-center gap-2 cursor-pointer"
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
