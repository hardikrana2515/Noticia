import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/40 text-gray-800 px-4 sm:px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-blue-100 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <img
              src="/logo1.png"
              alt="Noticia Logo"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl shadow-lg border-4 border-blue-100 object-cover"
            />
          </div>

          <div className="text-center md:text-left space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Welcome to Noticia
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-900 tracking-tight">
              Capture Ideas. <span className="text-blue-600">Share Knowledge.</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Noticia is your modern digital companion for personal note-taking and community blogging.
              Whether you are jotting down daily tasks, documenting architectural patterns, or sharing your insights with other learners — Noticia keeps your content organized, secure, and accessible.
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900">
              What Sets Noticia Apart
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Built with care for writers, students, engineers, and creative thinkers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-7 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100/80 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                <i className="ri-quill-pen-line"></i>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Effortless Writing & Editing
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A clean, distraction-free writing flow with tags, inline previews, instant modal updates, and real-time state synchronization.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100/80 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                <i className="ri-earth-line"></i>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Public Community Blogs
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Read, discover, and learn from articles published by other community members on the public home feed.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100/80 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                <i className="ri-shield-keyhole-line"></i>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Rock-Solid Privacy & Auth
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Salted bcrypt passwords, secure JWT sessions, strict author-only edit/delete protection, and protected endpoints.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100/80 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                <i className="ri-database-2-line"></i>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Cloud Sync & Persistence
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Powered by MongoDB with instant cloud persistence. Access your notes, profile avatar, and articles anytime from any modern browser.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Ribbon */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-3xl p-6 sm:p-8 text-center space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Powered by Modern Technologies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 text-xs font-semibold text-blue-900">
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-xs border border-blue-200">
              React 19
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-xs border border-blue-200">
              Vite
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-xs border border-blue-200">
              Tailwind CSS
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-xs border border-blue-200">
              Node.js & Express 5
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-xs border border-blue-200">
              MongoDB & Mongoose
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-xs border border-blue-200">
              JWT Authentication
            </span>
          </div>
        </div>

        {/* Bottom CTA & Quote */}
        <div className="text-center space-y-6 pt-4">
          <blockquote className="italic text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            "The faintest ink is better than the best memory. Write it down, share your perspective, and build your legacy."
          </blockquote>
          <div>
            <Link
              to="/Notes"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 text-sm"
            >
              <i className="ri-pencil-line text-lg"></i>
              Start Writing on Noticia
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
