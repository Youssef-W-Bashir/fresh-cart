import React from "react";
import MainSlider from "../MainSlider/MainSlider";

export default function LuxuryHeroSection() {
  return (
    <section className="">
      <MainSlider />

      <div className="md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 md:p-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <i className="fa-solid fa-truck-fast text-base"></i>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Free Delivery</h4>
            <p className="text-[11px] text-slate-500">Orders over 2000EGP</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <i className="fa-solid fa-shield-halved text-base"></i>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Secure Payment</h4>
            <p className="text-[11px] text-slate-500">100% Protected</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <i className="fa-solid fa-rotate-left text-base"></i>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Easy Returns</h4>
            <p className="text-[11px] text-slate-500">30-Day Money Back</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <i className="fa-solid fa-headset text-base"></i>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">24/7 Support</h4>
            <p className="text-[11px] text-slate-500">Dedicated Service</p>
          </div>
        </div>
      </div>
    </section>
  );
}
