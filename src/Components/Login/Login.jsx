import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useQueryClient } from "@tanstack/react-query";

export default function Login() {
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setUserData } = useContext(UserContext);
  let navigate = useNavigate();

  async function Login(values) {
    try {
      setLoading(true);

      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values,
      );

      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setUserData(data.token);

        await queryClient.invalidateQueries();

        navigate("/");
      }
    } catch (error) {
      setApiError(error?.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email inValid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z]\w{4,15}$/, "password inValid")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: Login,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm font-sans">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-xl">
            <i className="fa-solid fa-right-to-bracket"></i>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
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
              htmlFor="email"
              className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white placeholder:text-slate-400"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="jowaleed311@gmail.com"
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
                <i className="fa-solid fa-triangle-exclamation"></i>
                {formik.errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white placeholder:text-slate-400"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
              />
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
                <i className="fa-solid fa-triangle-exclamation"></i>
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="pt-2">
            {loading ? (
              <button
                type="button"
                disabled
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3.5 px-6 rounded-2xl opacity-90 cursor-not-allowed"
              >
                <i className="fas fa-spinner fa-spin"></i>
                <span className="text-sm">Signing in...</span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
