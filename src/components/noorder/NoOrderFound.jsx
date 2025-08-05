import React from "react";
import { BsEmojiTear } from "react-icons/bs";

function NoOrderFound() {
  return (
     <div className="min-h-screen flex items-center justify-center bg-[#fefae0] px-4 py-10">
      <div className="w-full max-w-lg text-center bg-white rounded-3xl shadow-lg p-8 relative">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#fef3c7] p-4 rounded-full shadow-md">
            <BsEmojiTear className="text-4xl text-[#d97706]" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#3a3a3a] mb-2">
          No Record Found
        </h2>

        {/* Description */}
        <p className="text-[#5c5c5c] mb-6 text-sm md:text-base leading-relaxed">
          You haven't tried to buy anything yet. <br />
          We offer farm-fresh organic products at the best prices — start shopping today!
        </p>

        {/* Button */}
        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#65a30d] text-white font-semibold rounded-xl hover:bg-[#4d7c0f] transition duration-200"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

export default NoOrderFound;
