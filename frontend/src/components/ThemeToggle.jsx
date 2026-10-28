import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, setLight, setDark } = useTheme();

  return (
    <div
      role="group"
      aria-label="Color theme selector"
      className={`inline-flex items-center p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 shadow-inner transition-colors ${className}`}
    >
      {/* Light Theme Button (Sun) */}
      <button
        type="button"
        onClick={setLight}
        aria-label="Light theme"
        title="Switch to Light Theme"
        className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
          !isDark
            ? "bg-white text-amber-500 shadow-sm font-bold scale-[1.02]"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        }`}
      >
        <i className="fa-solid fa-sun text-sm"></i>
        <span className="hidden sm:inline text-[11px]">Light</span>
      </button>

      {/* Dark Theme Button (Moon) */}
      <button
        type="button"
        onClick={setDark}
        aria-label="Dark theme"
        title="Switch to Dark Theme"
        className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
          isDark
            ? "bg-slate-900 text-blue-400 shadow-sm font-bold scale-[1.02] border border-slate-700/60"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        }`}
      >
        <i className="fa-solid fa-moon text-sm"></i>
        <span className="hidden sm:inline text-[11px]">Dark</span>
      </button>
    </div>
  );
};

export default ThemeToggle;

