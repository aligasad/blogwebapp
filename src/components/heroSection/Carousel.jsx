import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-alias text-white text-base sm:text-xl md:text-2xl bg-[#449474]/75 pl-2 py-3 sm:py-6 rounded-l-md hover:bg-[#449474] hover:text-black/90 transition-all duration-100"
  >
    <FaChevronRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-alias text-white text-base sm:text-xl md:text-2xl bg-[#449474]/75 pr-2 py-3 sm:py-6 rounded-r-md hover:bg-[#449474] hover:text-black/90 transition-all duration-100"
  >
    <FaChevronLeft />
  </div>
);

function Carousel({ images }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }} // start off-screen to the left
      animate={{ opacity: 1, x: 0 }} // move to center
      exit={{ opacity: 0 }} // exit off-screen to the right
      transition={{ duration: 1 }}
    >
      <div className="relative w-full overflow-hidden sm:mb-[-10px]">
        <Slider {...settings}>
          {images.map((obj, index) => (
            <div key={index} onClick={() => (window.location = obj.link)}>
              <img
                src={obj.src}
                alt={`Slide ${index}`}
                className="w-full h-20 sm:h-30 md:h-50  object-cover object-center cursor-pointer"
              />
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>
  );
}

export default Carousel;
