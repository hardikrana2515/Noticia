import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import userContext from "../context/UserContext/userContext.js";
import ThemeToggle from "./ThemeToggle";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signup, setLoginMode, auth } = useContext(userContext);

  if (auth) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (credentials.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (credentials.password !== credentials.cpassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      const res = await signup(
        credentials.email,
        credentials.phone,
        credentials.name,
        credentials.username,
        credentials.password
      );

      if (res?.success) {
        setSuccessMsg("Account created! Redirecting to login...");
        setTimeout(() => {
          setLoginMode(true);
          window.location.href = "/login";
        }, 1500);
      } else {
        setError(res?.message || "Registration failed. Please check your details.");
      }
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col justify-center items-center py-12 px-4 transition-colors duration-200">
      {/* Top action bar: back + theme toggle */}
      <div className="w-full max-w-lg flex items-center justify-between mb-6">
        <Link
          to="/landing"
          className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i>
          Back to home
        </Link>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-100 dark:border-slate-800 transition-colors duration-200">
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="mb-2 hover:scale-105 transition-transform duration-200">
            <img
              src="/wordloom-icon.png"
              alt="WordLoom"
              className="h-16 w-16 rounded-2xl object-contain bg-white dark:bg-slate-800 p-1 shadow-md border border-blue-100 dark:border-slate-700"
            />
          </Link>
          <h2 className="text-2xl font-extrabold text-blue-950 dark:text-white">
            Join <span className="text-blue-600 dark:text-blue-400">WordLoom</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Start crafting your notes and stories</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium text-center">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-300 text-sm font-medium text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-sm">
              Phone Number (10 digits)
            </label>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              id="phone"
              value={credentials.phone}
              minLength={10}
              maxLength={10}
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              required
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-sm">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                id="name"
                value={credentials.name}
                required
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-sm">
                Username
              </label>
              <input
                type="text"
                placeholder="johndoe"
                id="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-sm">
                Password
              </label>
              <input
                type="password"
                placeholder="Min 6 characters"
                id="password"
                minLength={6}
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
              />
            </div>

            <div>
              <label htmlFor="cpassword" className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-sm">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter password"
                id="cpassword"
                minLength={6}
                value={credentials.cpassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200 text-base mt-2 flex justify-center items-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline ml-1">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
