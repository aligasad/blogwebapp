import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { useData } from "../../context/data/MyState";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";

const tabs = ["Ingredients", "How to Use", "Reviews"];

const content = {
  Ingredients: [
    {
      title: "Hyaluronic Acid",
      desc: "Deep hydration and plumping",
      percent: "2%",
    },
    {
      title: "Vitamin C",
      desc: "Brightening and antioxidant protection",
      percent: "15%",
    },
    {
      title: "Green Tea Extract",
      desc: "Anti-inflammatory and soothing",
      percent: "5%",
    },
    {
      title: "Jojoba Oil",
      desc: "Natural moisturizing and balancing",
      percent: "10%",
    },
    {
      title: "Aloe Vera",
      desc: "Healing and hydrating properties",
      percent: "8%",
    },
  ],
  "How to Use": [
    "Cleanse your face with a gentle, organic cleanser",
    "Pat skin dry with a clean towel",
    "Apply 2–3 drops of serum to fingertips",
    "Gently massage into face and neck in upward motions",
    "Allow 5–10 minutes for complete absorption",
  ],
  Reviews: [
    {
      name: "Sarah M.",
      text: "This serum transformed my skin in just 2 weeks! My fine lines are visibly reduced and my skin glows.",
    },
    {
      name: "Emma K.",
      text: "Love that it's 100% organic. No irritation on my sensitive skin and the hydration lasts all day.",
    },
    {
      name: "Lisa R.",
      text: "The best investment for my skincare routine. Natural, effective, and the packaging is beautiful!",
    },
  ],
};

// Animation Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, // delay between children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const ProductShow = () => {
  const [activeTab, setActiveTab] = useState("Ingredients");

  const context = useData();
  const { product } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // add to cart if item is not already present -- -- -- -- -- -- -- -- -- -- -- --
  const user = JSON.parse(localStorage.getItem('user'));

  function addCart(product) {
    if(user) {
      const existingItem = cartItems.some((item) =>{
        return item.id === product.id;
      });

      if(!existingItem){
        dispatch(addToCart(product));
        toast.success("Item added to cart");
      } else {
        toast.warning("Item already added!");
      }
    } else {
      toast.warning("please login first");
    }
  }

  useState(()=> {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems])

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto">
      {/* Left Image + Product Info */}
      <div className="w-full lg:w-1/2 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <img
            src="https://i.ibb.co/6JskvgZx/banner2.jpg"
            alt="Serum"
            className="rounded-xl shadow-lg w-full"
          />
        </motion.div>

        {/* Product Info Section */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="bg-white p-5 rounded-xl shadow space-y-3">
            <div className="flex gap-2">
              <span className="bg-green-100 text-[#449474] px-3 py-1 rounded-full text-sm font-medium">
                🌿 100% Organic
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                🧪 Dermatologist Tested
              </span>
            </div>

            <h2 className="text-2xl font-bold text-green-900">
              Pure Organic Facial Serum
            </h2>

            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-sm text-gray-600">(1,247 reviews)</span>
            </div>

            <p className="text-3xl font-bold text-green-800">₹2999</p>

            <button className="w-full cursor-pointer bg-[#449474] text-white font-semibold py-3 rounded-xl hover:bg-[#449474] transition">
              Buy at - ₹3999
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2">
        {/* Tabs */}
        <div className="flex mb-4 gap-2 bg-[#f4f4ee] p-1 rounded-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-1 rounded-sm transition-all ${
                activeTab === tab
                  ? "bg-white text-[#449474] font-semibold  "
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Animated Staggered Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="space-y-4"
          >
            {activeTab === "Ingredients" &&
              content[activeTab].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white p-4 shadow rounded-xl flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-green-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                  <span className="text-[#449474] font-medium bg-green-50 px-3 py-1 rounded-full text-sm">
                    {item.percent}
                  </span>
                </motion.div>
              ))}

            {activeTab === "How to Use" &&
              content[activeTab].map((step, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-green-50 rounded-xl px-4 py-3 flex items-start gap-3"
                >
                  <span className="bg-[#449474] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-700">{step}</p>
                </motion.div>
              ))}

            {activeTab === "Reviews" &&
              content[activeTab].map((review, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white p-4 shadow rounded-xl"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-green-800">
                        {review.name}
                      </p>
                      <span className="bg-green-100 text-[#449474] px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                        <FaCheckCircle className="text-green-500" size={12} />{" "}
                        Verified
                      </span>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.text}</p>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductShow;
