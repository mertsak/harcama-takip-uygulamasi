"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Sayfa yüklendiğinde tema durumunu kontrol et
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Dark Mode geçişini yönetme
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between ">
          {/* Logo */}
          <div className="text-xl font-semibold text-indigo-600 dark:text-white">
            FinansApp
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium text-sm dark:text-gray-300 dark:hover:bg-indigo-700 dark:hover:text-white"
            >
              Kategori Ekleme
            </Link>
            <Link
              href="/income-expense"
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium text-sm dark:text-gray-300 dark:hover:bg-indigo-700 dark:hover:text-white"
            >
              Gelir Gider Ekle
            </Link>
            <Link
              href="/report"
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium text-sm dark:text-gray-300 dark:hover:bg-indigo-700 dark:hover:text-white"
            >
              Raporlama ve Analiz
            </Link>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 text-white rounded bg-indigo-600 dark:bg-indigo-700"
            >
              {darkMode ? (
                <FaSun className="text-white" />
              ) : (
                <FaMoon className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium text-sm dark:text-gray-300 dark:hover:bg-indigo-700 dark:hover:text-white"
              >
                Kategori Ekleme
              </Link>
              <Link
                href="/income-expense"
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium text-sm dark:text-gray-300 dark:hover:bg-indigo-700 dark:hover:text-white"
              >
                Gelir Gider Ekle
              </Link>
              <Link
                href="/report"
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium text-sm dark:text-gray-300 dark:hover:bg-indigo-700 dark:hover:text-white"
              >
                Raporlama ve Analiz
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
