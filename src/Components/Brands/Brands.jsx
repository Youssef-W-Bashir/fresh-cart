import React, { useEffect } from "react";
import useBrands from "../../Hooks/useBrands";

export default function Brands() {
  let { data, isLoading } = useBrands();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="">
        <div className="relative overflow-hidden mb-4 py-5 px-6 rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm text-slate-900">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-600">
                  Brands
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Explore Top Brands
              </h1>
            </div>

            {!isLoading && data.length > 0 && (
              <span className="px-4 py-1.5 text-xs font-extrabold text-slate-700 bg-slate-100/80 rounded-2xl border border-slate-200/60 shadow-xs">
                {data.length} Brands
              </span>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm flex flex-col items-center justify-center"
              >
                <div className="h-20 w-full rounded-xl bg-slate-200/80 mb-3"></div>
                <div className="h-4 bg-slate-200/80 rounded-md w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 font-sans">
            {[...data].map((brand) => (
              <div
                key={brand._id || brand.id}
                className="group relative flex flex-col items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer"
              >
                <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50/50 p-2 group-hover:bg-white transition-colors duration-300">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="mt-3 text-center w-full">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-700 transition-colors duration-300 group-hover:text-indigo-600 truncate">
                    {brand.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
