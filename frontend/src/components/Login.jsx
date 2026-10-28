import React, { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import userContext from "../context/UserContext/userContext.js";
import ThemeToggle from "./ThemeToggle";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, auth } = useContext(userContext);

  // Already logged in — send to dashboard
  if (auth) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await login(credentials.email, credentials.password);
      if (res?.success) {
        navigate("/");
      } else {
        setError(res?.message || "Invalid email or password");
      }
    } catch (err) {
      setError(err?.message || "An unexpected error occurred. Please check your backend.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col justify-center items-center py-12 px-4 transition-colors duration-200 relative">
      {/* Top action bar: back + theme toggle */}
      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <Link
          to="/landing"
          className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i>
          Back to home
        </Link>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-blue-100 dark:border-slate-800 transition-colors duration-200">
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="mb-3 hover:scale-105 transition-transform duration-200">
            <img
              src="/wordloom-icon.png"
              alt="WordLoom"
              className="h-16 w-16 rounded-2xl object-contain bg-white dark:bg-slate-800 p-1 shadow-md border border-blue-100 dark:border-slate-700"
            />
          </Link>
          <h2 className="text-2xl font-extrabold text-blue-950 dark:text-white">
            Welcome to <span className="text-blue-600 dark:text-blue-400">WordLoom</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Log in to your creative workspace</p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-sm">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200 text-base mt-2 flex justify-center items-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>

          <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline ml-1">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
