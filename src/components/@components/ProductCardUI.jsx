import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const ProductCardUI = () => {
  return (
    <div className="w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-lg relative group">
      {/* Full Image Background */}
      <img
        src="https://i.ibb.co/3W0y7vM/shoe.jpg"
        alt="Product"
        className="w-full h-full object-cover"
      />

      {/* Blurred Details Overlay */}
      <div className="absolute bottom-0 left-0 w-full backdrop-blur-lg bg-white/30 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Red Sneakers</h2>
          <button className="text-red-500 hover:text-red-600">
            <AiOutlineDelete size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-700 mt-1">Size: 9</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">$120</span>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 bg-gray-200 rounded-full text-sm">-</button>
            <span className="text-sm">1</span>
            <button className="px-2 py-1 bg-gray-200 rounded-full text-sm">+</button>
          </div>
        </div>
        <button className="mt-3 w-full py-2 bg-yellow-400 rounded-xl font-semibold text-gray-900 hover:bg-yellow-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCardUI;
