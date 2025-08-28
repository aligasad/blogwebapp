import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-alias text-white text-base sm:text-xl md:text-2xl bg-black/50 pl-2 py-3 sm:py-6 rounded-l-xl hover:bg-rose-100 hover:text-black/90 transition-all duration-300"
  >
    <FaChevronRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-alias text-white text-base sm:text-xl md:text-2xl bg-black/50 pr-2 py-3 sm:py-6 rounded-r-xl hover:bg-rose-100 hover:text-black/90 transition-all duration-300"
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
    <div className="relative w-full overflow-hidden sm:mb-[-10px]">
      <Slider {...settings}>
        {images.map((obj, index) => (
          <div key={index} onClick={() => (window.location = obj.link)}>
            <img
              src={obj.src}
              alt={`Slide ${index}`}
              className="w-full h-18 sm:h-40 md:h-50  object-cover object-center cursor-pointer"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
