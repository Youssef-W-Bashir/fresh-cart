import React, { useEffect } from "react";
import useCategories from "../../Hooks/useCategories";

export default function Category() {
  let { data, isLoading } = useCategories();

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
                  Categories
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Explore All Categories
              </h1>
            </div>

            {!isLoading && data.length > 0 && (
              <span className="px-4 py-1.5 text-xs font-extrabold text-slate-700 bg-slate-100/80 rounded-2xl border border-slate-200/60 shadow-xs">
                {data.length} Categories
              </span>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm"
              >
                <div className="aspect-square w-full rounded-xl bg-slate-200/80 mb-3"></div>
                <div className="h-4 bg-slate-200/80 rounded-md w-3/4 mx-auto mb-1"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 font-sans">
            {[...data].map((category) => (
              <div
                key={category._id || category.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 shadow-md shadow-slate-200/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"></div>
                </div>

                <div className="mt-3 text-center px-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 truncate">
                    {category.name}
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
