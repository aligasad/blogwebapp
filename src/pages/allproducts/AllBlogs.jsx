import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "../../context/data/MyState";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/heroSection/Carousel";
import adv1 from "../../assets/Posters/soap4.png";
import adv2 from "../../assets/Posters/serum1.png";
import adv3 from "../../assets/Posters/shampoo1.png";
import adv4 from "../../assets/Posters/NoorByShayan.png";

function Allproducts() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const navigate = useNavigate();
  const context = useData();
  const {
    mode,
    product,
    searchkey,
    filterType,
    filterPrice,
    calculateDiscount,
    userData
  } = context;

  const images = [
    {
      src: adv1,
      link: "/soap",
    },
    {
      src: adv2,
      link: "/serum",
    },
    {
      src: adv3,
      link: "/shampoo",
    },
    {
      src: adv4,
      link: "",
    },
  ];

  // console.log("JULY:::", product);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  // Debounce search functionality---------
  const [debouncedSearchKey, setDebouncedSearchKey] = useState(searchkey);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchkey);
    }, 700); // debounce delay: 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchkey]);

  // add to cart if item is not already present
  const user = JSON.parse(localStorage.getItem("user"));
  const toggleCart = (product) => {
    if (!user) {
      toast.warning("Please login first!");
      return;
    }

    const isInCart = cartItems.some((item) => item.id === product.id);

    if (isInCart) {
      dispatch(deleteFromCart(product));
      toast.info("Item removed from cart");
    } else {
      dispatch(addToCart({ ...product, quan: 1 }));
      toast.success("Item added to cart");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* <Carousel images={images} /> */}

      <section className="text-gray-600 body-font bg-[#F4E9D7]">
        <div className="container px-5 py-8 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2"
              style={{ color: mode === "dark" ? "#F4E9D7" : "#D97D55" }}
            >
              All Blogs
            </h1>
            <div className="h-1 w-24 bg-[#6FA4AF] rounded"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {product
              .filter(
                (item) =>
                  item.title
                    .toLowerCase()
                    .includes(searchkey.toLowerCase().trim()) ||
                  item.subtitle
                    .toLowerCase()
                    .includes(searchkey.toLowerCase().trim()) ||
                  item.type
                    .toLowerCase()
                    .includes(searchkey.toLowerCase().trim()) ||
                  item.category
                    .toLowerCase()
                    .includes(searchkey.toLowerCase().trim())
              )
              .filter((item) =>
                item.category.toLowerCase().includes(filterType.toLowerCase())
              )
              .map((item, index) => {
                const { title, imageUrl, category, content, author, id, date } =
                  item;

                const description =
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Doloremque, nihil! At ea atque quidem.";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="w-full sm:w-[320px]"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt={title}
                          className="w-full h-48 object-cover cursor-pointer"
                          onClick={() =>
                            (window.location.href = `/bloginfo/${id}`)
                          }
                        />
                        <span className="absolute top-3 left-3 bg-[#6FA4AF] text-white text-xs px-3 py-1 rounded-full shadow-md">
                          {category}
                        </span>
                      </div>

                      <div className="p-5">
                        <h2 className="text-lg font-semibold text-[#D97D55] mb-2">
                          {title}
                        </h2>
                        <p className="text-sm text-[#6FA4AF] mb-4">
                          <span className="line-clamp-4">
                            {content || description}
                          </span>{" "}
                          <span
                            className="text-[#D97D55] cursor-pointer hover:text-[#B8C4A9] font-semibold transition-all duration-100"
                            onClick={() =>
                              (window.location.href = `/bloginfo/${id}`)
                            }
                          >
                            Read More
                          </span>
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img
                              src={userData?.photoURL}
                              alt="Author"
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="text-sm font-semibold text-[#6FA4AF]">
                                {author || "John Doe"}
                              </p>
                              <p className="text-xs text-[#B8C4A9]">
                                {date || "2 days ago"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Allproducts;
