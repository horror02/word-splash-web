import React, { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import getAllPoemsHook from "../../hooks/poems/getAllPoemsHook";
import { formatDate } from "../../utils/date-format";
import Header from "../../reusable-components/header/Header";
import Footer from "../../reusable-components/footer/Footer";

const ITEMS_PER_PAGE = 6;

const SkeletonCard = () => (
  <div className="bg-white/60 rounded-2xl p-6 animate-pulse">
    <div className="w-8 h-1 rounded-full bg-gray-200 mb-4" />
    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
    <div className="h-4 bg-gray-100 rounded mb-4 w-1/3" />
    <div className="space-y-2">
      <div className="h-3 bg-gray-100 rounded" />
      <div className="h-3 bg-gray-100 rounded w-4/5" />
      <div className="h-3 bg-gray-100 rounded w-2/3" />
    </div>
  </div>
);

const List = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { poems, totalPages, isLoading, fetchAllPoems } = getAllPoemsHook();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPoems({
      pageSize: ITEMS_PER_PAGE,
      offsetValue: (page - 1) * ITEMS_PER_PAGE,
      search,
    });
  }, [page, search]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <Header />

      {/* Hero */}
      <section className="relative px-6 py-14 md:py-20 overflow-hidden">
        <div className="absolute top-2 left-4 text-purple-200 text-9xl font-serif select-none leading-none opacity-50">"</div>
        <div className="absolute bottom-2 right-6 text-pink-200 text-9xl font-serif select-none leading-none opacity-50 rotate-180">"</div>
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">
            Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-gray-800 mb-4 leading-tight">
            My Poems
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-md">
            The feelings I've accumulated over the years — written in silence, shared in words.
          </p>
        </div>
      </section>

      {/* Search */}
      <div className="px-6 max-w-5xl mx-auto w-full mb-8">
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl px-5 py-3 shadow-sm">
          <Search className="w-4 h-4 text-purple-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by title or content..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
          />
          {search && (
            <button
              onClick={() => { setSearch(""); setPage(1); }}
              className="text-gray-400 hover:text-gray-600 text-xs transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <main className="flex-1 px-6 max-w-5xl mx-auto w-full">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : poems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BookOpen className="w-12 h-12 text-purple-200 mb-4" />
            <p className="text-gray-500 text-lg font-medium">No poems found</p>
            {search && (
              <p className="text-gray-400 text-sm mt-1">
                Try a different search term.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {poems.map((poem) => (
              <div
                key={poem._id}
                onClick={() => navigate(`/poems/${poem._id}`)}
                className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mb-4" />
                <h2 className="text-xl font-serif font-semibold text-gray-800 mb-1 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug">
                  {poem.title}
                </h2>
                <p className="text-xs text-purple-500 font-medium mb-3">{poem.author}</p>
                <p className="text-gray-500 text-sm flex-1 leading-relaxed line-clamp-4">
                  {poem.body}
                </p>
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">{formatDate(poem.createdAt)}</p>
                  <span className="text-xs text-purple-500 font-medium group-hover:underline">
                    Read →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-10 px-6 flex-wrap">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 bg-white/60 text-gray-600 text-sm font-medium hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition ${
                  page === i + 1
                    ? "bg-purple-500 text-white shadow-sm"
                    : "bg-white/60 text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 bg-white/60 text-gray-600 text-sm font-medium hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default List;
