import React, { useEffect, useState } from "react";
import useGetOrders from "../../Hooks/useGetOrders";
import Loading from "../Loading/Loading";

export default function AllOrders() {
  let { data: orders, isLoading } = useGetOrders();

  const [openOrderIds, setOpenOrderIds] = useState([]);

  let toggleAccordion = (orderId) => {
    if (openOrderIds.includes(orderId)) {
      setOpenOrderIds(openOrderIds.filter((id) => id !== orderId));
    } else {
      setOpenOrderIds([...openOrderIds, orderId]);
    }
  };

  let sortedOrders = orders
    ? [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <div className="relative overflow-hidden mb-4 py-5 px-6 rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm text-slate-900">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-block w-3 h-3 rounded-full bg-indigo-600 animate-pulse"></span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-wide">
              My Orders
            </h1>
          </div>

          <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
            Total Orders: {sortedOrders.length}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center items-center h-[50vh]">
          <Loading />
        </div>
      ) : (
        <>
          {sortedOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 shadow-sm">
              <i className="fa-solid fa-box-open text-5xl text-slate-300 mb-4 block"></i>
              <h2 className="text-xl font-bold text-slate-700">
                No orders found yet!
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Start shopping and place your first order.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedOrders.map((order) => {
                const orderId = order.id || order._id;
                const isOpen = openOrderIds.includes(orderId);

                return (
                  <div
                    key={orderId}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300"
                  >
                    <div
                      onClick={() => toggleAccordion(orderId)}
                      className="bg-slate-50/80 p-4 sm:p-6 cursor-pointer flex flex-wrap items-center justify-between gap-4 hover:bg-slate-100/60 transition-colors select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                            isOpen
                              ? "bg-indigo-600 text-white rotate-180"
                              : "bg-indigo-50 text-indigo-600"
                          }`}
                        >
                          <i className="fa-solid fa-chevron-down text-xs"></i>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400">
                              Order ID:
                            </span>
                            <span className="text-sm font-extrabold text-slate-900">
                              #{order.id}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Placed on:{" "}
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 ml-auto sm:ml-0">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 hidden sm:inline-block">
                          <i className="fa-solid fa-credit-card text-[10px] me-1.5"></i>
                          {order.paymentMethodType === "cash"
                            ? "Cash"
                            : "Online"}
                        </span>

                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            order.isPaid
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                              : "bg-amber-50 text-amber-600 border border-amber-200/60"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Unpaid"}
                        </span>

                        <span className="text-sm font-black text-indigo-600 bg-indigo-50/80 px-3 py-1 rounded-full border border-indigo-100">
                          {order.totalOrderPrice}{" "}
                          <span className="text-[10px]">EGP</span>
                        </span>
                      </div>
                    </div>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 border-t border-slate-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="p-4 sm:p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {order.cartItems?.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50/50"
                              >
                                <div className="w-20 h-20 rounded-xl bg-white border border-slate-200/60 p-2 flex-shrink-0 flex items-center justify-center">
                                  <img
                                    src={item.product?.imageCover}
                                    alt={item.product?.title}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-bold text-slate-800 truncate">
                                    {item.product?.title}
                                  </h4>
                                  <p className="text-xs text-slate-400 mt-1">
                                    Category:{" "}
                                    <span className="text-slate-600 font-medium">
                                      {item.product?.category?.name}
                                    </span>
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs font-semibold text-slate-500">
                                      Qty:{" "}
                                      <span className="text-slate-900 font-bold">
                                        {item.count}
                                      </span>
                                    </span>
                                    <span className="text-sm font-black text-indigo-600">
                                      {item.price} EGP
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="text-xs text-slate-500 space-y-1">
                              <p className="flex items-center gap-1.5">
                                <i className="fa-solid fa-location-dot text-indigo-500"></i>
                                <span>
                                  Deliver to:{" "}
                                  <span className="text-slate-700 font-bold">
                                    {order.shippingAddress?.city || "N/A"}
                                  </span>
                                  {order.shippingAddress?.details
                                    ? ` (${order.shippingAddress.details})`
                                    : ""}
                                </span>
                              </p>
                              <p className="flex items-center gap-1.5">
                                <i className="fa-solid fa-phone text-indigo-500"></i>
                                <span>
                                  Phone:{" "}
                                  <span className="text-slate-700 font-bold">
                                    {order.shippingAddress?.phone || "N/A"}
                                  </span>
                                </span>
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-500">
                                Delivery Status:
                              </span>
                              <span
                                className={`text-xs font-bold px-3 py-1 rounded-full ${
                                  order.isDelivered
                                    ? "bg-indigo-50 text-indigo-600 border border-indigo-200/60"
                                    : "bg-blue-50 text-blue-600 border border-blue-200/60"
                                }`}
                              >
                                {order.isDelivered ? "Delivered" : "Processing"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
