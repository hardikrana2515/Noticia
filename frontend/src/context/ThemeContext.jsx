import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  const applyTheme = (currentTheme) => {
    try {
      const root = document.documentElement;
      const body = document.body;

      if (currentTheme === "dark") {
        root.classList.add("dark");
        body.classList.add("dark");
        root.setAttribute("data-theme", "dark");
        body.setAttribute("data-theme", "dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        body.classList.remove("dark");
        root.setAttribute("data-theme", "light");
        body.setAttribute("data-theme", "light");
        root.style.colorScheme = "light";
      }
      localStorage.setItem("theme", currentTheme);
    } catch (err) {
      console.warn("Theme application error:", err);
    }
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setLight = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setTheme("light");
  };

  const setDark = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setTheme("dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        setLight,
        setDark,
        isDark: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
