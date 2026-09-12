import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50">
          <div className="relative inline-block mb-6">
            <span className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 tracking-tight select-none">
              404
            </span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xs"></div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-100 shadow-inner">
              <i className="fa-solid fa-compass-drafting text-2xl animate-spin-slow"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Page Not Found
            </h1>
            <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Oops! The page you're looking for doesn't exist, might have been
              removed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-200 hover:text-white hover:scale-[1.02] active:scale-[0.98]"
            >
              <i className="fa-solid fa-house text-xs"></i>
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <i className="fa-solid fa-arrow-left text-xs"></i>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
