import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import useCategories from "../../Hooks/useCategories";

export default function CategoriesSlider() {
  let { data, isLoading } = useCategories();

  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Categories
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Shop By Category
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cat-prev-btn flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-indigo-600 hover:bg-indigo-600 hover:text-white active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous Category"
          >
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <button
            type="button"
            className="cat-next-btn flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-indigo-600 hover:bg-indigo-600 hover:text-white active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next Category"
          >
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center animate-pulse">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-slate-200"></div>
              <div className="h-4 w-20 bg-slate-200 rounded mt-3"></div>
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".cat-next-btn",
            prevEl: ".cat-prev-btn",
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={data?.length > 6}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 14 },
            640: { slidesPerView: 4, spaceBetween: 16 },
            768: { slidesPerView: 5, spaceBetween: 16 },
            1024: { slidesPerView: 6, spaceBetween: 20 },
            1280: { slidesPerView: 7, spaceBetween: 20 },
          }}
          className="py-2"
        >
          {[...data]?.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="group flex flex-col items-center text-center cursor-pointer p-2 rounded-full transition-all duration-300 hover:-translate-y-1">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 overflow-hidden rounded-full border-2 border-slate-100 bg-slate-50 shadow-md transition-all duration-300 group-hover:border-indigo-500 group-hover:shadow-lg group-hover:shadow-indigo-500/10">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="mt-3 text-xs sm:text-sm font-bold text-slate-800 transition-colors duration-200 group-hover:text-indigo-600 line-clamp-1">
                  {category.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
