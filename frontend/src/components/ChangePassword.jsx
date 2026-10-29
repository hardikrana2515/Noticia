import React, { useState, useContext } from "react";
import userContext from "../context/UserContext/userContext.js";

// Password policy rules — same as Signup
const PASSWORD_RULES = [
  { key: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { key: "upper", label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { key: "number", label: "One number", test: (p) => /[0-9]/.test(p) },
  { key: "special", label: "One special character (@#$&)", test: (p) => /[@#$&]/.test(p) },
];

const validatePassword = (password) =>
  PASSWORD_RULES.every((rule) => rule.test(password));

const PasswordChecklist = ({ password }) => {
  if (!password) return null;
  return (
    <ul className="mt-1.5 space-y-0.5 text-xs">
      {PASSWORD_RULES.map((rule) => {
        const passed = rule.test(password);
        return (
          <li
            key={rule.key}
            className={`flex items-center gap-1.5 ${
              passed
                ? "text-green-600 dark:text-green-400"
                : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <i
              className={`fa-solid ${
                passed ? "fa-circle-check" : "fa-circle"
              } text-[10px]`}
            ></i>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
};

const ChangePassword = () => {
  const { updatePassword } = useContext(userContext);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    if (message.text) setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setMessage({ type: "error", text: "Please fill all password fields" });
      return;
    }

    if (!validatePassword(form.newPassword)) {
      setMessage({ type: "error", text: "New password does not meet the security requirements" });
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    if (form.currentPassword === form.newPassword) {
      setMessage({ type: "error", text: "New password must be different from your current password" });
      return;
    }

    setLoading(true);
    try {
      const res = await updatePassword(form.currentPassword, form.newPassword);
      if (res?.success) {
        setMessage({ type: "success", text: res.message || "Password updated successfully!" });
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage({ type: "error", text: res?.message || "Failed to update password" });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-transparent px-4 py-4 flex items-center justify-center w-full">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-blue-100 dark:border-slate-800 p-6 sm:p-10 transition-colors">
        <div className="flex items-center gap-3 mb-6 border-b border-blue-100 dark:border-slate-800 pb-4">
          <div className="bg-blue-100 dark:bg-slate-800 p-2.5 rounded-xl">
            <i className="fa-solid fa-lock text-blue-600 dark:text-blue-400 text-lg"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-950 dark:text-white">
              Change Password
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded-xl text-sm font-medium text-center ${
              message.type === "success"
                ? "bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-300"
                : "bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-sm"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                id="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                required
                placeholder="Enter your current password"
                className="w-full px-4 py-2.5 pr-10 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 text-sm cursor-pointer"
              >
                <i className={`fa-solid ${showCurrent ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-sm"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                id="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
                minLength={8}
                placeholder="Min 8 characters"
                className="w-full px-4 py-2.5 pr-10 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 text-sm cursor-pointer"
              >
                <i className={`fa-solid ${showNew ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            <PasswordChecklist password={form.newPassword} />
          </div>

          {/* Confirm New Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-blue-950 dark:text-slate-200 font-semibold mb-1 text-sm"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
                placeholder="Re-enter new password"
                className="w-full px-4 py-2.5 pr-10 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50 dark:bg-slate-800 dark:text-white text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 text-sm cursor-pointer"
              >
                <i className={`fa-solid ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {form.confirmPassword && form.newPassword !== form.confirmPassword && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                <i className="fa-solid fa-circle-xmark text-[10px]"></i>
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200 text-sm mt-2 flex justify-center items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                Updating...
              </>
            ) : (
              <>
                <i className="fa-solid fa-shield-halved text-sm"></i>
                Update Password
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;

