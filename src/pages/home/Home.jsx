import React, { useContext, useEffect } from "react";
import HeroSection from "../../components/heroSection/Caresol";
import ProductCard from "../../components/productCard/ProductCard";
import Testimonial from "../../components/testimonial/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { Link } from "react-router-dom";
import { useData } from "../../context/data/MyState";
import { motion } from "framer-motion";
import Benefits from "../../components/benefits/Benefits";
import HeroSection2 from "../../components/heroSection/HeroSection2";
import ProductShow from "../../components/heroSection/ProductShow";
import TransformSection from "../../components/heroSection/TransforSection";
import TestimonialAnim from "../../components/testimonial/TestimonialAnim";
import { FaArrowUp } from "react-icons/fa6";
import CategoriesSection from "../../components/ProductCategory/ProductCategory";

function Home() {
  const { resetFilter } = useData();
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function toUp() {
    window.scrollTo(0, 0);
  }

  return (
    <>

    <div className="bg-[#376a55] fixed bottom-6 right-8 w-8 h-10 z-10 grid place-items-center text-white rounded-sm cursor-pointer hover:bg-[#67b55b] " onClick={toUp}> <FaArrowUp /></div>
      <motion.div
        initial={{ opacity: 0, x: -100 }} // start off-screen to the left
        animate={{ opacity: 1, x: 0 }} // move to center
        exit={{ opacity: 0 }} // exit off-screen to the right
        transition={{ duration: 1 }}
      >
        {/* <HeroSection /> */}
        <HeroSection2 />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -100 }} // start off-screen to the left
        animate={{ opacity: 1, x: 0 }} // move to center
        exit={{ opacity: 0 }} // exit off-screen to the right
        transition={{ duration: 1 }}
      >
        <CategoriesSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setIsFirstVisit(false)} // Remove animation after it's done
      >
        <Benefits />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setIsFirstVisit(false)} // Remove animation after it's done
      >
        <ProductShow />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setIsFirstVisit(false)} // Remove animation after it's done
      >
        <TransformSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setIsFirstVisit(false)} // Remove animation after it's done
      >
        <ProductCard />
      </motion.div>

      {/* <ProductApi /> */}
      <div className="flex justify-center md:-mt-10 mb-4 ">
        <Link to={"/allproducts"}>
          <button
            onClick={resetFilter}
            className=" bg-gray-300 px-5 py-2 rounded-xl cursor-pointer"
          >
            See more
          </button>
        </Link>
      </div>

      <TestimonialAnim />
    </>
  );
}

export default Home;
