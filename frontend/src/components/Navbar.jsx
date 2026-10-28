import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import userContext from "../context/UserContext/userContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  const { auth, img, user } = useContext(userContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const serverBaseUrl = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/iNotebook"
  ).replace(/\/iNotebook\/?$/, "");

  const avatarSrc = img
    ? img.startsWith("http")
      ? img
      : `${serverBaseUrl}${img}`
    : "/default-user.png";

  const getNavClass = (path) =>
    location.pathname === path
      ? "px-4 py-2 rounded-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition duration-200 font-semibold text-sm flex items-center gap-2 dark:bg-blue-500 dark:text-white"
      : "px-4 py-2 rounded-xl text-blue-900 hover:bg-blue-100 transition duration-200 font-semibold text-sm flex items-center gap-2 dark:text-slate-200 dark:hover:bg-slate-800/80";

  return (
    <header className="bg-gradient-to-r from-blue-100 via-blue-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 backdrop-blur-md text-blue-900 dark:text-slate-100 px-4 sm:px-8 py-3 sticky top-0 z-40 shadow-sm border-b border-blue-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center group py-0.5">
          <img
            src="/wordloom-logo.png"
            alt="WordLoom"
            className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2">
          <Link to="/" className={getNavClass("/")}>
            <i className="fa-solid fa-house text-sm"></i>
            <span>Home</span>
          </Link>

          {auth && (
            <Link to="/Notes" className={getNavClass("/Notes")}>
              <i className="fa-solid fa-circle-plus text-sm"></i>
              <span>Create Blog</span>
            </Link>
          )}

          <Link to="/about" className={getNavClass("/about")}>
            <i className="fa-solid fa-circle-info text-sm"></i>
            <span>About</span>
          </Link>

          {/* Active Segmented Dark / Light Theme Toggle (Sun = Light, Moon = Dark) */}
          <div className="ml-2">
            <ThemeToggle />
          </div>

          {auth ? (
            <Link
              to="/Account"
              className="ml-2 pl-3 border-l border-blue-200 dark:border-slate-700 flex items-center space-x-2.5 group py-1"
              title="My Account"
            >
              <img
                src={avatarSrc}
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover border-2 border-blue-500 shadow-sm group-hover:ring-2 group-hover:ring-blue-400 transition-all duration-200"
              />
              <span className="text-xs font-bold text-blue-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors max-w-[110px] truncate">
                {user?.name || "Account"}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Controls: Segmented Theme toggle + Hamburger */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Toggle navigation"
            className="p-2 rounded-xl text-blue-800 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-slate-800 transition focus:outline-none cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={menuOpen ? "fa-solid fa-xmark text-xl" : "fa-solid fa-bars text-xl"}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-blue-200/80 dark:border-slate-800 flex flex-col space-y-1.5 animate-fadeIn">
          <Link
            to="/"
            className={getNavClass("/")}
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-house text-sm"></i>
            <span>Home</span>
          </Link>

          {auth && (
            <Link
              to="/Notes"
              className={getNavClass("/Notes")}
              onClick={() => setMenuOpen(false)}
            >
              <i className="fa-solid fa-circle-plus text-sm"></i>
              <span>Create Blog</span>
            </Link>
          )}

          <Link
            to="/about"
            className={getNavClass("/about")}
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-circle-info text-sm"></i>
            <span>About</span>
          </Link>

          {auth ? (
            <Link
              to="/Account"
              className="flex items-center space-x-3 px-4 py-2 text-blue-900 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-slate-800 rounded-xl transition font-semibold text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <img
                src={avatarSrc}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover border border-blue-400"
              />
              <span>My Account ({user?.name || "Profile"})</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm text-center transition"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
