import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import adv1 from '../../assets/adv1.jpg';
import adv2 from '../../assets/adv2.jpg';

const images = [
  adv1, adv2
];

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white text-base sm:text-2xl md:text-3xl bg-black/50 p-2 rounded-full"
  >
    <FaChevronRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white text-base sm:text-2xl md:text-3xl bg-black/50 p-2 rounded-full"
  >
    <FaChevronLeft />
  </div>
);

function HeroSection() {
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
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Slide ${index}`} className="w-full h-23 sm:h-40 md:h-60  object-cover object-top" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSection;
