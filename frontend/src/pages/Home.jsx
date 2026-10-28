import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "../context/UserContext/userContext.js";
import Notes from "../components/Notes.jsx";

const Home = () => {
  const { auth } = useContext(userContext);

  // Unauthenticated visitors are always routed to the public Landing page
  if (!auth) return <Navigate to="/landing" replace />;

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-blue-50/50 via-white to-white py-10 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ─── SECTION A: COMPACT PAGE INTRODUCTION ─────────────────────── */}
        <div className="max-w-2xl text-left space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Publishing Workspace
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-blue-950 tracking-tight leading-tight">
            Discover ideas worth reading.
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Explore stories shared by the community, or find the notes and articles you&apos;ve published.
          </p>
        </div>

        {/* ─── BLOG FEED & TOOLBAR ──────────────────────────────────────── */}
        <Notes />
      </div>
    </div>
  );
};

export default Home;
