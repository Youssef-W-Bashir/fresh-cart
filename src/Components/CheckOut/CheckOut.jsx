import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
import * as Yup from "yup";
import useCart from "../../Hooks/useCart";

export default function CheckOut() {
  const [loading, setLoading] = useState(false);
  let { data: cart } = useCart();

  let { checkOutSession } = useContext(CartContext);

  let validationSchema = Yup.object().shape({
    details: Yup.string().required("details is required"),
    city: Yup.string().required("city is required"),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/, "phone must be egyptian number")
      .required("phone is required"),
  });

  async function checkOut(values) {
    let cartId = cart?._id;
    setLoading(true);
    let response = await checkOutSession(values, cartId);

    if (response.status == "success") {
      window.location.href = response.session.url;
    }
    setLoading(false);
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: checkOut,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center py-6">
        <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm font-sans">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-xl">
              <i className="fa-solid fa-credit-card"></i>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Checkout Now
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Enter your shipping details to proceed with payment
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="details"
                className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Address Details
              </label>
              <input
                type="text"
                name="details"
                id="details"
                className="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white placeholder:text-slate-400"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. Building 12, Street 5"
              />
              {formik.errors.details && formik.touched.details && (
                <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {formik.errors.details}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white placeholder:text-slate-400"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. Cairo"
              />
              {formik.errors.city && formik.touched.city && (
                <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {formik.errors.city}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white placeholder:text-slate-400"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. 01012345678"
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {formik.errors.phone}
                </p>
              )}
            </div>

            <div className="pt-2">
              {loading ? (
                <button
                  type="button"
                  disabled
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-2xl opacity-90 cursor-not-allowed"
                >
                  <i className="fas fa-spinner fa-spin"></i>
                  <span className="text-sm">Processing Payment...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] text-sm flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-lock text-xs"></i>
                  <span>Pay Now</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
