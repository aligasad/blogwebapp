import React from "react";

function Loader() {
  return (
    <div
      role="status"
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-green-200 dark:from-[#003d29] dark:to-[#048b5e]"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Leaf Icon */}
        <svg
          className="w-16 h-16 text-green-500 animate-bounce drop-shadow-lg"
          fill="none"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44 4C44 4 36 44 8 44C8 44 4 24 44 4Z"
            fill="#4ade80"
            stroke="#22c55e"
            strokeWidth="2"
          />
          <path
            d="M20 38C20 38 24 28 36 12"
            stroke="#166534"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {/* Subtle ring animation */}
        <div className="absolute -inset-2 rounded-full border-2 border-green-200 animate-ping opacity-40"></div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-xl font-bold text-white animate-pulse">
          Bringing Nature to You...
        </p>
        <p className="text-sm text-white mt-2">
          Please wait while we prepare your organic experience!
        </p>
      </div>
    </div>
  );
}

export default Loader;
