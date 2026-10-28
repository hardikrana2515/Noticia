import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 px-4 sm:px-6 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-blue-100 dark:border-slate-800 space-y-8 transition-colors">
        {/* Header */}
        <div className="border-b border-blue-100 dark:border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-blue-200 dark:border-slate-700 mb-3">
            <i className="fa-solid fa-shield-halved text-xs"></i>
            User Privacy &amp; Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Last updated: October 2026 • Effective immediately
          </p>
        </div>

        {/* Intro */}
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          At <strong>WordLoom</strong>, your privacy and personal data integrity are foundational to everything we build. This Privacy Policy details how we handle account credentials, notes, uploaded avatars, and community content within the application.
        </p>

        {/* Policy Sections */}
        <div className="space-y-6">
          <section className="bg-blue-50/40 dark:bg-slate-800/40 p-6 rounded-2xl border border-blue-100/80 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-blue-950 dark:text-white mb-2 flex items-center gap-2.5">
              <i className="fa-solid fa-user-shield text-blue-600 dark:text-blue-400"></i>
              <span>1. Information We Collect</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              When creating an account, we collect your name, username, email address, and phone number for authentication and identification. Passwords are never saved in plaintext; they are securely salted and hashed using bcrypt before database storage.
            </p>
          </section>

          <section className="bg-blue-50/40 dark:bg-slate-800/40 p-6 rounded-2xl border border-blue-100/80 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-blue-950 dark:text-white mb-2 flex items-center gap-2.5">
              <i className="fa-solid fa-newspaper text-blue-600 dark:text-blue-400"></i>
              <span>2. Notes &amp; Public Blogs</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Blog posts you publish on the community feed are visible to other authenticated users on the home page with your author username and avatar. You retain full ownership of your content: only you have the authorization to update or permanently delete your posts.
            </p>
          </section>

          <section className="bg-blue-50/40 dark:bg-slate-800/40 p-6 rounded-2xl border border-blue-100/80 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-blue-950 dark:text-white mb-2 flex items-center gap-2.5">
              <i className="fa-solid fa-cookie-bite text-blue-600 dark:text-blue-400"></i>
              <span>3. Sessions &amp; Cookies</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We employ secure JSON Web Tokens (JWT) stored in HTTP-only cookies and local session storage. These tokens are used strictly to maintain your active login state and are never shared with or sold to third-party trackers.
            </p>
          </section>

          <section className="bg-blue-50/40 dark:bg-slate-800/40 p-6 rounded-2xl border border-blue-100/80 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-blue-950 dark:text-white mb-2 flex items-center gap-2.5">
              <i className="fa-solid fa-image text-blue-600 dark:text-blue-400"></i>
              <span>4. Media &amp; Profile Images</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Media files uploaded to WordLoom are hosted securely on Cloudinary and optimized for fast, responsive web delivery. Only authenticated users can upload media for their notes and profile avatar.
            </p>
          </section>

          <section className="bg-blue-50/40 dark:bg-slate-800/40 p-6 rounded-2xl border border-blue-100/80 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-blue-950 dark:text-white mb-2 flex items-center gap-2.5">
              <i className="fa-solid fa-sliders text-blue-600 dark:text-blue-400"></i>
              <span>5. Your Rights &amp; Control</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              You maintain total control over your account and data. You may review your account info under the My Account page, update your profile picture at any time, or remove any blog post instantly.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-sm transition flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Back to Home</span>
          </Link>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            WordLoom Privacy Office • All rights reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
