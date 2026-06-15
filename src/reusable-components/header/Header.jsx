import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-white/40 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <Link
          to="/"
          className="text-xl font-serif font-bold text-purple-600 tracking-wide hover:text-purple-700 transition"
        >
          Word Splash
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/poems/list"
            className="text-sm text-gray-600 hover:text-purple-600 transition font-medium hidden sm:block"
          >
            Poems
          </Link>
          <Link to="/login">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition">
              Login
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
