import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import getPoemHook from "../../hooks/poems/getPoemHook";
import { formatDate } from "../../utils/date-format";
import usePoemListStore from "../../setup/stores/PoemListStore";
import Header from "../../reusable-components/header/Header";
import Footer from "../../reusable-components/footer/Footer";

const Poem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { poem, isLoading, fetchOnePoem } = getPoemHook();
  const poemIds = usePoemListStore((state) => state.poemIds);

  const currentIndex = poemIds.indexOf(id);
  const prevId = currentIndex > 0 ? poemIds[currentIndex - 1] : null;
  const nextId =
    currentIndex !== -1 && currentIndex < poemIds.length - 1
      ? poemIds[currentIndex + 1]
      : null;
  const hasNav = poemIds.length > 0;

  useEffect(() => {
    fetchOnePoem(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <Header />
        <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-10 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-24 mb-10" />
          <div className="bg-white/60 rounded-2xl p-8 md:p-12">
            <div className="w-10 h-1 rounded-full bg-gray-200 mb-6" />
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-100 rounded w-1/4 mb-10" />
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 bg-gray-100 rounded ${i % 3 === 0 ? "w-2/3" : "w-full"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <Header />
        <div className="flex-1 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-gray-500 text-lg mb-4">Poem not found.</p>
            <button
              onClick={() => navigate("/poems/list")}
              className="text-purple-500 hover:underline text-sm cursor-pointer"
            >
              Back to poems
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <Header />

      <main className="flex-1 px-4 sm:px-6 py-10 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate("/poems/list")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-600 transition font-medium cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            All Poems
          </button>

          {hasNav && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => prevId && navigate(`/poems/${prevId}`)}
                disabled={!prevId}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-purple-600 hover:bg-purple-50 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              {currentIndex !== -1 && (
                <span className="text-xs text-gray-400 px-1 tabular-nums">
                  {currentIndex + 1} / {poemIds.length}
                </span>
              )}
              <button
                onClick={() => nextId && navigate(`/poems/${nextId}`)}
                disabled={!nextId}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-purple-600 hover:bg-purple-50 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mb-6" />

          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2 leading-tight">
            {poem.title}
          </h1>
          <p className="text-sm font-medium text-purple-500 mb-10">
            By {poem.author}
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-loose whitespace-pre-line font-serif">
            {poem.body}
          </p>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Published {formatDate(poem.createdAt)}
            </p>
          </div>
        </div>

        {hasNav && (
          <div className="flex justify-between items-center mt-8 gap-4">
            <button
              onClick={() => prevId && navigate(`/poems/${prevId}`)}
              disabled={!prevId}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white/60 text-sm text-gray-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Poem
            </button>

            <button
              onClick={() => nextId && navigate(`/poems/${nextId}`)}
              disabled={!nextId}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white/60 text-sm text-gray-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Next Poem <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Poem;
