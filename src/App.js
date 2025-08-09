import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/cartcontext";
import { AvailabilityProvider } from "./contexts/AvailabilityContext";

import { AuthProvider } from "./auth/AuthContext";
import Navbar from "./components/Navbar";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import Cart from "./components/Cart";
import ProductDetailPage from "./Pages/ProductDetailPage";

// If your Footer is in components:
import Footer from "./components/Footer"; // or keep your existing Footer code inline

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AvailabilityProvider>
            <Router>
              <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Toaster position="top-center" />
                <Navbar />

                <main className="flex-grow container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/product/:id"
                      element={<ProductDetailPage />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </main>

                <Footer />
              </div>
            </Router>
          </AvailabilityProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
