import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  const [apiError, setApiError] = useState(null);

  const [loading, setLoading] = useState(false);

  let { setUserData } = useContext(UserContext);

  let navigate = useNavigate();

  async function register(values) {
    try {
      setLoading(true);

      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values,
      );

      localStorage.setItem("userToken", data.token);
      navigate("/");

      setUserData(data.token);
    } catch (error) {
      setApiError(error.response.data.message);
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .matches(
        /^[A-Z]\w{4,15}$/,
        "Password must start with an uppercase letter and be 5-16 characters (e.g. 'Youssef123')",
      )
      .required("Password is required"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),

    phone: Yup.string()
      .matches(
        /^(002)?01[0125][0-9]{8}$/,
        "Phone must be a valid Egyptian number",
      )
      .required("Phone number is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: register,
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
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Sign up now to start shopping
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {apiError && (
              <div
                className="flex items-center gap-2 p-3.5 text-xs font-semibold text-red-700 border border-red-200 rounded-2xl bg-red-50"
                role="alert"
              >
                <i className="fa-solid fa-circle-exclamation text-sm flex-shrink-0"></i>
                <span>{apiError}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white placeholder:text-slate-400"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Jo Waleed"
              />
              {formik.errors.name && formik.touched.name && (
                <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {formik.errors.name}
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
                placeholder="01129041022"
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {formik.errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white placeholder:text-slate-400"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="jowaleed311@gmail.com"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white placeholder:text-slate-400"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="rePassword"
                className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                className="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white placeholder:text-slate-400"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {formik.errors.rePassword}
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
                  <span className="text-sm">Creating Account...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] text-sm"
                >
                  Register
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
