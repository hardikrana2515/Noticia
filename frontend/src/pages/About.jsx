import React from "react";
import logo from "/logo1.png"; // Adjust this path if needed

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Logo & Title */}
          <div className="flex-shrink-0">
            <img src={logo} alt="Noticia Logo" className="w-24 h-24 rounded-full shadow-md" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-blue-800 mb-2">About <span className="text-blue-500">Noticia</span></h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Noticia is your trusted digital companion for capturing thoughts, organizing ideas, and never letting inspiration slip away. Whether you're a student managing class notes, a developer jotting down code snippets, or a thinker writing your daily journal — we’ve got your back.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-300" />

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">✍️ Write & Edit Seamlessly</h3>
            <p>Fast and responsive text editor with formatting tools, tagging, and instant previews. Your words, your flow.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">☁️ Cloud Sync & Secure</h3>
            <p>Notes are safely stored and accessible anytime. No data loss, no stress — privacy-first by design.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">📩 Mail Connectivity</h3>
            <p>Seamlessly connect your email to Noticia. Capture ideas from anywhere, anytime, and keep them organized.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">🧠 Smart & Simple</h3>
            <p>Zero clutter. Just a fast, minimal interface that helps you focus on what really matters — your ideas.</p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-16 text-center">
          <blockquote className="italic text-lg text-gray-500">
            "The faintest ink is better than the best memory. Write it down. Build your legacy."
          </blockquote>
          <p className="mt-4 text-sm text-gray-400">— Team Noticia, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default About;
