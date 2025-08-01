import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Serum",
    image:
      "https://i.ibb.co/FLyGmGsP/Chat-GPT-Image-Jul-26-2025-03-44-48-PM.png",
  },
  {
    name: "Shampoo",
    image: "https://i.ibb.co/Xx4s86fB/neem-Shampoo.jpg",
  },
  {
    name: "Soap",
    image: "https://i.ibb.co/0jHJzYV9/soap1.png",
  },
  {
    name: "Lip Gloss",
    image:
      "https://4j1nka-ys.myshopify.com/cdn/shop/files/Copilot_20250729_185249.png?v=1753795419&width=713",
  },
  {
    name: "Organic Chocolates",
    image:
      "https://cdn11.bigcommerce.com/s-oyt6pom1dt/images/stencil/1024x1024/uploaded_images/almond-butter-crunch-menu.jpg",
  },
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/${category.toLowerCase().replace(/\s+/g, "")}`);
  };

  return (
    <div className="px-6 py-5 bg-gradient-to-b from-[#e2fce7] to-[#449474] text-white">
      <h2 className="text-3xl font-bold mb-5  text-center text-[#003d29]">
        Our top <span className="text-[#009235] text-4xl">Categories</span>
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        
          <div className="flex gap-4 px-1 w-max">
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                className=""
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  key={cat.name}
                  onClick={() => handleClick(cat.name)}
                  className="bg-white text-black min-w-[140px] rounded-lg overflow-hidden cursor-pointer shadow"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-[160px] w-[100%]  object-cover"
                  />
                  <div className="text-center py-2 text-sm font-medium">
                    {cat.name} →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
