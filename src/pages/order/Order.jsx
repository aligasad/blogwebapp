import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { useData } from "../../context/data/MyState";
import NoOrderFound from "../../components/noorder/NoOrderFound";
import { ArrowBigDown } from "lucide-react";

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
                  className={`rounded-2xl shadow-xl border overflow-hidden ${
                    mode === "dark"
                      ? "bg-[#23272f] border-gray-700"
                      : "bg-white border-gray-200"
                  } transition hover:scale-[1.02]`}
                >
                  {/* Header */}
                  <div
                    className={`p-4 flex items-center justify-between ${
                      mode === "dark" ? "bg-[#1d2027]" : "bg-gray-50"
                    }`}
                  >
                    
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full  ${
                      order.paymentId === 'COD' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                    }`}>
                      {order.paymentMethod}
                    </span>
                    <span className="text-xs text-gray-500">{order.date}</span>
                  </div>

                  {/* Product List */}
                  <div className="relative h-33 overflow-y-auto scrollbar-hide  divide-y">
                    {order.cartItems.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          window.location.href = `productInfo/${item.id}`;
                        }}
                        className="group flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-[#2b2f38] transition"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg shadow"
                        />
                        <div className="flex-1">
                          <h2 className="text-sm group-hover:text-rose-400 font-semibold">
                            {item.title}
                          </h2>
                          <p className="text-[11px] group-hover:text-rose-200 text-gray-500">
                            {item.category}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-green-600">
                              ${item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-xs line-through group-hover:text-gray-200 text-gray-400">
                                ${item.originalPrice}
                              </span>
                            )}
                            <span className="text-[13px] font-bold group-hover:text-red-500 text-rose-800">
                              x {item.quan}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total Section */}
                  <div className="p-4 border-t dark:border-gray-700 flex justify-between items-center">
                    <span className="text-sm font-semibold">Total Amount:</span>
                    <span className="text-lg font-bold text-green-600">
                      $
                      {order.cartItems.reduce(
                        (acc, item) => acc + item.price * item.quan,
                        0
                      )}
                    </span>
                  </div>

                  {/* Shipping Info */}
                  <div className="p-4 border-t text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <p>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 line-clamp-1">
                        Shipping to:
                      </span>{" "}
                      {order.addressInfo?.name}, {order.addressInfo?.address}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Pincode:
                      </span>{" "}
                      {order.addressInfo?.pincode}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Phone:
                      </span>{" "}
                      {order.addressInfo?.phoneNumber}
                    </p>
                    <p className="flex items-center gap-1">
                      Delivary Expected by:{" "}
                      <div>
                        {order.deliveryDate
                          ? (() => {
                              const today = new Date();
                              const delivery = new Date(order.deliveryDate);

                              // Din ke level par compare karne ke liye time reset
                              today.setHours(0, 0, 0, 0);
                              delivery.setHours(0, 0, 0, 0);

                              const diffInDays =
                                (delivery - today) / (1000 * 60 * 60 * 24);

                              // Agar delivery ho chuki hai aur status "success" hai
                              if (order.status?.toLowerCase() === "success") {
                                return (
                                  <span className="font-semibold text-green-600 text-[13px]">
                                    Delivered
                                  </span>
                                );
                              }

                              // Agar delivery date guzar gayi aur success nahi hua
                              if (
                                delivery < today &&
                                order.status?.toLowerCase() !== "success"
                              ) {
                                return (
                                  <span className="font-bold text-rose-700">
                                    Cancelled
                                  </span>
                                );
                              }

                              // Agar delivery date future me hai aur abhi tak success nahi
                              if (
                                delivery > today &&
                                order.status?.toLowerCase() !== "success"
                              ) {
                                if (diffInDays === 0) {
                                  return "Today";
                                } else if (diffInDays === 1) {
                                  return "Tomorrow";
                                } else {
                                  return delivery.toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                  });
                                }
                              }

                              return (
                                <span className="font-semibold">
                                  On the Way
                                </span>
                              );
                            })()
                          : "N/A"}
                      </div>
                    </p>
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
