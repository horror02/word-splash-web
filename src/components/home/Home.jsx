import React from "react";
import Header from "../../reusable-components/header/Header";
import Footer from "../../reusable-components/footer/Footer";
import { Link } from "react-router-dom";
import { BookOpen, Feather } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <Header />

      <main className="flex flex-col items-center justify-center text-center flex-grow px-6 py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-3 border border-white/50 rounded-full shadow-sm">
              <img src="/logo.svg" alt="Word Splash logo" className="w-12 h-12" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-800 mb-6 leading-tight">
            The World Might Not Understand,
          </h1>
          <p className="text-xl md:text-2xl font-light italic text-gray-500 max-w-xl mx-auto mb-10">
            but still, these words make sounds.
          </p>

          <Link
            to="/poems/list"
            className="inline-flex items-center gap-2 bg-purple-500 text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-purple-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" />
            Read My Poems
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
