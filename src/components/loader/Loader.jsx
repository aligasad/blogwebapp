import React from "react";

function Loader() {
  return (
    <div
      role="status"
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#F4E9D7] to-[#B8C4A9]"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Feather Icon */}
        <svg
          className="w-16 h-16 text-[#D97D55] animate-bounce drop-shadow-md"
          fill="none"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle */}
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#6FA4AF"
            strokeWidth="2.5"
            fill="#F4E9D7"
          />

          {/* Feather pen */}
          <path
            d="M16 30C22 20 30 12 36 10C34 16 28 24 22 32L16 30Z"
            fill="#D97D55"
            stroke="#B8C4A9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pen line */}
          <path
            d="M20 34C22 31 25 27 28 24"
            stroke="#6FA4AF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Soft ring animation */}
        <div className="absolute -inset-2 rounded-full border-2 border-[#6FA4AF] animate-ping opacity-40"></div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xl font-semibold text-[#D97D55] animate-pulse">
          Crafting your story...
        </p>
        <p className="text-sm text-[#6FA4AF] mt-2">
          Please wait while we load your blogging experience.
        </p>
      </div>
    </div>
  );
}

export default Loader;
