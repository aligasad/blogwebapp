import React from "react";
import { motion } from "framer-motion";

const infoCards = [
  {
    icon: "🛡️",
    title: "30-Day Guarantee",
    description: "Not satisfied? Get your money back, no questions asked.",
  },
  {
    icon: "🚚",
    title: "Free Shipping",
    description: "Free worldwide shipping on all orders over $50.",
  },
  {
    icon: "🔁",
    title: "Easy Returns",
    description: "Simple and hassle-free return process.",
  },
  {
    icon: "🌿",
    title: "Premium Quality",
    description: "Highest quality organic ingredients, guaranteed.",
  },
];

const TransformSection = () => {
  return (
    <div className="bg-[#3a9a72] text-white py-20 px-6 md:px-16 text-center">
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Ready to Transform <br /> Your Skin?
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-100 mt-4 max-w-2xl mx-auto">
        Join thousands of satisfied customers who have discovered the power of
        organic skincare. Your skin deserves the best nature has to offer.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <button className="bg-[#f9e089] text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition">
          ✨ Order Now - $89.99
        </button>
        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
          View Ingredients
        </button>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-sm">
        {infoCards.map((card, index) => (
          <InfoCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 text-center shadow-md border hover:shadow-xl transition duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="bg-[#4aa87f] rounded-xl p-6 hover:shadow-md transform hover:scale-103 transition-all duration-300 ease-in-out">
        <div className="text-2xl mb-2">{icon}</div>
        <h3 className="text-base font-bold mb-1">{title}</h3>
        <p className="text-sm text-gray-100">{description}</p>
      </div>
    </motion.div>
  );
};

export default TransformSection;
