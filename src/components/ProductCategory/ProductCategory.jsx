import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Serum",
    image: "https://i.ibb.co/FLyGmGsP/Chat-GPT-Image-Jul-26-2025-03-44-48-PM.png",
  },
  {
    name: "Shampoo",
    image: "https://i.ibb.co/Xx4s86fB/neem-Shampoo.jpg",
  },
  {
    name: "Soap",
    image: "https://i.ibb.co/0jHJzYV9/soap1.png",
  },
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/${category.toLowerCase()}`);
  };

  return (
    <div className="px-6 py-5 bg-gradient-to-b from-[#e2fce7] to-[#449474] text-white">
      <h2 className="text-2xl font-bold mb-3 text-center text-[#003d29]">
        Our top Categories
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-1 w-max">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleClick(cat.name)}
              className="bg-white text-black min-w-[140px] rounded-lg overflow-hidden cursor-pointer shadow hover:scale-[1.03] transition-all duration-200"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-[160px] object-cover"
              />
              <div className="text-center py-2 text-sm font-medium">
                {cat.name} →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
