import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const nav = useNavigate();
  const loc = useLocation();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await login(form.email.trim(), form.password);
      toast.success("Welcome back!");
      const redirectTo = loc.state?.from || "/";
      nav(redirectTo, { replace: true });
    } catch (e) {
      toast.error(e.message || "Login failed");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Sign in
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
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          No account?{" "}
          <Link to="/register" className="text-blue-600">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
