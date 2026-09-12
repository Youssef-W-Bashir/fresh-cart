import React, { useEffect } from "react";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import LuxuryHeroSection from "../LuxuryHeroSection/LuxuryHeroSection";
import { Link } from "react-router-dom";
import PhotoPhone from "../../assets/photo_phone.jpg";
import useProducts from "../../Hooks/useProducts";

export default function Home() {
  let { productsQuery } = useProducts();
  let { data, isLoading } = productsQuery;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <LuxuryHeroSection />
      <CategoriesSlider />

      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
        Products
      </span>
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
        Best Selling Products
      </h2>

      {isLoading ? (
        <div className="my-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 font-sans">
            {[...Array(6)].map((_, i) => (
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
        </div>
      ) : (
        <div className="my-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 font-sans text-slate-800">
            {[...data]
              .sort((a, b) => b.sold - a.sold)
              .slice(0, 10)
              .map((product, index) => (
                <RecentProducts key={index} product={product} />
              ))}
          </div>
        </div>
      )}

      <hr className="mb-4" />
      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
        Products
      </span>
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
        Top-rated Products
      </h2>

      {isLoading ? (
        <div className="my-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 font-sans">
            {[...Array(6)].map((_, i) => (
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
        </div>
      ) : (
        <div className="my-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 font-sans text-slate-800">
            {[...data]
              .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
              .slice(0, 5)
              .map((product, index) => (
                <RecentProducts key={index} product={product} />
              ))}
          </div>
        </div>
      )}
      <div className="text-center my-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-3 px-8 py-3.5 bg-slate-900 hover:bg-indigo-600 hover:text-white text-white font-extrabold text-xs tracking-wider uppercase rounded-2xl transition-all duration-300 shadow-md hover:shadow-indigo-600/25 active:scale-95"
        >
          <span>Explore All Products</span>
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </Link>
      </div>

      <hr />

      <div className="relative mt-8 md:mt-24 w-full rounded-3xl bg-blue-100 px-6 py-12 md:py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-[280px] border-[6px] border-indigo-400 rounded-3xl overflow-hidden lg:ms-16 shrink-0 md:-mt-24 ">
            <img
              src={PhotoPhone}
              alt="Foodmart App Preview"
              className="w-full drop-shadow-xl"
            />
          </div>

          <div className="flex flex-1 flex-col items-start space-y-5 text-left">
            <h2 className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Shop faster with FreshCart Website
            </h2>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis
              sed ptibus liberolectus nonet psyroin. Amet sed lorem posuere sit
              iaculis amet, ac urna. Adipiscing fames semper erat ac in
              suspendisse iaculis. Amet blandit tortor praesent ante vitae. A,
              enim pretiummi senectus magna. Sagittis sed ptibus liberolectus
              non et psyroin.
            </p>

            <div>
              <Link
                to="/products"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-slate-900 hover:bg-indigo-600 hover:text-white text-white font-extrabold text-xs tracking-wider uppercase rounded-2xl transition-all duration-300 shadow-md hover:shadow-indigo-600/25 active:scale-95"
              >
                <span>Shop Now</span>
                <i className="fa-solid fa-arrow-right text-sm"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
