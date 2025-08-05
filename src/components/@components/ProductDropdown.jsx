import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const ProductDropdown = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024); // you can adjust breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSelect = (route) => {
    if (route) {
      // Navigate logic
      console.log("Navigate to:", route);
    }
    if (isMobile) setIsOpen(false); // close on mobile after selection
  };

  return (
    <div
      className="relative inline-block text-left group"
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <button
        onClick={() => isMobile && setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-[#003d29] font-bold group-hover:text-[#00823b] transition"
      >
        Products <ChevronDown size={16} className="cursor-pointer" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute mt-3 bg-[#fff8f3] text-gray-800 shadow-lg rounded-xl py-2 px-4 z-50 min-w-[160px] space-y-2 transition duration-300">
          {[
            { name: "Serum", route: "/serum" },
            { name: "Shampoo", route: "/shampoo" },
            { name: "Soap", route: "/soap" },
            { name: "Lip Gloss", route: "/lipgloss" },
            { name: "Chocolates", route: "/organicchocolates" },
            { name: "Candles", route: "/candles" },
          ].map((item) => (
            <li
              key={item.route}
              onClick={() => handleSelect(item.route)}
              className="hover:underline cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductDropdown;
