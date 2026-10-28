import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-100 via-blue-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 backdrop-blur-sm text-slate-800 dark:text-slate-300 text-sm px-6 py-6 shadow-inner mt-auto border-t border-blue-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center group">
            <img
              src="/wordloom-logo.png"
              alt="WordLoom"
              className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline border-l border-blue-200 dark:border-slate-700 pl-3">
            Personal Notes &amp; Community Blogs
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm font-medium text-blue-900 dark:text-slate-300">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-white transition duration-150"
          >
            Home
          </Link>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <Link
            to="/about"
            className="hover:text-blue-600 dark:hover:text-white transition duration-150"
          >
            About
          </Link>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <Link
            to="/privacy"
            className="hover:text-blue-600 dark:hover:text-white transition duration-150"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 dark:text-slate-400 text-center md:text-right">
          © {new Date().getFullYear()} WordLoom. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
