import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-300 to-white backdrop-blur-sm text-blue-800 text-sm px-6 py-4 flex flex-col md:flex-row justify-between items-center w-full  h-auto shadow-inner mt-auto border-t border-blue-100">

      <div className="flex items-center space-x-2 mb-2 md:mb-0">
        <img src="/logo.png" alt="iNotebook Logo" className="h-10 w-10 rounded-full object-cover shadow" />
        <span className="font-semibold text-lg">Notica</span>
      </div>


      <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 text-sm">
        <Link to="/about" className="hover:text-blue-900 transition duration-300">About</Link>
        <Link to="/privacy" className="hover:text-blue-900 transition duration-300">Privacy Policy</Link>
        <span className="hidden md:inline text-gray-400">|</span>
        <span className="text-gray-500">© {new Date().getFullYear()} iNotebook</span>
      </div>
    </footer>
  );
};

export default Footer;
