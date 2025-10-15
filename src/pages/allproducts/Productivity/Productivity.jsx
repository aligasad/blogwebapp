import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "../../../context/data/MyState.jsx";
import { addToCart, deleteFromCart } from "../../../redux/CartSlice.jsx";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa6";
import { motion } from "framer-motion";

function Choclates() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const context = useData();
  const {
    mode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    calcOffer,
    calculateDiscount,
  } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  // add to cart if item is not already present   -- -- --- ---- ------ -----
  const user = JSON.parse(localStorage.getItem("user"));
  const toggleCart = (product) => {
    if (!user) {
      toast.warning("Please login first!");
      return;
    }

    const isInCart = cartItems.some((item) => item.id === product.id);

    if (isInCart) {
      dispatch(deleteFromCart(product));
      toast.info("Item removed from cart");
    } else {
      dispatch(addToCart({ ...product, quan: 1 }));
      toast.success("Item added to cart");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setIsFirstVisit(false)}
      >
        <section
          className="text-gray-600 body-font"
          style={{ backgroundColor: "#F4E9D7" }} // Theme background
        >
          <div className="container px-5 py-8 md:py-16 mx-auto">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
              <h1
                className="sm:text-3xl text-2xl font-medium title-font mb-2"
                style={{
                  color: mode === "dark" ? "white" : "#D97D55", // Primary for light mode
                }}
              >
                Productivity Blogs
              </h1>
              <div
                className="h-1 w-20 rounded"
                style={{ backgroundColor: "#D97D55" }}
              ></div>
            </div>

            <div className="flex flex-wrap justify-start gap-8">
              {product
                .filter((obj) => obj.type.toLowerCase().includes("product"))
                .filter(
                  (item) =>
                    item.title
                      .toLowerCase()
                      .includes(searchkey.toLowerCase().trim()) ||
                    item.subtitle
                      .toLowerCase()
                      .includes(searchkey.toLowerCase().trim()) ||
                    item.type
                      .toLowerCase()
                      .includes(searchkey.toLowerCase().trim()) ||
                    item.category
                      .toLowerCase()
                      .includes(searchkey.toLowerCase().trim())
                )
                .filter((item) =>
                  item.category.toLowerCase().includes(filterType.toLowerCase())
                )
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
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="w-full sm:w-[320px]"
                    >
                      <div
                        className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                        style={{ backgroundColor: "#FFF8F3" }} // Light warm tint for cards
                      >
                        {/* Blog Image */}
                        <div className="relative">
                          <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-48 object-cover cursor-pointer"
                            onClick={() =>
                              (window.location.href = `/bloginfo/${id}`)
                            }
                          />
                          <span
                            className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full shadow-md"
                            style={{
                              backgroundColor: "#6FA4AF",
                              color: "white",
                            }}
                          >
                            {category}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="p-5">
                          <h2
                            className="text-lg font-semibold mb-2"
                            style={{ color: "#D97D55" }}
                          >
                            {title}
                          </h2>
                          <p
                            className="text-sm mb-4"
                            style={{ color: "#6FA4AF" }}
                          >
                            <span className="line-clamp-4">
                              {content || description}
                            </span>{" "}
                            <span
                              className="cursor-pointer font-semibold transition-all duration-100"
                              style={{ color: "#D97D55" }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.color = "#B8C4A9")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.color = "#D97D55")
                              }
                              onClick={() =>
                                (window.location.href = `/bloginfo/${id}`)
                              }
                            >
                              Read More
                            </span>
                          </p>

                          {/* Author Info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                                  author || "John"
                                }`}
                                alt="Author"
                                className="w-8 h-8 rounded-full border"
                                style={{ borderColor: "#B8C4A9" }}
                              />
                              <div>
                                <p
                                  className="text-sm font-semibold"
                                  style={{ color: "#6FA4AF" }}
                                >
                                  {author || "John Doe"}
                                </p>
                                <p
                                  className="text-xs"
                                  style={{ color: "#B8C4A9" }}
                                >
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
      </motion.div>
    </>
  );
}

export default Choclates;
