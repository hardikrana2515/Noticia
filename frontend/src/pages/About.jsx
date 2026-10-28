import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 px-4 sm:px-6 py-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-blue-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 transition-colors">
          <div className="flex-shrink-0">
            <img
              src="/wordloom-icon.png"
              alt="WordLoom Logo"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl shadow-lg border-4 border-blue-100 dark:border-slate-700 object-contain p-2 bg-white dark:bg-slate-800"
            />
          </div>

          <div className="text-center md:text-left space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-blue-200 dark:border-slate-700">
              Welcome to WordLoom
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-950 dark:text-white tracking-tight">
              Capture Ideas. <span className="text-blue-600 dark:text-blue-400">Weave Stories.</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              WordLoom is your digital loom for crafting personal notes and publishing community blogs.
              Whether you are jotting down daily reflections, documenting technical patterns, or weaving your insights for fellow learners — WordLoom keeps your writing organized, secure, and accessible.
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white">
              What Sets WordLoom Apart
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Built with care for writers, students, engineers, and creative thinkers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100/80 dark:border-slate-800 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-feather"></i>
              </div>
              <h3 className="text-lg font-bold text-blue-950 dark:text-white mb-2">
                Effortless Writing &amp; Editing
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                A clean, distraction-free writing flow with tags, Cloudinary banner uploads, inline previews, instant modal updates, and real-time state synchronization.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100/80 dark:border-slate-800 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-globe"></i>
              </div>
              <h3 className="text-lg font-bold text-blue-950 dark:text-white mb-2">
                Public Community Blogs
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Read, discover, and learn from articles published by other community members on the public home feed.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100/80 dark:border-slate-800 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="text-lg font-bold text-blue-950 dark:text-white mb-2">
                Rock-Solid Privacy &amp; Auth
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Salted bcrypt passwords, secure JWT sessions, strict author-only edit/delete protection, and protected endpoints.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100/80 dark:border-slate-800 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-cloud"></i>
              </div>
              <h3 className="text-lg font-bold text-blue-950 dark:text-white mb-2">
                Cloud Sync &amp; Media Storage
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Powered by MongoDB with instant cloud persistence and Cloudinary media optimization. Access your notes, profile avatar, and articles anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA & Quote */}
        <div className="text-center space-y-6 pt-4">
          <blockquote className="italic text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            &ldquo;Every thought is a thread. Weave your ideas into stories worth keeping.&rdquo;
          </blockquote>
          <div>
            <Link
              to="/Notes"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 text-sm"
            >
              <i className="fa-solid fa-pencil text-sm"></i>
              Start Writing on WordLoom
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
