import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { useData } from "../../context/data/MyState";
import NoOrderFound from "../../components/noorder/NoOrderFound";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  const context = useData();
  const { mode, loading, order, calcOffer } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`min-h-screen py-8 px-2 ${
        mode === "dark"
          ? "bg-[#181a20] text-white"
          : "bg-gradient-to-br from-green-50 to-blue-100 text-gray-900"
      }`}
    >
      <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-[#449474] drop-shadow-lg">
        My Orders
      </h1>
      <div className="mx-auto max-w-6xl">
        {loading && <Loader />}
        {order.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {order
              .filter((obj) => obj.userid === userid)
              .map((order, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl shadow-xl border border-gray-200 ${
                    mode === "dark"
                      ? "bg-[#23272f] border-gray-700"
                      : "bg-white"
                  } transition hover:scale-[1.02]`}
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-[#449474]">
                        {order.paymentMethod}
                      </span>
                      <span className="text-xs text-gray-400">
                        {order.date}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {order.cartItems.map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-4 items-center border-b pb-4 last:border-b-0"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-lg shadow"
                          />
                          <div className="flex-1">
                            <h2 className="text-lg font-bold">{item.title}</h2>
                            <p className="text-xs text-gray-500 mb-1">
                              {item.category}
                            </p>
                            <p className="text-sm mb-2">{item.description}</p>
                            <div className="flex items-center gap-2 border-b">
                              <span className="text-lg font-bold text-green-600">
                                ${item.price}
                              </span>
                              <span className="text-sm line-through text-gray-600">
                                ${item.originalPrice} 
                              </span>
                              <span className="text-[11px] font-semibold">(No of items - {item.quan})</span>
                            </div>
                            <p><span className="text-[13px] font-semibold">Total Amount: </span> <span className="text-[12px]">{item.quan} x {item.price} = </span> <span className="text-[14px] font-semibold">${item.price * item.quan}</span>  </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-1 text-xs text-gray-500">
                      <span>
                        <span className="font-semibold text-gray-700">
                          Shipping to:
                        </span>{" "}
                        {order.addressInfo?.name}, {order.addressInfo?.address}
                      </span>
                      <span>
                        <span className="font-semibold text-gray-700">
                          Pincode:
                        </span>{" "}
                        {order.addressInfo?.pincode}
                      </span>
                      <span>
                        <span className="font-semibold text-gray-700">
                          Phone:
                        </span>{" "}
                        {order.addressInfo?.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <NoOrderFound />
        )}
      </div>
    </div>
  );
}

export default Order;
