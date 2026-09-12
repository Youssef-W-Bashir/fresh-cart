import React, { useEffect, useState } from "react";
import RecentProducts from "../RecentProducts/RecentProducts";
import useProducts from "../../Hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import useCategories from "../../Hooks/useCategories";

export default function Products() {
  let { productsQuery } = useProducts();
  let { data: products, isLoading } = productsQuery;

  let [searchParams, setSearchParams] = useSearchParams();

  let searchValue = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortRatings, setSortRatings] = useState("default");

  let { data: categories, isLoading: loadingCat } = useCategories();

  let filterProducts = Array.isArray(products)
    ? products.filter((product) => {
        let matchesSearch = product.title
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase());

        let matchesCategory =
          selectedCategory === "all" ||
          product.category?._id === selectedCategory;

        return matchesSearch && matchesCategory;
      })
    : [];

  if (sortRatings === "highToLow") {
    filterProducts.sort(
      (a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0),
    );
  } else if (sortRatings === "lowToHigh") {
    filterProducts.sort(
      (a, b) => (a.ratingsAverage || 0) - (b.ratingsAverage || 0),
    );
  }

  useEffect(() => {
    setSearchParams({});
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  let productsPerPage = 20;

  let startIndex = (currentPage - 1) * productsPerPage;

  let currentProducts = [...filterProducts].slice(
    startIndex,
    startIndex + productsPerPage,
  );

  let totalPages = Math.ceil(filterProducts.length / productsPerPage) || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, selectedCategory, sortRatings]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSortRatings("default");
    setSearchParams({});
  };

  return (
    <>
      <div className="relative font-sans">
        <div className="relative overflow-hidden mb-4 py-5 px-6 rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm text-slate-900">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-600">
                  Products
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                All Products
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-4 mb-4 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-xs">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-xs font-bold text-slate-500 shrink-0">
                Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={loadingCat}
                className="w-full sm:w-auto bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 border border-slate-200 focus:border-indigo-500 focus:outline-none transition-all cursor-pointer disabled:opacity-50"
              >
                <option value="all">All Categories</option>
                {Array.isArray(categories) &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-xs font-bold text-slate-500 shrink-0">
                Sort Rating:
              </label>
              <select
                value={sortRatings}
                onChange={(e) => setSortRatings(e.target.value)}
                className="w-full sm:w-auto bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 border border-slate-200 focus:border-indigo-500 focus:outline-none transition-all cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="highToLow">Highest Rated (High → Low)</option>
                <option value="lowToHigh">Lowest Rated (Low → High)</option>
              </select>
            </div>
          </div>

          {/* Reset Filters Button */}
          {(selectedCategory !== "all" ||
            sortRatings !== "default" ||
            searchValue) && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <i className="fa-solid fa-rotate-left"></i>
              Reset Filters
            </button>
          )}
        </div>

        <div className="flex items-center sticky top-16 md:top-[70px] z-30 justify-between gap-2 py-3 px-4 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-xs text-slate-800 my-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600">
            <span>Page</span>
            <span className="px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold border border-indigo-100">
              {currentPage}
            </span>
            <span>of {totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200 transition-all duration-300 shadow-2xs active:scale-95 disabled:active:scale-100 cursor-pointer disabled:cursor-not-allowed"
            >
              <i className="fa-solid fa-chevron-left text-[10px]"></i>
              <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105"
                      : "bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 border border-slate-200/50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200 transition-all duration-300 shadow-2xs active:scale-95 disabled:active:scale-100 cursor-pointer disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span>
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 font-sans">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm"
              >
                <div className="aspect-square w-full rounded-xl bg-slate-200/80 mb-3"></div>

                <div className="flex items-center justify-between pt-1 mb-2">
                  <div className="h-4 bg-slate-200/80 rounded w-1/4"></div>
                  <div className="h-4 bg-slate-200/80 rounded w-1/5"></div>
                </div>

                <div className="h-3 bg-slate-200/80 rounded w-1/3 mb-2"></div>

                <div className="h-4 bg-slate-200/80 rounded w-3/4 mb-3"></div>

                <div className="h-9 bg-slate-200/80 rounded-xl w-full mt-3"></div>
              </div>
            ))}
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="relative overflow-hidden my-6 py-16 px-6 rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm text-center flex flex-col items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 w-20 h-20 mb-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
              <i className="fa-solid fa-box-open text-3xl"></i>
            </div>

            <h3 className="relative z-10 text-xl font-black text-slate-900 mb-1">
              No Products Found
            </h3>
            <p className="relative z-10 text-sm font-medium text-slate-500 max-w-sm leading-relaxed mb-4">
              We were unable to find any products matching your search or
              filters at the moment.
            </p>
            <button
              onClick={handleResetFilters}
              className="relative z-10 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl border border-indigo-100 transition-all cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 font-sans text-slate-800">
            {[...currentProducts].map((product, index) => (
              <RecentProducts key={index} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
