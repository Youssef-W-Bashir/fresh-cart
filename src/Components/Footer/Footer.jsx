import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200/80 bg-slate-900 text-slate-300 font-sans">
      <div className="container px-2 lg:px-4 mx-auto py-8">
        <div className="relative overflow-hidden mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/80 via-slate-800 to-slate-900 border border-slate-800 shadow-xl">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-400">
                Get The Website Link
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Shop faster and easier with our Website!
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                We will send you a link, open it on your phone to use the
                Website.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email Address.."
                className="w-full sm:w-64 px-4 py-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button className="whitespace-nowrap px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl transition-all shadow-md shadow-indigo-600/20 active:scale-95">
                Share Website Link
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
                F
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                FreshCart
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your one-stop destination for fresh groceries, premium quality
              products, and everyday essentials delivered right to your
              doorstep.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[
                "facebook-f",
                "twitter",
                "instagram",
                "linkedin-in",
                "tiktok",
              ].map((icon, idx) => (
                <a
                  key={idx}
                  href={`#`}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center text-xs transition-all duration-300"
                >
                  <i className={`fa-brands fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              {["Products", "Categories", "Brands", "Wishlist", "Cart"].map(
                (item, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="hover:text-indigo-400 text-slate-400 flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-chevron-right text-[8px] text-slate-500"></i>
                      <span>{item}</span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Help & Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                "Contact Us",
                "FAQ",
                "Shipping Policy",
                "Returns & Refunds",
                "Terms of Service",
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#`}
                    className="hover:text-indigo-400 text-slate-400 flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-chevron-right text-[8px] text-slate-500"></i>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Payment Methods
            </h4>
            <div className="flex flex-wrap gap-2 text-2xl text-slate-400">
              <i className="fa-brands fa-cc-visa hover:text-white"></i>
              <i className="fa-brands fa-cc-mastercard hover:text-white"></i>
              <i className="fa-brands fa-cc-paypal hover:text-white"></i>
              <i className="fa-brands fa-cc-apple-pay hover:text-white"></i>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 FreshCart. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-slate-400 text-white">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-400 text-white">
              Terms of Use
            </a>
            <a href="#cookies" className="hover:text-slate-400 text-white">
              Cookie Policy
            </a>
          </div>
        </div>

        <div className="mt-4 py-4 px-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg relative overflow-hidden group">
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500 pointer-events-none"></div>

          <div className="flex items-center gap-3.5 z-10">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/20">
                &yen;
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-400">
                  Designed & Developed By
                </span>
              </div>
              <h5 className="text-sm font-black text-white tracking-wide group-hover:text-indigo-300 transition-colors">
                &yen;oussef Waleed Beshir
              </h5>
            </div>
          </div>

          <div className="flex items-center gap-2 z-10">
            <a
              href="https://github.com/Youssef-W-Bashir"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl bg-slate-700/60 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-bold transition-all duration-300 border border-slate-600/40 flex items-center gap-2 shadow-sm"
            >
              <i className="fa-brands fa-github text-sm"></i>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/youssef-waleed-887072385?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl bg-slate-700/60 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-bold transition-all duration-300 border border-slate-600/40 flex items-center gap-2 shadow-sm"
            >
              <i className="fa-brands fa-linkedin-in text-sm"></i>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
