import React, { useEffect } from "react";
import Loading from "../Loading/Loading";
import RecentProducts from "../RecentProducts/RecentProducts";
import { Link } from "react-router-dom";
import useWishList from "../../Hooks/useWishList";

export default function WishList() {
  let { data: wishListItems, isLoading: loading } = useWishList();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="relative overflow-hidden mb-4 py-5 px-6 rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm text-slate-900">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-600">
                Wishlist
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              My Favorite Items
            </h1>
          </div>

          {wishListItems && (
            <span className="px-4 py-1.5 text-xs font-extrabold text-slate-700 bg-slate-100/80 rounded-2xl border border-slate-200/60 shadow-xs">
              {wishListItems.length}{" "}
              {wishListItems.length === 1 ? "Item" : "Items"}
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center h-[50vh]">
          <Loading />
        </div>
      ) : wishListItems && wishListItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 font-sans text-slate-800">
          {wishListItems.map((product) => (
            <RecentProducts key={product.id || product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-sm">
            <i className="fa-regular fa-heart"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Your wishlist is empty
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Explore products and save your favorite items for later.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white hover:text-white font-bold text-xs rounded-2xl transition-all shadow-md shadow-indigo-600/20 active:scale-95"
          >
            <i className="fa-solid fa-bag-shopping"></i>
            <span>Start Shopping</span>
          </Link>
        </div>
      )}
    </>
  );
}
