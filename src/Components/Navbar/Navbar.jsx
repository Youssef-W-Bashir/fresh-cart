import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import useCart from "../../Hooks/useCart";
import useWishList from "../../Hooks/useWishList";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { data: wishListItems } = useWishList();

  let { data } = useCart();

  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/Login");
  }

  const activeLinkStyle = ({ isActive }) =>
    isActive
      ? "text-indigo-600 px-4 py-2 hover:text-indigo-600 font-bold"
      : "text-slate-600 px-4 py-2 font-semibold";

  const [search, setSearch] = useState("");

  let location = useLocation();

  function handleSearch(e) {
    let value = e.target.value;

    setSearch(value);

    if (value.trim()) {
      navigate(`/products?search=${encodeURIComponent(value.trim())}`);
    } else {
      navigate(`/products`);
    }
  }

  let [searchParams] = useSearchParams();

  useEffect(() => {
    let querySearch = searchParams.get("search");

    if (querySearch) {
      setSearch(querySearch);
    } else {
      setSearch("");
    }
  }, [searchParams]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="container mx-auto px-4 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-4">
            <Link className="flex items-center shrink-0" to="">
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
                  F
                </div>
                <span className="text-xl font-black text-slate-800 tracking-tight">
                  FreshCart
                </span>
              </div>
            </Link>

            {/* Main Navigation Links Desktop */}
            {userData && (
              <ul className="hidden xl:flex items-center gap-6 capitalize text-sm">
                <li>
                  <NavLink to="" className={activeLinkStyle}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="categories" className={activeLinkStyle}>
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="brands" className={activeLinkStyle}>
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink to="products" className={activeLinkStyle}>
                    Products
                  </NavLink>
                </li>
              </ul>
            )}

            {/* Search Bar Desktop & Tablet */}
            {userData && (
              <form className="hidden md:flex flex-1 max-w-xs lg:max-w-md relative items-center">
                <input
                  type="text"
                  placeholder="Search products by Title"
                  value={search}
                  onChange={handleSearch}
                  className="w-full bg-slate-100 text-slate-800 text-xs sm:text-sm rounded-full pl-9 pr-4 py-2 border border-transparent focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
                />
                <i className="fa-solid fa-magnifying-glass absolute left-3 text-slate-400 text-xs"></i>
              </form>
            )}

            <div className="flex items-center gap-2 sm:gap-4">
              {userData ? (
                <>
                  {/* wishList */}
                  <Link
                    to="wishlist"
                    className="relative p-2 text-slate-700 hover:text-rose-500 transition-colors"
                    title="Wishlist"
                  >
                    <i className="fa-solid fa-heart text-xl sm:text-2xl"></i>
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md">
                      {wishListItems?.length || 0}
                    </span>
                  </Link>

                  <Link
                    to="cart"
                    className="relative p-2 text-slate-700 hover:text-indigo-600 transition-colors"
                    title="Shopping Cart"
                  >
                    <i className="fa-solid fa-cart-shopping text-xl sm:text-2xl"></i>
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-md shadow-indigo-600/30">
                      {data?.products?.length || 0}
                    </span>
                  </Link>

                  {/* Logout Button Desktop */}
                  <button
                    onClick={logOut}
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-bold text-rose-600 transition-all hover:bg-rose-600 hover:text-white hover:border-rose-600 active:scale-95 ml-2"
                  >
                    <span>Logout</span>
                    <i className="fa-solid fa-right-from-bracket text-xs"></i>
                  </button>
                </>
              ) : (
                <div className="hidden sm:flex items-center gap-2 text-sm font-semibold capitalize">
                  <Link
                    to="login"
                    className="px-3 py-1.5 text-slate-700 hover:text-indigo-600 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="register"
                    className="rounded-xl bg-indigo-600 px-4 py-1.5 text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-95"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Toggler Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all focus:outline-none"
                aria-label="Toggle Navigation"
              >
                <i
                  className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-base`}
                ></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`xl:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen
                ? "max-h-[500px] opacity-100 mt-3 pt-3 border-t border-slate-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {/* Mobile Search Bar */}
            {userData && (
              <form className="relative mb-3 md:hidden">
                <input
                  type="text"
                  placeholder="Search products by Title"
                  value={search}
                  onChange={handleSearch}
                  className="w-full bg-slate-100 text-slate-800 text-xs rounded-xl pl-9 pr-4 py-2 border border-transparent focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
              </form>
            )}

            {userData ? (
              <div className="flex flex-col gap-2 pb-2 text-center capitalize font-medium text-sm">
                <NavLink
                  to=""
                  onClick={() => setIsOpen(false)}
                  className="py-1.5 text-slate-700 hover:text-indigo-600"
                >
                  Home
                </NavLink>
                <NavLink
                  to="categories"
                  onClick={() => setIsOpen(false)}
                  className="py-1.5 text-slate-700 hover:text-indigo-600"
                >
                  Categories
                </NavLink>
                <NavLink
                  to="brands"
                  onClick={() => setIsOpen(false)}
                  className="py-1.5 text-slate-700 hover:text-indigo-600"
                >
                  Brands
                </NavLink>
                <NavLink
                  to="products"
                  onClick={() => setIsOpen(false)}
                  className="py-1.5 text-slate-700 hover:text-indigo-600"
                >
                  Products
                </NavLink>

                <div className="pt-2 border-t border-slate-100 mt-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logOut();
                    }}
                    className="w-full text-xs font-bold text-rose-600 bg-rose-50 py-2 rounded-xl border border-rose-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pb-2 text-center capitalize font-semibold text-sm">
                <Link
                  to="login"
                  onClick={() => setIsOpen(false)}
                  className="py-2 text-slate-700 hover:text-indigo-600"
                >
                  Log In
                </Link>
                <Link
                  to="register"
                  onClick={() => setIsOpen(false)}
                  className="py-2 rounded-xl bg-indigo-600 text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
