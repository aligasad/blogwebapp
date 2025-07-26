import { useData } from "../../context/data/MyState";
import { BsFillCloudSunFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { Home, User, Layers, ShoppingCart, Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { GiMapleLeaf } from "react-icons/gi";
import logo from "../../assets/logo.jpg";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { auth } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const context = useData();
  const {
    mode,
    toggleMode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    address,
    resetFilter,
    pageType,
    setPageType,
  } = context;
  console.log("PAGE TYPE", pageType);
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fullAddress = address || "";
    const shortAddress = fullAddress.split(" ").slice(0, 3).join(" ");
    setLocation(shortAddress);
  }, [address]); // Only re-run when address changes

  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // For dark and light mode--------------------
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // FOR LOGOUT-----------------
  function handleLogout() {
    auth.signOut();
    setIsDropdownOpen((prev) => !prev);
    localStorage.clear("user");
    navigate("/");
    // localStorage.clear("cart");
    toast.success("Logout Successfully!");
  }

  // For loggedIn user information--------------
  const user = JSON.parse(localStorage.getItem("user"));

  // cartItems data---------------------
  const cartItems = useSelector((state) => state.cart);
  const wishListitems = useSelector((state) => state.wishlist);

  // Finding all types-------------------------------------------
  const [types, setTypes] = useState([]);
  function getTypes() {
    const typo = [...new Set(product.map((item) => item.type))];
    // const typo1 = [...new Set(product.map((item) => item.type))];
    setTypes(typo);
  }
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
    // window.scrollTo(0, window.innerHeight * 0.4);
    getTypes();
  }, [searchkey, filterType, product]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [searchBarOpen, setSearchBarOpen] = useState(false); // <-- Add this line

  return (
    <div className="bg-[#f5f5eb] sticky top-0 z-50">
      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 z-50 h-full flex items-end">
          <div
            className="flex-grow bg-black bg-opacity-40"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="w-64 h-[50%] bg-[#f5f5eb] shadow-lg p-4 py-5 mb-20 flex flex-col justify-between text-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-4">
              <li onClick={() => setMenuOpen(false)}>
                <Link to="/orders">Your Orders</Link>
              </li>
              <li onClick={() => setMenuOpen(false)}>
                <Link to="/wishlist" className="flex items-center gap-2">
                  Wishlist
                  <p className="relative flex items-center">
                    <AiFillHeart
                      title="Your Wishlist"
                      className="text-xl text-amber-700"
                    />
                    <span className="absolute top-[-8px] right-[-8px] bg-amber-500 font-bold text-black rounded-full w-4 h-4 flex justify-center items-center text-xs">
                      {(wishListitems || []).length}
                    </span>
                  </p>
                </Link>
              </li>
              <li>Account Settings</li>
              {user?.user?.email === "asadalam4291@gmail.com" && (
                <li>
                  <Link to="/dashboard" className="font-bold text-red-600">
                    ADMIN
                  </Link>
                </li>
              )}
              {user ? (
                <li className="hover:bg-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1"
                  >
                    Logout <MdLogout title="Logout" />
                  </button>
                </li>
              ) : (
                <li>
                  <button className="flex items-center gap-1">
                    <Link to="/login">Login</Link>
                  </button>
                </li>
              )}
            </ul>
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <X
                className="cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="sm:hidden fixed top-0 left-0 w-full border-b shadow-md bg-[#f5f5eb] px-4 py-2 text-gray-800">
        <input
          type="text"
          value={searchkey}
          onChange={(e) => setSearchkey(e.target.value)}
          placeholder="Search a product"
          className="w-full p-2 rounded-md border outline-none border-gray-300"
        />
        <button
          onClick={toggleMode}
          className="fixed top-[8.5px] right-1 z-50 text-xl p-[10px] rounded-md bg-amber-600"
        >
          {mode === "dark" ? <BsFillCloudSunFill /> : <FiSun />}
        </button>
      </div>

      <div className="h-[58px] sm:hidden" />

      {/* Horizontal Scroll Menu */}
      <div className="sm:hidden overflow-x-auto whitespace-nowrap flex items-center gap-4 px-4 py-2 border-b bg-[#f5f5eb] text-gray-800">
        <div className="flex flex-col items-center text-xs">
          <Link to="/kids">
            <img
              src="https://cdn1.vectorstock.com/i/1000x1000/24/70/of-shopping-vector-23182470.jpg"
              alt="Serum1"
              className="w-10 h-8 rounded-sm object-cover"
            />
            <span>Serum1</span>
          </Link>
        </div>
        <div className="flex flex-col items-center text-xs">
          <Link to="/mobile">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.kiGkC1mRT0mXLso5irnYhQHaHa&pid=Api&P=0&h=180"
              alt="Serum2"
              className="w-10 h-8 rounded-sm object-cover"
            />
            <span>Serum2</span>
          </Link>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div
        className={`lg:hidden fixed bottom-[-60px] left-0 w-full z-40 border-t shadow-md transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "translate-y-full"
        } bg-[#f5f5eb] text-gray-800`}
      >
        <div className="flex justify-between items-start h-30 mt-2 px-6 py-2">
          <Link className="flex flex-col items-center text-xs" to="/">
            <Home className="h-6 w-6" />
            <span>Home</span>
          </Link>
          <Link className="flex flex-col items-center text-xs">
            <User className="h-6 w-6" />
            <span>You</span>
          </Link>
          <Link className="flex flex-col items-center text-xs">
            <Layers className="h-6 w-6" />
            <span>More</span>
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center text-xs flex-col"
          >
            <ShoppingCart className="h-6 w-6" />
            <span>Cart</span>
            <span className="absolute -top-2 -right-2 bg-green-400 text-black text-xs rounded-full px-1">
              {(cartItems || []).length}
            </span>
          </Link>
          <Link
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center text-xs"
          >
            <Menu className="h-6 w-6" />
            <span>Menu</span>
          </Link>
        </div>
      </div>

      {/* Desktop Navbar-------------------------------------------------------- */}
      <header className="hidden md:block bg-[#dfe3d6] text-gray-800 w-full shadow-md">
        <div className="flex items-center justify-between px-4 lg:px-8 py-2">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <Link to="/" className="text-green-700 font-bold text-2xl">
              <img
                src={logo}
                alt=""
                className="w-15 h-auto rounded-lg"
              />
            </Link>
            <div className="hidden md:flex flex-col leading-tight text-sm">
              <div>{location}</div>
              <button className="hover:underline text-xs">
                Current location
              </button>
            </div>
          </div>

          <div className="hidden md:flex flex-grow mx-4">
            <input
              type="text"
              name="searchkey"
              id="searchkey"
              placeholder="Search here"
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              className="px-8 py-2 w-full bg-white text-black border outline-none text-sm"
            />
            <button
              onClick={resetFilter}
              className="bg-green-500 hover:bg-green-600 cursor-pointer px-4 rounded-r-md text-black"
            >
              Reset
            </button>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <img
              src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
              alt="IN"
              className="w-5 h-4"
            />
            {user ? (
              <Link to="/orders" className="flex flex-col">
                <span className="text-xs">Returns</span>
                <span className="font-bold text-sm">& Orders</span>
              </Link>
            ) : (
              <Link to="/login" className="flex flex-col">
                <span className="text-xs">Hello, sign in</span>
                <span className="font-bold text-sm">Account & Lists</span>
              </Link>
            )}
            <button onClick={toggleMode} className="text-xl">
              {mode === "dark" ? <BsFillCloudSunFill /> : <FiSun />}
            </button>
            <Link to="/cart" className="relative flex items-center space-x-1">
              <span className="text-lg">🛒</span>
              <span className="font-bold text-sm">Cart</span>
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full px-1">
                {(cartItems || []).length}
              </span>
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex justify-start bg-[#232f3e] text-white text-sm px-4 lg:px-8 py-2 space-x-4 overflow-x-auto scrollbar-hide  ">
          {user ? (
            <>
              <span className="font-semibold">
                <div onClick={toggleDropdown} className="flex items-center">
                  <span className="mr-2">
                    {" "}
                    <IoSettings />{" "}
                  </span>
                  <FaAngleDown
                    className={`text-xl transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-270" : "rotate-0"
                    }`}
                  />
                </div>
                {isDropdownOpen && (
                  <ul className="absolute z-50 left-0 mt-2 bg-gray-800 shadow-md rounded w-40">
                    <li className="p-2 hover:bg-gray-400">
                      <Link onClick={toggleDropdown} to={"/"}>
                        Home
                      </Link>
                    </li>
                    <li className="p-2 hover:bg-gray-400">
                      <Link onClick={toggleDropdown} to={"/allproducts"}>
                        All Products
                      </Link>
                    </li>
                    <li className="p-2 hover:bg-gray-400 relative">
                      <Link
                        onClick={toggleDropdown}
                        to="/wishlist"
                        className="flex items-center gap-2"
                      >
                        Wishlist{" "}
                        <p className="relative flex items-center">
                          <AiFillHeart
                            title="Your Wishlist"
                            className="text-xl text-amber-700"
                          />
                          <span className="absolute top-[-8px] right-[-8px] bg-amber-500 font-bold text-black rounded-full w-4 h-4 flex justify-center items-center text-xs">
                            {(wishListitems || []).length}
                          </span>
                        </p>
                      </Link>
                    </li>
                    {user?.user?.email === "asadalam4291@gmail.com" ? (
                      <li
                        onClick={toggleDropdown}
                        className="p-2 hover:bg-gray-400 relative"
                      >
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2"
                        >
                          Admin
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                    <li
                      onClick={handleLogout}
                      className="p-2 hover:bg-gray-400 relative flex items-center gap-2"
                    >
                      <button className="flex items-center gap-1">
                        Logout <MdLogout title="Logout" className="" />
                      </button>
                    </li>
                  </ul>
                )}
              </span>
            </>
          ) : (
            <Link to={"/login"}>
              <span
                onClick={() => window.scrollTo(0, 0)}
                className="text-rose-600 font-bold hover:text-amber-500 cursor-pointer"
              >
                LOGIN
              </span>
            </Link>
          )}
          <Link to={"/"} onClick={resetFilter}>
            <span className="text-green-400 font-bold hover:text-green-500">
              Home
            </span>
          </Link>
          <Link to={"/serum1"} onClick={resetFilter}>
            <span>Serum1</span>
          </Link>
          <Link to={"/mobile"} onClick={resetFilter}>
            <span>Serum2</span>
          </Link>
        </div>
      </header>
    </div>

  );
}

export default Navbar;
