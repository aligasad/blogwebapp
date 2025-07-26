import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaTint, FaShieldAlt, FaHeart, FaMagic, FaSeedling } from "react-icons/fa";

const benefits = [
  {
    icon: <FaTint className="text-blue-500 w-8 h-8" />,
    title: "Deep Hydration",
    description: "Keeps your skin moisturized and glowing all day with deep natural hydration.",
  },
  {
    icon: <FaHeart className="text-red-400 w-8 h-8" />,
    title: "Anti-Aging Power",
    description: "Reduces wrinkles and fine lines naturally for a youthful appearance.",
  },
  {
    icon: <FaShieldAlt className="text-green-800 w-8 h-8" />,
    title: "100% Chemical-Free",
    description: "Free from parabens, sulfates and other harsh chemicals.",
  },
  {
    icon: <FaLeaf className="text-green-500 w-8 h-8" />,
    title: "Eco-Friendly",
    description: "Made from sustainable and biodegradable ingredients.",
  },
  {
    icon: <FaMagic className="text-yellow-400 w-8 h-8" />,
    title: "Radiant Glow",
    description: "Leaves your skin naturally glowing with a healthy shine.",
  },
  {
    icon: <FaSeedling className="text-pink-400 w-8 h-8" />,
    title: "Gentle Formula",
    description: "Safe for all skin types, even sensitive ones.",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-green-100 via-lime-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-2 text-green-700 mb-4">
            <FaLeaf className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Skincare Benefits</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-green-800 mb-4">
            Why Choose Our <span className="block text-green-600">Organic Serum?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the natural goodness your skin deserves — chemical-free, eco-friendly, and radiantly effective.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-md border hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-50 rounded-full shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-green-800">{item.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Metrics */}
        <motion.div
          className="mt-16 text-center grid grid-cols-2 md:grid-cols-4 gap-6 text-green-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-3xl font-bold">5★</div>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
          <div>
            <div className="text-3xl font-bold">10K+</div>
            <p className="text-sm text-gray-500">Happy Customers</p>
          </div>
          <div>
            <div className="text-3xl font-bold">100%</div>
            <p className="text-sm text-gray-500">Organic</p>
          </div>
          <div>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-gray-500">Side Effects</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
