import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/UserContext/userContext.js";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, setLoginMode } = useContext(userContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const res = await login(credentials.email, credentials.password);
    setSubmitting(false);

    if (res?.success) {
      navigate("/");
    } else {
      setError(res?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-10 px-4 min-h-[75vh]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-blue-200">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/user.png"
            alt="User Login"
            className="h-20 w-20 rounded-full mb-3 object-cover shadow"
          />
          <h2 className="text-2xl font-extrabold text-blue-900">Welcome Back</h2>
          <p className="text-sm text-gray-500">Log in to access your notes</p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-blue-900 font-semibold mb-1 text-sm"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-blue-900 font-semibold mb-1 text-sm"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200 text-base mt-2 flex justify-center items-center"
          >
            {submitting ? "Logging in..." : "Log In"}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-600 font-semibold hover:underline ml-1"
              onClick={() => setLoginMode(false)}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
