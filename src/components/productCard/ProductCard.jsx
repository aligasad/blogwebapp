import React, { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function ProductCard() {
  const context = useData();

  const {
    product,
    searchkey,
    filterType,
  } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <section
      className="text-gray-600 body-font py-10"
      style={{
        background: "linear-gradient(135deg, #DDF4E7, #67C090, #26667F)",
      }}
    >
      <div className="container px-5 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Our Latest Blogs
          </h1>
          <div className="h-1 w-24 mx-auto bg-white rounded"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {product
            .filter(
              (item) =>
                item.title
                  .toLowerCase()
                  .includes(searchkey.toLowerCase().trim()) ||
                item.subtitle
                  .toLowerCase()
                  .includes(searchkey.toLowerCase().trim())
            )
            .filter((item) =>
              item.category.toLowerCase().includes(filterType.toLowerCase())
            )
            .slice(0, 6)
            .map((item, index) => {
              const {
                title,
                imageUrl,
                category,
                content,
                author,
                id,
                date,
              } = item;

              // Random placeholder description for now
              const description =
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Doloremque, nihil! At ea atque quidem.";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="w-full sm:w-[320px]"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-48 object-cover cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/productinfo/${id}`)
                        }
                      />
                      <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        {category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        {title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">
                        {content || description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author || "John"}`}
                            alt="Author"
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-700">
                              {author || "John Doe"}
                            </p>
                            <p className="text-xs text-gray-400">
                              {date || "2 days ago"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
