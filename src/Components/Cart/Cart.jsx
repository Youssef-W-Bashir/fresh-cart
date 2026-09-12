import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";

export default function Cart() {
  let { updateProductCount, deletProductFromCart } = useContext(CartContext);

  let { data: cartProducts, isLoading } = useCart();

  async function deleteProduct(productId) {
    let response = await deletProductFromCart(productId);
  }

  async function updateCart(productId, count) {
    if (count >= 1) {
      let response = await updateProductCount(productId, count);
    } else {
      deleteProduct(productId);
    }
  }

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
                  Cart
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                The Products you Selected
              </h1>
            </div>

            {cartProducts && (
              <span className="px-4 py-1.5 text-xs font-extrabold text-slate-700 bg-slate-100/80 rounded-2xl border border-slate-200/60 shadow-xs">
                {cartProducts?.products.length}{" "}
                {cartProducts?.products.length === 1
                  ? "Item in Cart"
                  : "Items in Cart"}
              </span>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="w-full flex justify-center items-center h-[50vh]">
            <Loading />
          </div>
        ) : cartProducts?.products?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-6 shadow-sm overflow-hidden">
              <div className="block sm:hidden divide-y divide-slate-100">
                {cartProducts?.products.map((product) => (
                  <div key={product.product.id} className="py-4 flex gap-3">
                    <div className="w-24 h-28 flex-shrink-0 bg-slate-50 rounded-2xl border border-slate-100 p-2 flex items-center justify-center">
                      <img
                        src={product.product.imageCover}
                        className="max-h-full max-w-full object-contain"
                        alt={product.product.title
                          .split(" ")
                          .slice(0, 2)
                          .join(" ")}
                      />
                    </div>

                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/productdetails/${product.product.id}`}
                          className="font-bold text-slate-900 text-sm hover:text-indigo-600 line-clamp-2 leading-snug"
                        >
                          {product.product.title}
                        </Link>

                        <div className="mt-1 text-base font-black text-slate-900">
                          {product.price}{" "}
                          <span className="text-xs font-bold text-indigo-600">
                            EGP
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2">
                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50/50 p-1 gap-2 shadow-sm">
                          <button
                            onClick={() =>
                              updateCart(product.product.id, product.count - 1)
                            }
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 flex items-center justify-center active:scale-95"
                            type="button"
                          >
                            <i className="fa-solid fa-minus text-xs"></i>
                          </button>

                          <span className="w-5 text-center font-bold text-slate-900 text-xs">
                            {product.count}
                          </span>

                          <button
                            onClick={() =>
                              updateCart(product.product.id, product.count + 1)
                            }
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 flex items-center justify-center active:scale-95"
                            type="button"
                          >
                            <i className="fa-solid fa-plus text-xs"></i>
                          </button>
                        </div>

                        <button
                          onClick={() => deleteProduct(product.product.id)}
                          className="px-3 py-1.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold flex items-center gap-1.5 active:scale-95"
                        >
                          <i className="fa-solid fa-trash-can text-xs"></i>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* style for mobile,tablet */}
              <div className="hidden sm:block relative overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600">
                  <thead className="text-xs uppercase font-extrabold text-slate-400 bg-slate-50 border-b border-slate-100 rounded-2xl">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-4 py-3"></th>
                      <th scope="col" className="px-4 py-3 text-center">
                        Quantity
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        Price
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cartProducts?.products.map((product) => (
                      <tr
                        key={product.product.id}
                        className="bg-white hover:bg-slate-50/80"
                      >
                        <td className="py-4 pl-2 pr-4 w-20">
                          <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                            <img
                              src={product.product.imageCover}
                              className="max-h-full max-w-full object-contain"
                              alt={product.product.title
                                .split(" ")
                                .slice(0, 2)
                                .join(" ")}
                            />
                          </div>
                        </td>

                        <td className="px-4 py-4 font-bold text-slate-900">
                          <Link
                            to={`/productdetails/${product.product.id}`}
                            className="hover:text-indigo-600 line-clamp-2"
                          >
                            {product.product.title}
                          </Link>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                updateCart(
                                  product.product.id,
                                  product.count - 1,
                                )
                              }
                              className="w-8 h-8 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center shadow-sm active:scale-95"
                              type="button"
                            >
                              <i className="fa-solid fa-minus text-xs"></i>
                            </button>

                            <span className="w-8 text-center font-bold text-slate-900 text-sm">
                              {product.count}
                            </span>

                            <button
                              onClick={() =>
                                updateCart(
                                  product.product.id,
                                  product.count + 1,
                                )
                              }
                              className="w-8 h-8 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center shadow-sm active:scale-95"
                              type="button"
                            >
                              <i className="fa-solid fa-plus text-xs"></i>
                            </button>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-center font-black text-slate-900 whitespace-nowrap">
                          {product.price}{" "}
                          <span className="text-xs font-semibold text-indigo-600">
                            EGP
                          </span>
                        </td>

                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => deleteProduct(product.product.id)}
                            className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white inline-flex items-center justify-center active:scale-95"
                            title="Remove item"
                          >
                            <i className="fa-solid fa-trash-can text-sm"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm sticky top-28">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4 mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between items-center py-3 border-b border-slate-100 text-slate-600 text-sm">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">
                  {cartProducts?.totalCartPrice} EGP
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100 text-slate-600 text-sm">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>

              <div className="flex justify-between items-center py-4 my-2 text-base font-black text-slate-900">
                <span>Total</span>
                <span className="text-2xl text-indigo-600 font-black">
                  {cartProducts?.totalCartPrice}{" "}
                  <span className="text-xs font-bold text-slate-500">EGP</span>
                </span>
              </div>

              <Link to={"/checkout"}>
                <button className="w-full mt-2 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-600/20 active:scale-[0.98]">
                  <span>Proceed to Checkout</span>
                  <i className="fa-solid fa-arrow-right text-sm"></i>
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center my-8 shadow-sm">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl shadow-md shadow-indigo-600/20"
            >
              <span>Start Shopping</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
