import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import userContext from "../context/UserContext/userContext";

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
      ? "px-4 py-2 rounded-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition duration-200 font-semibold text-sm flex items-center gap-2"
      : "px-4 py-2 rounded-xl text-blue-900 hover:bg-blue-100 transition duration-200 font-semibold text-sm flex items-center gap-2";

  return (
    <header className="bg-gradient-to-r from-blue-200 via-blue-100 to-white backdrop-blur-md text-blue-900 px-4 sm:px-8 py-3.5 sticky top-0 z-40 shadow-sm border-b border-blue-200/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="relative">
            <img
              src="/logo1.png"
              alt="Noticia"
              className="h-10 w-10 sm:h-11 sm:w-11 object-cover rounded-full shadow-md border-2 border-white group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-blue-900 group-hover:text-blue-700 transition-colors">
              Noticia
            </span>
          </div>
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

          {auth && (
            <Link
              to="/Account"
              className="ml-3 pl-3 border-l border-blue-200 flex items-center space-x-2.5 group py-1"
              title="My Account"
            >
              <img
                src={avatarSrc}
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover border-2 border-blue-500 shadow-sm group-hover:ring-2 group-hover:ring-blue-400 transition-all duration-200"
              />
              <span className="text-xs font-bold text-blue-900 group-hover:text-blue-700 transition-colors max-w-[100px] truncate">
                {user?.name || "Account"}
              </span>
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label="Toggle navigation"
          className="md:hidden text-xl p-2 rounded-xl text-blue-800 hover:bg-blue-100 transition focus:outline-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={menuOpen ? "fa-solid fa-xmark text-2xl" : "fa-solid fa-bars text-xl"}></i>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-blue-200/80 flex flex-col space-y-1.5 animate-fadeIn">
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

          {auth && (
            <Link
              to="/Account"
              className="flex items-center space-x-3 px-4 py-2 text-blue-900 hover:bg-blue-100 rounded-xl transition font-semibold text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <img
                src={avatarSrc}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover border border-blue-400"
              />
              <span>My Account ({user?.name || "Profile"})</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
