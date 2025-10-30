import { useEffect } from "react";

export default function Navbar({ theme, toggleTheme }) {
  return (
    <>
      {/* 🌞 LIGHT THEME NAVBAR */}
      {theme === "light" ? (
        <nav className="w-full flex items-center justify-between px-8 py-3 bg-gray-50 border-b border-gray-200 shadow-sm transition-all duration-300">
          {/* Left Logo */}
          <div className="flex items-center gap-2">
            <img
              src="../resources/logo-small.svg"
              alt="App Logo"
              className="w-6 h-6 object-contain"
            />
            <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
              ImageUpload
            </h1>
          </div>

          {/* Right Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition-all"
          >
            <img
              src="../resources/Moon_fill.svg"
              alt="Switch to dark theme"
              className="w-5 h-5 object-contain"
            />
          </button>
        </nav>
      ) : (
        // 🌚 DARK THEME NAVBAR
        <nav className="w-full flex items-center justify-between px-8 py-3 bg-slate-900 border-b border-slate-800 shadow-sm transition-all duration-300">
          {/* Left Logo */}
          <div className="flex items-center gap-2">
            <img
              src="../resources/logo-small.svg"
              alt="App Logo"
              className="w-6 h-6 object-contain brightness-150"
            />
            <h1 className="text-lg font-semibold text-gray-100 tracking-tight">
              ImageUpload
            </h1>
          </div>

          {/* Right Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 bg-slate-800 border border-slate-700 rounded-lg shadow-sm hover:bg-slate-700 transition-all"
          >
            <img
              src="../resources/Sun_fill.svg"
              alt="Switch to light theme"
              className="w-5 h-5 object-contain brightness-125"
            />
          </button>
        </nav>
      )}
    </>
  );
}