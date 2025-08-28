import React from "react";
import { motion } from "framer-motion";
import { Leaf, Droplets } from "lucide-react";
import serumBottle from "../../assets/heroImg.png";
import leaf1 from "../../assets/leaves.png";
import leaf2 from "../../assets/leaves2.png";
import HeroVideo from "../../assets/HeroVideo.mp4";
import { Link, useNavigate } from "react-router-dom";

const HeroSection2 = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-[#e2fce7] overflow-hidden py-16 px-6 md:px-20">
      {/* Floating leaves */}
      <img src={leaf1} className="leaf floating-1 " alt="leaf" />
      <img src={leaf2} className="leaf floating-2" alt="leaf" />

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 z-10"
        >
          <div className="flex items-center text-sm text-green-700 font-semibold gap-2 mb-2">
            <Leaf className="w-4 h-4" />
            100% ORGANIC & NATURAL
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#449474] mb-4 leading-tight">
            Zaphira{" "}
            <span className="bg-gradient-to-r from-green-500 via-orange-600 to-green-600 bg-clip-text text-transparent ">
              Organic
            </span>{" "}
            <br /> Facial Products
          </h1>

          <p className="text-md text-gray-600 mb-6 max-w-md">
            “<span className="text-amber-500 font-semibold">Pure nature in every drop</span> – brighten, hydrate, and protect your
            skin the natural way”
          </p>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-green-800 font-medium">
              <Droplets className="w-4 h-4" />
              Anti-Aging Formula
            </div>
            <div className="flex items-center gap-2 text-green-800 font-medium">
              <Leaf className="w-4 h-4" />
              Chemical-Free
            </div>
          </div>

          <div className="flex gap-4">
            <Link to="/allproducts" className="hover:text-green-700">
              <button className="cursor-pointer bg-[#449474] hover:bg-[#376a55] text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300">
                Shop Now 🌿
              </button>
            </Link>
            <Link to={"/about"} className="hover:text-green-700">
              <button className="border cursor-pointer border-green-700 text-green-700 hover:bg-green-100 px-6 py-3 rounded-full font-medium transition-all duration-300 bg-[#859e9450]">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Video - */}
        <motion.div
          initial={{ opacity: 0, rotateY: -30 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 z-10 flex justify-center"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            type="video/mp4"
            src={HeroVideo}
            className="w-64 md:w-96 lg:w-[32rem] rounded-xl transform hover:scale-105 transition duration-500 ease-in-out shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          ></video>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection2;
