import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              ShopSmart
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your one-stop shop for the latest products and amazing deals.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  Cart
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Connect With Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} ShopSmart. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
