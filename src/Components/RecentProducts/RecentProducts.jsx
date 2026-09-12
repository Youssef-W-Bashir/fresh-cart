import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import useWishList from "../../Hooks/useWishList";

export default function RecentProducts({ product }) {
  const { addToCart } = useContext(CartContext);

  const { addToWishList, deleteItemFromWishList } = useContext(WishListContext);

  let { data: wishListItems } = useWishList();
  let wishListItemIds = wishListItems?.map((item) => item.id);

  let isInWishList = wishListItemIds?.includes(product.id);

  const [isAddingBtn, setIsAddingBtn] = useState(false);
  async function handleAddToCart(productId) {
    if (addToCart) {
      setIsAddingBtn(true);
      await addToCart(productId);
      setIsAddingBtn(false);
    }
  }

  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  async function handleAddToWishList(productId) {
    if (addToWishList) {
      setIsWishlistLoading(true);
      await addToWishList(productId);
      setIsWishlistLoading(false);
    }
  }

  async function handleDeleteItemFromWishList(productId) {
    if (addToWishList) {
      setIsWishlistLoading(true);
      await deleteItemFromWishList(productId);
      setIsWishlistLoading(false);
    }
  }

  return (
    <>
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2.5 sm:p-4 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl hover:shadow-indigo-500/10">
        <button
          type="button"
          onClick={() => {
            !isInWishList
              ? handleAddToWishList(product.id)
              : handleDeleteItemFromWishList(product.id);
          }}
          className={`absolute top-4 right-4 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border shadow-sm transition-all duration-300 active:scale-90 ${
            isInWishList
              ? "bg-rose-500 text-white border-rose-500 shadow-rose-500/30"
              : "bg-white/80 text-slate-600 border-white/60 backdrop-blur-md hover:bg-rose-500 hover:text-white hover:border-rose-500"
          }`}
        >
          {isWishlistLoading ? (
            <i className="fa-solid fa-spinner fa-spin text-xs"></i>
          ) : (
            <i
              className={`${
                isInWishList ? "fa-solid" : "fa-regular"
              } fa-heart text-xs sm:text-sm`}
            ></i>
          )}
        </button>

        <Link to={`/productdetails/${product.id}`} className="block flex-1">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
            <img
              src={product.imageCover}
              alt={product.title}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-10"></div>

            <div className="absolute bottom-2 left-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-white/90 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-emerald-700 shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                In Stock
              </span>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 space-y-2 px-0.5">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
              <span className="font-semibold tracking-wider text-indigo-600 uppercase truncate max-w-[60%]">
                {product.category?.name}
              </span>

              <div className="flex items-center gap-1 shrink-0">
                <i className="fa-solid fa-star text-amber-400"></i>
                <span className="font-bold text-slate-700">
                  ({product.ratingsAverage})
                </span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900 transition-colors duration-200 group-hover:text-indigo-600 sm:text-base line-clamp-1">
              {product.title.split(" ").slice(0, 3).join(" ")}...
            </h3>

            <p className="line-clamp-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
              {product.description.split(" ").slice(0, 7).join(" ")}...
            </p>

            <div className="pt-2 flex items-baseline justify-between border-t border-slate-100">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-extrabold text-slate-900 sm:text-xl">
                  {product.price}
                </span>
                <span className="text-xs font-semibold text-indigo-600">
                  EGP
                </span>
              </div>
            </div>
          </div>
        </Link>

        <button
          onClick={() => handleAddToCart(product.id)}
          disabled={isAddingBtn}
          className="w-full mt-3 text-xs lg:text-base flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isAddingBtn ? (
            <i className="fa-solid fa-spinner fa-spin text-xs md:text-lg"></i>
          ) : (
            <>
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Add To Cart</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
