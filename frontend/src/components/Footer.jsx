import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-200 via-blue-100 to-white backdrop-blur-sm text-blue-900 text-sm px-6 py-6 shadow-inner mt-auto border-t border-blue-200/80">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <div className="flex items-center space-x-2.5">
          <img
            src="/logo.png"
            alt="Noticia Logo"
            className="h-8 w-8 rounded-full object-cover shadow-sm border border-white"
          />
          <div>
            <span className="font-extrabold text-base tracking-tight text-blue-950">
              Noticia
            </span>
            <span className="text-xs text-blue-700/80 ml-2 hidden sm:inline">
              Personal Notes & Community Blogs
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm font-medium text-blue-800">
          <Link
            to="/"
            className="hover:text-blue-950 transition duration-150"
          >
            Home
          </Link>
          <span className="text-blue-300">•</span>
          <Link
            to="/about"
            className="hover:text-blue-950 transition duration-150"
          >
            About
          </Link>
          <span className="text-blue-300">•</span>
          <Link
            to="/privacy"
            className="hover:text-blue-950 transition duration-150"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-blue-700/80 text-center md:text-right">
          © {new Date().getFullYear()} Noticia. Built with MERN Stack.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
