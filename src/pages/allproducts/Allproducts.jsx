import { useEffect } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "../../context/data/MyState";
import { addToCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa6";

function Allproducts() {
  const context = useData();
  const {
    mode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    calcOffer,
  } = context;

  console.log("JULY:::",product)
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  // add to cart if item is not already present
  const user = JSON.parse(localStorage.getItem("user"));
  const addCart = (product) => {
    if (user) {
      const existingItem = cartItems.some((item) => {
        return item.id === product.id;
      });
      console.log("EXISTING", existingItem);
      if (!existingItem) {
        dispatch(addToCart(product));
        toast.success("Item added to cart");
      } else {
        toast.warning("Item already added!");
      }
    } else {
      toast.warning("Please login first!");
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


    <section className="text-gray-600 body-font bg-[#caf5e7a7] ">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          > 
            All Products
          </h1>
          <div class="h-1 w-25 bg-green-700 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4 ">
          {product
            .filter(
              (obj) =>
                obj.title
                  .toLowerCase()
                  .includes(
                    searchkey.toLowerCase().trim().replace(/\s+/g, " ")
                  ) ||
                obj.type
                  .toLowerCase()
                  .includes(searchkey.toLowerCase().trim().replace(/\s+/g, " "))
            )
            .filter((item) =>
              item.category
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(filterType)
            )
            .filter((obj) => obj.price.trim().includes(filterPrice))
            .map((item, index) => {
              const { title, price, originalPrice, category, onSale, stock, imageUrl, id } = item;
              console.log("ID CARD", id);
              return (
                
                <div
                  key={index}
                  className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 "
                >
                  <div
                    className="h-full border border-gray-200 rounded-xl shadow-gray-300 bg-white hover:shadow-lg transition-shadow hover:shadow-gray-600 duration-300 "
                    style={{
                      backgroundColor: mode === "dark" ? "#232F3E" : "#FFFFFF",
                      color: mode === "dark" ? "#FFFFFF" : "#000000",
                    }}
                  >
                    <div className="flex justify-center items-center p-4 relative ">
                      {item.stock > 0 ? (<p className=" absolute top-3 left-3 bg-[#459575] px-2 rounded-full text-[13px] text-white font-semibold z-10 ">On Sale</p>) : (<p className=" absolute top-3 left-3 bg-[#b35d52] px-2 rounded-full text-[13px] text-white font-semibold z-10 ">Sold Out</p>)}
                      {item.isNew ? (<p className="absolute bottom-0 right-0 px-3 text-[13px] text-white font-semibold z-10 bg-pulse"> New </p> ) : ""}
                      
                      <img
                        onClick={() =>
                          (window.location.href = `/productinfo/${id}`)
                        }
                        className="h-36 sm:h-44 object-contain transition-transform rounded-md duration-300 hover:scale-110 cursor-pointer"
                        src={imageUrl}
                        alt={title}
                      />
                    </div>
                    <div className=" px-2 md:px-4 pb-4 border-t border-gray-100 dark:border-gray-600 bg-[#94eed0] rounded-b-xl  ">
                      <p
                        className="text-xs text-gray-500 mt-2 mb-1"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {category}
                      </p>
                      <h2
                        className="text-sm font-semibold truncate"
                        style={{ color: mode === "dark" ? "#FFD814" : "" }}
                      >
                        {title}
                      </h2>
                      <div className="flex items-baseline gap-1">
                        <p
                          className="text-[14px] md:text-base font-bold text-grey-300 mt-1"
                          style={{ color: mode === "dark" ? "#D97706" : "" }}
                        >
                          ₹{price}
                        </p>
                        <p
                          className="text-[12px] md:text-sm font-semibold text-red-600 line-through"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ₹{originalPrice}
                        </p>
                      </div>

                      <div className=" mt-4">
                        {item.stock > 0 ? (<button
                          onClick={() => addCart(item)}
                          className="px-3 py-[6px] sm:py-2 mr-2 text-[12px] md:text-sm md:flex-1 font-semibold rounded-lg text-white bg-[#459575] hover:bg-[#459575] transition duration-300 cursor-pointer md:w-[50%]"
                        >
                          Add to Cart
                        </button>
                        ) : ( 
                          <button
                            disabled
                            className="px-3 py-[6px] sm:py-2 mr-2 text-[12px] md:text-sm md:flex-1 font-semibold rounded-lg text-white bg-gray-400 cursor-not-allowed md:w-[55%]"
                          >
                            Out of Stock
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>

  );
}

export default Allproducts;
