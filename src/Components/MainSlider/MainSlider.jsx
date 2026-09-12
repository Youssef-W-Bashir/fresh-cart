import React from "react";
import Slide1 from "../../assets/slider-image-1.jpeg";
import Slide2 from "../../assets/slider-image-2.jpeg";
import Slide3 from "../../assets/slider-image-3.jpeg";

import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

export default function MainSlider() {
  const slides = [
    {
      img: Slide1,
      title: "Title Slide One",
      subtitle: "Subtitle Slide One",
      badge: "Bla Bla bla",
    },
    {
      img: Slide2,
      title: "Title Slide two",
      subtitle: "Subtitle Slide two",
      badge: "Bla Bla bla",
    },
    {
      img: Slide3,
      title: "Title Slide three",
      subtitle: "Subtitle Slide three",
      badge: "Bla Bla bla",
    },
  ];

  return (
    <section className="my-3 md:my-6">
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        <div className="w-full md:w-3/4 overflow-hidden rounded-3xl shadow-xl border border-slate-200/80 bg-slate-900">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            // navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            effect={"fade"}
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="h-[300px] sm:h-[400px] lg:h-[480px] w-full custom-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="relative w-full h-full">
                <img
                  src={slide.img}
                  className="w-full h-full object-cover object-center"
                  alt={slide.title}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent flex flex-col justify-center p-6 sm:p-10 lg:p-14 text-white">
                  <span className="self-start rounded-full bg-indigo-600/90 px-3.5 py-1 text-xs font-semibold text-indigo-100 backdrop-blur-md shadow-md mb-3">
                    {slide.badge}
                  </span>

                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-lg leading-tight">
                    {slide.title}
                  </h2>

                  <p className="mt-2 text-xs sm:text-base text-slate-300 max-w-md line-clamp-2">
                    {slide.subtitle}
                  </p>

                  <div className="mt-6">
                    <Link
                    to={"/products"}
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 shadow-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 active:scale-95"
                    >
                      <span>Shop Now</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-4">
          <div className="relative group w-1/2 md:w-full h-[140px] sm:h-[190px] md:h-[232px] overflow-hidden rounded-3xl shadow-md border border-slate-200/80 bg-slate-100">
            <img
              src={Slide1}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              alt="Promo Banner 1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] sm:text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Category
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold truncate">
                Special Vegetables
              </h3>
            </div>
          </div>

          <div className="relative group w-1/2 md:w-full h-[140px] sm:h-[190px] md:h-[232px] overflow-hidden rounded-3xl shadow-md border border-slate-200/80 bg-slate-100">
            <img
              src={Slide2}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              alt="Promo Banner 2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] sm:text-xs font-bold text-rose-400 uppercase tracking-wider">
                Category
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold truncate">
                Wafer Rolls
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
