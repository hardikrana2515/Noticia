import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import userContext from "../context/UserContext/userContext.js";
import Footer from "../components/Footer.jsx";

/* ─── Minimal & Restrained Landing Navbar ─────────────────────────────────── */
const LandingNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { auth } = useContext(userContext);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo1.png"
            alt="Noticia logo"
            className="h-9 w-9 rounded-full object-cover border border-blue-200 shadow-xs group-hover:scale-105 transition-transform duration-200"
          />
          <span className="font-serif-heading font-bold text-xl text-blue-950 tracking-tight group-hover:text-blue-700 transition-colors">
            Noticia
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-blue-900/90">
          <a
            href="#writing-experience"
            className="hover:text-blue-600 transition-colors py-1"
          >
            The Experience
          </a>
          <a
            href="#personal-notes"
            className="hover:text-blue-600 transition-colors py-1"
          >
            Personal Notes
          </a>
          <a
            href="#publishing-discovery"
            className="hover:text-blue-600 transition-colors py-1"
          >
            Publishing
          </a>
          <a
            href="#community-inspiration"
            className="hover:text-blue-600 transition-colors py-1"
          >
            Inspiration
          </a>
          <a
            href="#talkyy-connection"
            className="hover:text-blue-600 transition-colors py-1"
          >
            Talkyy
          </a>
          <Link
            to="/about"
            className="hover:text-blue-600 transition-colors py-1"
          >
            About
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {auth ? (
            <Link
              to="/"
              className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-xs transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-blue-900 hover:text-blue-600 px-3.5 py-2 transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-2xl shadow-xs hover:shadow-md transition duration-200 flex items-center gap-1.5"
              >
                <span>Start Writing</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="md:hidden text-blue-950 p-2 text-xl focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-blue-100 bg-white px-6 py-5 space-y-4 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-3 text-base font-medium text-blue-950">
            <a
              href="#writing-experience"
              className="hover:text-blue-600 py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              The Experience
            </a>
            <a
              href="#personal-notes"
              className="hover:text-blue-600 py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Personal Notes
            </a>
            <a
              href="#publishing-discovery"
              className="hover:text-blue-600 py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Publishing
            </a>
            <a
              href="#community-inspiration"
              className="hover:text-blue-600 py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inspiration
            </a>
            <a
              href="#talkyy-connection"
              className="hover:text-blue-600 py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Talkyy
            </a>
            <Link
              to="/about"
              className="hover:text-blue-600 py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
          <div className="pt-3 border-t border-blue-50 flex flex-col gap-2.5">
            {auth ? (
              <Link
                to="/"
                className="w-full text-center py-3 bg-blue-600 text-white font-bold rounded-xl shadow-xs"
                onClick={() => setMobileMenuOpen(false)}
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-full text-center py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-xs"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Writing
                </Link>
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 border border-blue-200 text-blue-900 font-semibold rounded-2xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

/* ─── Main Landing Page Component (Sections 1 to 8) ───────────────────────── */
const Landing = () => {
  const { auth } = useContext(userContext);

  // If already authenticated, redirect to home dashboard
  if (auth) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      {/* ─── SECTION 1: NAVIGATION & HERO ─────────────────────────────────── */}
      <LandingNav />

      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white border-b border-blue-100/60"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-20 sm:pt-20 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Editorial Headline, Supporting Copy, and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/80 text-blue-900 text-xs font-semibold tracking-wide">
                <i className="fa-solid fa-pen-nib text-blue-600"></i>
                <span>Personal Notes &amp; Community Blogs</span>
              </div>

              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-blue-950 leading-[1.15] tracking-tight">
                Your thoughts deserve <br className="hidden sm:inline" />
                <span className="text-blue-600 italic">more than a blank page.</span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Keep your ideas close, write about what matters, and share your perspective with a community of readers.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition duration-200 text-sm flex items-center justify-center gap-2 text-center"
                >
                  <span>Start Writing</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
                <a
                  href="#community-inspiration"
                  className="bg-white hover:bg-blue-50/60 text-blue-900 font-bold px-7 py-3.5 rounded-2xl border border-blue-200 hover:border-blue-300 transition duration-200 text-sm flex items-center justify-center gap-2 text-center"
                >
                  <i className="fa-solid fa-book-open-reader text-xs text-blue-600"></i>
                  <span>Explore Blogs</span>
                </a>
              </div>

              {/* Trust & Reassurance details */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 text-xs font-medium text-gray-500 border-t border-blue-100/60">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-check text-green-600"></i>
                  No setup friction
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-check text-green-600"></i>
                  Personal note storage
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-check text-green-600"></i>
                  Open community reader
                </span>
              </div>
            </div>

            {/* Right Column: Hero Lifestyle Photograph (noticia-hero-writer.webp) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border border-blue-200/80 shadow-xl bg-blue-50">
                  <img
                    src="/images/landing/noticia-hero-writer.webp"
                    alt="A young adult thoughtfully writing notes at a sunlit desk near a window"
                    className="w-full h-80 sm:h-96 lg:h-[430px] object-cover object-[75%_center]"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-blue-100 rounded-2xl p-3.5 shadow-md flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-sm flex-shrink-0">
                      <i className="fa-solid fa-feather-pointed"></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-blue-950 truncate">
                        Write in solitude, share with the world
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        Capture daily notes or publish to the feed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─── SECTION 2: THE WRITING EXPERIENCE ────────────────────────────── */}
      <section
        id="writing-experience"
        className="py-20 sm:py-24 bg-white border-b border-blue-100/60"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              The Writing Studio
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-blue-950 mt-2 mb-3">
              From a passing thought to something worth keeping.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Noticia keeps the writing flow straightforward. Give your note a title, organize your thoughts, assign a category tag, and choose whether to keep it as your reference or publish it for fellow thinkers.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50/70 via-white to-blue-50/50 border border-blue-200/90 rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Step-by-step description */}
              <div className="lg:col-span-5 space-y-6">
                <div className="border-l-2 border-blue-500 pl-4 py-1">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 01</span>
                  <h3 className="text-lg font-bold text-blue-950 mt-0.5">Frame your title</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Give your note or article a clear anchor so you can find it later or catch readers&apos; attention.
                  </p>
                </div>

                <div className="border-l-2 border-blue-300 pl-4 py-1">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 02</span>
                  <h3 className="text-lg font-bold text-blue-950 mt-0.5">Write without friction</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    A distraction-free writing box designed for reading comfort, long explanations, or quick code notes.
                  </p>
                </div>

                <div className="border-l-2 border-blue-300 pl-4 py-1">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 03</span>
                  <h3 className="text-lg font-bold text-blue-950 mt-0.5">Tag &amp; Publish</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Group by topic—like <span className="font-semibold text-blue-800">#learning</span>, <span className="font-semibold text-blue-800">#engineering</span>, or <span className="font-semibold text-blue-800">#reflections</span>—and publish instantly to your feed.
                  </p>
                </div>
              </div>

              {/* Right Column: Controlled representation of actual CreateNote Studio */}
              <div className="lg:col-span-7">
                <div className="bg-white border border-blue-200 rounded-2xl p-6 sm:p-7 shadow-md relative">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                        Create a New Blog
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                      Live Studio Preview
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-blue-900 font-semibold mb-1 text-xs">
                        Title
                      </label>
                      <div className="w-full px-3.5 py-2.5 border border-blue-200 rounded-xl bg-blue-50/40 text-blue-950 text-sm font-semibold">
                        Designing clean REST APIs in Express 5
                      </div>
                    </div>

                    <div>
                      <label className="block text-blue-900 font-semibold mb-1 text-xs">
                        Content
                      </label>
                      <div className="w-full px-3.5 py-2.5 border border-blue-200 rounded-xl bg-blue-50/30 text-gray-700 text-xs sm:text-sm leading-relaxed min-h-[90px]">
                        Express 5 simplifies route handling with native Promise support in error middleware. When organizing controllers, keeping business logic segregated from database schemas prevents subtle regressions...
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                      <div>
                        <label className="block text-blue-900 font-semibold mb-1 text-xs">
                          Tag
                        </label>
                        <div className="px-3 py-2 border border-blue-200 rounded-xl bg-blue-50/40 text-blue-800 text-xs font-medium">
                          #webdevelopment
                        </div>
                      </div>

                      <div className="w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm text-center shadow-xs flex items-center justify-center gap-1.5 cursor-default">
                        <i className="fa-solid fa-feather text-xs"></i>
                        <span>Publish Blog</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ─── SECTION 3: PERSONAL NOTES ───────────────────────────────────── */}
      <section
        id="personal-notes"
        className="py-20 sm:py-24 bg-gradient-to-b from-blue-50/40 via-white to-blue-50/30 border-b border-blue-100/60"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Photograph of Personal Note-Taking (noticia-personal-writing.webp) */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border border-blue-200/80 shadow-xl bg-white">
                <img
                  src="/images/landing/noticia-personal-writing.webp"
                  alt="Young professional working on personal reflections and handwritten notes at a tidy desk"
                  className="w-full h-80 sm:h-96 lg:h-[420px] object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-100 shadow-xs text-xs font-bold text-blue-950 flex items-center gap-2">
                  <i className="fa-solid fa-lock text-blue-600 text-[11px]"></i>
                  <span>Author-Owned Workspace</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Value Proposition for Personal Notes */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Personal Workspace
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-blue-950 leading-snug">
                Keep the ideas you don&apos;t want to lose.
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Not every thought needs an audience. Noticia gives you a clean private place to capture lessons from work, study notes, book takeaways, and personal projects.
              </p>

              {/* Concrete writing use-case pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs hover:border-blue-200 transition">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm mb-2">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <h4 className="text-sm font-bold text-blue-950">Learning notes</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Summarize complex papers, programming quirks, or course lectures.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs hover:border-blue-200 transition">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm mb-2">
                    <i className="fa-solid fa-diagram-project"></i>
                  </div>
                  <h4 className="text-sm font-bold text-blue-950">Project logs</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Document technical decisions, ongoing bugs, and architectural thoughts.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs hover:border-blue-200 transition">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm mb-2">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <h4 className="text-sm font-bold text-blue-950">Early ideas</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Jot down raw fragments before developing them into finished writings.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs hover:border-blue-200 transition">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm mb-2">
                    <i className="fa-solid fa-clock-rotate-left"></i>
                  </div>
                  <h4 className="text-sm font-bold text-blue-950">Revisit anytime</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Access your notes from any modern browser with persistent cloud storage.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─── SECTION 4: PUBLISHING & DISCOVERY ────────────────────────────── */}
      <section
        id="publishing-discovery"
        className="py-20 sm:py-24 bg-white border-b border-blue-100/60"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Community Feed
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-blue-950 mt-2 mb-3">
                Your ideas can reach beyond your own page.
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                When you choose to publish, your note appears on the public community timeline. Other members can discover your insights, learn from your experiences, and read your complete post.
              </p>
            </div>

            <div>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition py-2"
              >
                <span>Join to read full articles</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Illustrative Blog Card 1 */}
            <div className="bg-white border border-blue-200/90 shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <img
                      src="/default-user.png"
                      alt="Hardik Rana avatar"
                      className="h-8 w-8 rounded-full object-cover border border-blue-300 shadow-xs flex-shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-xs font-bold text-blue-900 truncate">Hardik Rana</p>
                      <p className="text-[11px] text-gray-500 truncate">@hardik</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                    Public
                  </span>
                </div>

                <h3 className="text-lg font-bold text-blue-900 mb-2 leading-snug">
                  Why I switched to async middleware in Express
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                  Handling Promise rejections manually across dozens of controller files used to cause unhandled exceptions. Adopting the centralized errorHandler simplified debugging significantly.
                </p>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="bg-blue-50 border border-blue-200 text-blue-700 font-medium px-2.5 py-0.5 rounded-lg">
                    #backend
                  </span>
                  <span className="text-gray-400 font-medium text-[11px]">Oct 24, 2026</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <Link
                  to="/signup"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1.5"
                >
                  <span>Read blog</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>

            {/* Illustrative Blog Card 2 */}
            <div className="bg-white border border-blue-200/90 shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <img
                      src="/default-user.png"
                      alt="Priya Shah avatar"
                      className="h-8 w-8 rounded-full object-cover border border-blue-300 shadow-xs flex-shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-xs font-bold text-blue-900 truncate">Priya Shah</p>
                      <p className="text-[11px] text-gray-500 truncate">@priya_ux</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                    Public
                  </span>
                </div>

                <h3 className="text-lg font-bold text-blue-900 mb-2 leading-snug">
                  What writing daily notes taught me about clarity
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                  When you force yourself to summarize thoughts in under three paragraphs, ambiguity vanishes. Good writing is simply disciplined thinking on display.
                </p>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="bg-blue-50 border border-blue-200 text-blue-700 font-medium px-2.5 py-0.5 rounded-lg">
                    #reflection
                  </span>
                  <span className="text-gray-400 font-medium text-[11px]">Oct 20, 2026</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <Link
                  to="/signup"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1.5"
                >
                  <span>Read blog</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>

            {/* Illustrative Blog Card 3 / With Reading Discovery context photograph */}
            <div className="relative rounded-3xl overflow-hidden border border-blue-200/90 shadow-md flex flex-col justify-between bg-blue-900 text-white group">
              <img
                src="/images/landing/noticia-reading-discovery.webp"
                alt="A reader thoughtfully reading an interesting article on a laptop"
                className="absolute inset-0 w-full h-full object-cover object-top opacity-30 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative z-10 p-6 flex flex-col justify-between h-full bg-gradient-to-t from-blue-950 via-blue-950/80 to-transparent">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-blue-300 bg-blue-900/80 px-2.5 py-1 rounded-md border border-blue-700/60 inline-block mb-3">
                    Reader Community
                  </span>
                  <h3 className="text-xl font-serif-heading font-bold text-white mb-2 leading-snug">
                    Learn from writers who share what they build.
                  </h3>
                  <p className="text-blue-100 text-xs sm:text-sm leading-relaxed mb-4">
                    Explore insights across architecture, programming, design, and daily lessons published by members.
                  </p>
                </div>

                <div className="pt-3 border-t border-blue-800/80">
                  <Link
                    to="/signup"
                    className="w-full bg-white text-blue-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-blue-50 transition"
                  >
                    <span>Create Free Account</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─── SECTION 5: IDEAS CONNECT PEOPLE ─────────────────────────────── */}
      <section
        id="ideas-connect"
        className="py-20 sm:py-24 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/60 border-b border-blue-100/60"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Authentic Community Knowledge Sharing Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-blue-200/90 shadow-xl bg-white">
                <img
                  src="/images/landing/noticia-ideas-community.webp"
                  alt="Two diverse students sharing knowledge and discussing an article over a laptop in a library"
                  className="w-full h-80 sm:h-96 lg:h-[430px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-blue-100 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-semibold text-blue-950 leading-snug">
                    &ldquo;Writing something down clarifies it for you; sharing it turns it into a bridge for someone else.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Storytelling */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Human Connection
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-blue-950 leading-tight">
                Different perspectives. <br />
                <span className="text-blue-600 italic">Ideas worth sharing.</span>
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Writing is more than saving data in a database. It is how developers capture solutions to obscure bugs, how learners make sense of difficult subjects, and how people share reflections that resonate with others.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                When you share a note on Noticia, you contribute your genuine perspective to a quiet, focused community timeline free of social noise and distraction.
              </p>

              <div className="pt-2">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-2xl shadow-md hover:shadow-lg transition text-sm"
                >
                  <i className="fa-solid fa-pen-to-square text-xs"></i>
                  <span>Start Your First Note</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─── SECTION 6: COMMUNITY BLOG PREVIEW ───────────────────────────── */}
      <section
        id="community-inspiration"
        className="py-20 sm:py-24 bg-white border-b border-blue-100/60"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl text-left mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Fresh Reads
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-blue-950 mt-2 mb-3">
              A little inspiration for your next idea.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Browse recent excerpts shared by learners, developers, and thinkers in the Noticia community. Click any article to read when you join.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sample Card 1 */}
            <div className="bg-gradient-to-b from-blue-50/50 to-white border border-blue-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <img
                      src="/default-user.png"
                      alt="Aarav Sharma avatar"
                      className="w-7 h-7 rounded-full object-cover border border-blue-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-blue-950">Aarav Sharma</p>
                      <p className="text-[10px] text-gray-400">@aarav_dev</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-blue-100/80 text-blue-800 px-2.5 py-0.5 rounded-full">
                    #architecture
                  </span>
                </div>
                <h3 className="font-bold text-base text-blue-950 mb-2 leading-snug">
                  Separating business logic from Express route controllers
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Moving database interactions into dedicated service methods keeps controllers concise and makes testing without HTTP mocks trivial.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <span className="text-gray-400 text-[11px]">Oct 27, 2026</span>
                <Link
                  to="/signup"
                  className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Read note</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
            </div>

            {/* Sample Card 2 */}
            <div className="bg-gradient-to-b from-blue-50/50 to-white border border-blue-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <img
                      src="/default-user.png"
                      alt="Ananya Roy avatar"
                      className="w-7 h-7 rounded-full object-cover border border-blue-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-blue-950">Ananya Roy</p>
                      <p className="text-[10px] text-gray-400">@ananya_design</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-blue-100/80 text-blue-800 px-2.5 py-0.5 rounded-full">
                    #reflections
                  </span>
                </div>
                <h3 className="font-bold text-base text-blue-950 mb-2 leading-snug">
                  The unexpected clarity of writing before designing
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                  When I write down user journeys as simple sentences before opening Figma, edge cases reveal themselves without any wireframe drag.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <span className="text-gray-400 text-[11px]">Oct 25, 2026</span>
                <Link
                  to="/signup"
                  className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Read note</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
            </div>

            {/* Sample Card 3 */}
            <div className="bg-gradient-to-b from-blue-50/50 to-white border border-blue-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <img
                      src="/default-user.png"
                      alt="Devansh Patel avatar"
                      className="w-7 h-7 rounded-full object-cover border border-blue-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-blue-950">Devansh Patel</p>
                      <p className="text-[10px] text-gray-400">@devansh_p</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-blue-100/80 text-blue-800 px-2.5 py-0.5 rounded-full">
                    #learning
                  </span>
                </div>
                <h3 className="font-bold text-base text-blue-950 mb-2 leading-snug">
                  Index strategies for multi-field Mongoose queries
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                  A compound index ordered by equality fields first, then range filters, lowered query latency from 140ms down to 8ms in local benchmarks.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <span className="text-gray-400 text-[11px]">Oct 23, 2026</span>
                <Link
                  to="/signup"
                  className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Read note</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── SECTION 7: TALKYY CROSS-PROMOTION ───────────────────────────── */}
      <section
        id="talkyy-connection"
        className="py-16 sm:py-24 bg-blue-50/40 border-b border-blue-100/60"
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="bg-white border border-blue-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Talkyy Identity, Supplied Logo & Messaging */}
              <div className="md:col-span-7 space-y-5 text-left">
                {/* Talkyy Logo Container with Whitespace */}
                <div className="flex items-center gap-3">
                  <div className="bg-white border border-blue-100/80 rounded-2xl p-2.5 shadow-xs inline-flex items-center">
                    <img
                      src="/images/brand/talkyy-logo.png"
                      alt="Talkyy - A Calmer Space"
                      className="h-9 sm:h-10 w-auto object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800">
                    Real-time conversations
                  </span>
                </div>
                
                <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-blue-950 leading-snug">
                  Some ideas are written. <br />
                  <span className="text-blue-600 italic">Others are conversations.</span>
                </h2>
                
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Noticia gives your ideas a place to grow. Talkyy gives your conversations a place to happen. Discover another way to connect.
                </p>

                <div className="pt-2">
                  <a
                    href="https://live-chat-app-alpha.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-blue-200 text-blue-900 font-bold text-xs sm:text-sm bg-white hover:bg-blue-50 hover:border-blue-300 transition shadow-xs group"
                  >
                    <span>Explore Talkyy</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                  </a>
                </div>
              </div>

              {/* Right Column: Talkyy Lifestyle / Atmosphere Visual */}
              <div className="md:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-blue-200/70 shadow-xs bg-blue-50">
                  <img
                    src="/images/landing/talkyy-promotion-lifestyle.webp"
                    alt="Two young adults having a friendly conversation at a modern cafe with smartphones"
                    className="w-full h-60 sm:h-72 object-cover"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-blue-100 text-xs font-semibold text-blue-950 flex items-center justify-between shadow-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Talkyy App
                    </span>
                    <span className="text-blue-600 font-medium text-[11px]">Chats &amp; Video Calls</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ─── SECTION 8: CLOSING CTA ───────────────────────────────────────── */}
      <section
        id="closing-cta"
        className="py-20 sm:py-28 bg-gradient-to-b from-white via-blue-50/50 to-blue-50/80 text-center"
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Start Today
          </span>
          
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-blue-950 leading-tight">
            Your next idea starts here.
          </h2>
          
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Write something worth keeping. Share something worth reading.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition duration-200 text-sm flex items-center justify-center gap-2"
            >
              <span>Start Writing</span>
              <i className="fa-solid fa-feather text-xs"></i>
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto bg-white hover:bg-blue-50 text-blue-900 font-bold px-8 py-3.5 rounded-2xl border border-blue-200 hover:border-blue-300 transition duration-200 text-sm flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
            </Link>
          </div>

          <p className="text-xs text-gray-400 pt-2">
            Free forever for personal notes &amp; community blogging.
          </p>
        </div>
      </section>


      {/* ─── EXISTING FOOTER INTEGRATION ──────────────────────────────────── */}
      <Footer />
    </div>
  );
};

export default Landing;
