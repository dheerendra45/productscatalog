import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Register() {
  const nav = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (form.password.length < 6)
      return toast.error("Password must be ≥ 6 chars");
    if (form.password !== form.confirm)
      return toast.error("Passwords do not match");
    try {
      await register(form.email.trim(), form.password);
      toast.success("Registered! Please log in.");
      nav("/login");
    } catch (e) {
      toast.error(e.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Create your account
        </h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Confirm password
            </label>
            <input
              type="password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
