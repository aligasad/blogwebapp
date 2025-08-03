import React, { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { FaLongArrowAltRight } from "react-icons/fa";
import ReviewSection from "../../components/reviews/reviews";

function ProductInfo() {
  const context = useData();
  const [isWished, setIsWished] = useState(false);
  const { loading, setLoading, calcOffer, product } = context;

  const [products, setProducts] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const params = useParams();
  // console.log(products.title)

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(firebaseDB, "products", params.id));
      // console.log(productTemp)
      setProducts(productTemp.data());
      // console.log(productTemp.data())
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  // console.log(cartItems);

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
      dispatch(addToCart(product));
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

  function calculateDiscount(original, selling) {
    if (!original || !selling || Number(original) === 0) return 0;
    const discount =
      ((Number(original) - Number(selling)) / Number(original)) * 100;

    return discount.toFixed(2);
  }

  // --------------FOR ACCORDION REVIEW SECTION------------------
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-gradient-to-br from-green-50 to-blue-100 min-h-screen">
      <div className="container px-2 md:px-5 py-5 mx-auto">
        {products && (
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Images Section */}
              <div>
                {/* Big Image */}
                <div className="w-full bg-gray-100 rounded-xl flex items-center justify-center mb-4 border">
                  <img
                    alt="ecommerce"
                    className="w-full max-h-[55vh] object-contain rounded-xl transition-all duration-300"
                    src={selectedImage || products.imageUrl}
                  />
                </div>
                {/* Thumbnails */}
                <div className="flex gap-3 justify-center">
                  {[
                    products.imageUrl,
                    products.imageUrl2,
                    products.imageUrl3,
                    products.imageUrl4,
                  ]
                    .filter(Boolean) // Filter out any undefined or null images
                    .map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`thumb-${idx}`}
                        className={`w-14 h-14 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                          (selectedImage || products.imageUrl) === url
                            ? "border-[#449474] shadow"
                            : "border-gray-200"
                        }`}
                        onClick={() => setSelectedImage(url)}
                      />
                    ))}
                </div>

                <div className=" hidden sm:block ">
                  <ReviewSection productId={params} />
                </div>
              </div>
              {/* Product Info Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xs md:text-sm title-font text-gray-500 tracking-widest">
                      THE ZAPHIRA
                    </h2>
                    {products.isNew && (
                      <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                    {
                      <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {Number(products.stock) !== 0 ? "On Sale" : "Sold Out"}
                      </span>
                    }
                  </div>
                  <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-bold mb-2">
                    {products.title}{" "}
                    <span className="text-red-600 text-[20px]">
                      ({products.quantity})
                    </span>
                  </h1>
                  <h2 className="text-xs md:text-sm title-font text-yellow-600 font-semibold tracking-widest mb-2">
                    {products.category?.toUpperCase()}
                  </h2>
                  <div className="flex flex-wrap items-center mb-4"></div>

                  {/* --- Details Card --- */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-semibold text-green-700">
                        Brand:
                      </span>{" "}
                      <span className="text-gray-700">
                        {products.brand || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-700">
                        Type:
                      </span>{" "}
                      <span className="text-gray-700">
                        {products.type || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-700">
                        Stock:
                      </span>{" "}
                      <span
                        className={`font-bold ${
                          products.stock > 0 ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {products.stock > 0 ? products.stock : "Out of Stock"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-700">
                        Discount:
                      </span>{" "}
                      <span className="text-gray-700">
                        {products.originalPrice && products.price
                          ? `${calculateDiscount(
                              products.originalPrice,
                              products.price
                            )}%`
                          : "0%"}
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-semibold text-green-700">
                        Tags:
                      </span>{" "}
                      {products.tags ? (
                        products.tags.split(",").map((tag, i) => (
                          <span
                            key={i}
                            className="inline-block bg-green-200 text-green-800 rounded-full px-2 py-0.5 text-xs mr-2 mb-1"
                          >
                            {tag.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No tags</span>
                      )}
                    </div>
                  </div>

                  {/* --- Description, Ingredients & Benefits --- */}
                  <div className="space-y-4">
                    {/* Description */}
                    <div className="border-2 rounded border-[#449474] mb-4">
                      <button
                        className="w-full text-left px-4 py-2 bg-green-100 font-semibold text-green-700"
                        onClick={() => toggleSection("description")}
                      >
                        <span className="flex items-end gap-1 cursor-pointer hover:scale-103 transition-transform duration-200">
                          Description <FaLongArrowAltRight />
                        </span>
                      </button>
                      {openSection === "description" && (
                        <div className="px-4 py-2 text-sm md:text-base text-gray-700">
                          {products.description ? (
                            products.description
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Ingredients */}
                    <div className="border-2 rounded border-[#449474]">
                      <button
                        className="w-full text-left px-4 py-2 bg-green-100 font-semibold text-green-700"
                        onClick={() => toggleSection("ingredients")}
                      >
                        <span className="flex items-end gap-1 cursor-pointer">
                          Ingredients <FaLongArrowAltRight />
                        </span>
                      </button>
                      {openSection === "ingredients" && (
                        <div className="px-4 py-2 text-sm text-gray-700">
                          {products.ingredients ? (
                            products.ingredients
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Benefits */}
                    <div className="border-2 rounded border-[#449474]">
                      <button
                        className="w-full text-left px-4 py-2 bg-green-100 font-semibold text-green-700"
                        onClick={() => toggleSection("benefits")}
                      >
                        <span className="flex items-end gap-1 cursor-pointer">
                          {" "}
                          Benefits <FaLongArrowAltRight />
                        </span>
                      </button>
                      {openSection === "benefits" && (
                        <div className="px-4 py-2 text-sm text-gray-700">
                          {products.benefits ? (
                            products.benefits
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mb-2 mt-4">
                      <p className="text-2xl font-bold text-red-600 mt-1">
                        ₹{products.price}
                      </p>
                      {products.originalPrice && (
                        <p className="text-lg md:text-xl font-semibold text-gray-400 line-through">
                          ₹{products.originalPrice}
                        </p>
                      )}
                      {products.originalPrice && products.price && (
                        <span className="ml-3 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">
                          {calculateDiscount(
                            products.originalPrice,
                            products.price
                          )}
                          % OFF
                        </span>
                      )}
                    </div>
                    {products.stock > 0 ? (
                      <button
                        onClick={() => toggleCart(products)}
                        className={`px-3 py-[6px] sm:py-2 mr-2 text-[12px] md:text-sm font-semibold rounded-lg transition duration-800 hover:scale-105 cursor-pointer ${
                          cartItems.some((p) => p.id === products.id)
                            ? "bg-red-700 text-white hover:bg-black"
                            : "bg-[#439373] text-black hover:bg-black hover:text-white"
                        }`}
                      >
                        {cartItems.some((p) => p.id === products.id)
                          ? "Remove"
                          : "Add to Cart"}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-3 py-[6px] sm:py-2 mr-2 text-[12px] md:text-sm font-semibold rounded-lg text-white bg-[#b35d52] cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className=" sm:hidden ">
                <ReviewSection productId={params} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductInfo;
