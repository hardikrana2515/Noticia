import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/40 text-gray-800 px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-blue-100 space-y-8">
        {/* Header */}
        <div className="border-b border-blue-100 pb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-3">
            <i className="ri-shield-check-line text-sm"></i>
            User Privacy & Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Last updated: October 2026 • Effective immediately
          </p>
        </div>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          At <strong>Noticia</strong>, your privacy and personal data integrity are foundational to everything we build. This Privacy Policy details how we handle account credentials, notes, uploaded avatars, and community content within the application.
        </p>

        {/* Policy Sections */}
        <div className="space-y-6">
          <section className="bg-blue-50/40 p-6 rounded-2xl border border-blue-100/80">
            <h2 className="text-base sm:text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <i className="ri-user-shared-line text-blue-600"></i>
              1. Information We Collect
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              When creating an account, we collect your name, username, email address, and phone number for authentication and identification. Passwords are never saved in plaintext; they are securely salted and hashed using bcrypt before database storage.
            </p>
          </section>

          <section className="bg-blue-50/40 p-6 rounded-2xl border border-blue-100/80">
            <h2 className="text-base sm:text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <i className="ri-article-line text-blue-600"></i>
              2. Notes & Public Blogs
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Blog posts you publish on the community feed are visible to other authenticated users on the home page with your author username and avatar. You retain full ownership of your content: only you have the authorization to update or permanently delete your posts.
            </p>
          </section>

          <section className="bg-blue-50/40 p-6 rounded-2xl border border-blue-100/80">
            <h2 className="text-base sm:text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <i className="ri-cookie-line text-blue-600"></i>
              3. Sessions & Cookies
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We employ secure JSON Web Tokens (JWT) stored in HTTP-only cookies and local session storage. These tokens are used strictly to maintain your active login state and are never shared with or sold to third-party trackers.
            </p>
          </section>

          <section className="bg-blue-50/40 p-6 rounded-2xl border border-blue-100/80">
            <h2 className="text-base sm:text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <i className="ri-image-line text-blue-600"></i>
              4. Media & Profile Images
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Profile images uploaded to Noticia are strictly restricted to image formats (JPEG, PNG, WEBP, GIF) under 5 MB. When you replace your profile picture, earlier versions are automatically deleted from server storage.
            </p>
          </section>

          <section className="bg-blue-50/40 p-6 rounded-2xl border border-blue-100/80">
            <h2 className="text-base sm:text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <i className="ri-user-settings-line text-blue-600"></i>
              5. Your Rights & Control
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              You maintain total control over your account and data. You may review your account info under the My Account page, update your profile picture at any time, or remove any blog post instantly.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition flex items-center gap-1.5"
          >
            <i className="ri-arrow-left-line"></i> Back to Home
          </Link>
          <span className="text-xs text-gray-400">
            Noticia Privacy Office • All rights reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
