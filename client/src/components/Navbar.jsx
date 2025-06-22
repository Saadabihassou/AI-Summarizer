import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  const [navbar, setNavbar] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        return savedMode === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  async function getNavbar() {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/navbar?populate=*"
      );
      setNavbar(response.data.data);
    } catch (error) {
      console.error("Failed to load navbar:", error);
    }
  }

  useEffect(() => {
    getNavbar();
  }, []);

  useEffect(() => {
    // Apply dark mode class to document element
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!navbar) return <div className="dark:bg-gray-800 dark:text-white">Loading...</div>;

  return (
    <nav className={`flex flex-row justify-between items-center py-4 px-6 md:px-20 border-b-2 ${darkMode ? 'border-orange-400 bg-gray-900 text-white' : 'border-orange-500 bg-white text-gray-800'} shadow-sm`}>
      {/* Logo */}
      <div className="flex flex-row items-center gap-3">
        <img
          src={"http://localhost:1337" + navbar.logo.url}
          alt="Logo"
          className={`w-12 rounded-full border p-1 object-contain ${darkMode ? 'border-orange-400 text-white' : 'border-orange-500'}`}
        />
        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-orange-400 to-pink-400' : 'from-orange-500 to-pink-500'} text-xl font-semibold`}>
          Brevity
        </span>
      </div>

      {/* Quick Links */}
      <div className="flex flex-row gap-6">
        {navbar.quickLinks.map((quickLink) => (
          <div key={quickLink.id} className="relative group">
            <a
              href={quickLink.url}
              className={`${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-700 hover:text-orange-500'} transition font-medium`}
            >
              {quickLink.text}
            </a>
            {/* Border bottom animation */}
            <div className={`absolute bottom-0 left-0 h-[2px] w-0 ${darkMode ? 'bg-orange-400' : 'bg-orange-500'} transition-all duration-300 group-hover:w-full`}></div>
          </div>
        ))}
      </div>

      {/* Right Side - Dark Mode Toggle and Auth Buttons */}
      <div className="flex flex-row gap-4 items-center">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-orange-400 text-yellow-300' : 'focus:ring-orange-500 text-gray-700'}`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>

        {/* Auth Buttons */}
        <SignedOut>
          <SignInButton>
            <button className={`border ${darkMode ? 'border-orange-400 text-orange-400 hover:text-orange-300 hover:bg-gray-800' : 'border-orange-500 text-orange-500 hover:text-orange-600 hover:bg-orange-200'} px-5 py-2 rounded-full duration-300 transition`}>
              Login
            </button>
          </SignInButton>
          <SignUpButton>
            <button className={`${darkMode ? 'bg-orange-400 hover:bg-orange-500' : 'bg-orange-500 hover:bg-orange-600'} text-white px-4 py-2 rounded-full transition`}>
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}