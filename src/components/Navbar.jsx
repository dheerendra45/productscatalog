import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth, useDisplayName } from "../auth/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import {
  ShoppingCart,
  Home,
  Moon,
  Sun,
  List,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const name = useDisplayName();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          <List className="mr-2" /> Product Catalog
        </Link>

        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-1 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
              }`
            }
          >
            <Home size={20} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center space-x-1 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
              }`
            }
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
          </NavLink>

          {!user ? (
            <>
              <NavLink
                to="/login"
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500"
              >
                <LogIn size={20} />
                <span>Login</span>
              </NavLink>
              <NavLink
                to="/register"
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500"
              >
                <UserPlus size={20} />
                <span>Register</span>
              </NavLink>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
                  {name
                    ? name[0].toUpperCase()
                    : (user.email?.[0] || "U").toUpperCase()}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {name || user.email}
                </span>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
