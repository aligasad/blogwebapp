import { useData } from "../../context/data/MyState";
import { BsFillCloudSunFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaAngleDown, FaUserAlt } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { Home, User, Layers, ShoppingCart, Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { BsSearchHeart } from "react-icons/bs";
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

  function onTop() {
    window.scrollTo(0, 0);
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [searchBarOpen, setSearchBarOpen] = useState(false); // <-- Add this line

  return (
    <div className="bg-[#dfe3d6] sticky top-0 z-50 shadow-md">
      {/* Mobile View */}
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-green-700">
          <img
            onClick={onTop}
            src={logo}
            alt="Logo"
            className="w-10 h-auto rounded"
          />
        </Link>

        {/* Right side icons */}
        <div className="flex items-center gap-5">
          {/* Mobile Search Icon & Input */}
          {!searchBarOpen ? (
            <button
              onClick={() => setSearchBarOpen(true)}
              className="text-xl text-gray-600"
            >
              <BsSearchHeart />
            </button>
          ) : (
            <input
              type="text"
              autoFocus
              placeholder="Search..."
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              onBlur={() => setSearchBarOpen(false)}
              className="w-44 p-2 text-sm border border-gray-300 rounded-md outline-none"
              style={{ maxWidth: "220px" }}
            />
          )}

          {/* Menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-green-700"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <>
          {/* Half-screen overlay */}
          <div
            className="fixed inset-0 z-40 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent w-1/2 h-full pointer-events-auto"
              onClick={() => setMenuOpen(false)}
            />
          </div>
          {/* Slide-in menu from left, half screen */}
          <div
            className="fixed top-0 left-0 h-full w-1/2 sm:w-3/5 bg-[#f5f5eb] shadow-2xl z-50 rounded-r-2xl border-r border-green-200 transform transition-transform duration-300 ease-in-out"
            style={{
              transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-green-700">Menu</h2>
              <X
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-2xl text-green-700"
              />
            </div>
            <ul className="space-y-4 text-gray-800 px-6 py-6 font-medium">
              <li>
                <Link
                  to="/allproducts"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-green-700 transition"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-green-700 transition"
                >
                  Shampoo
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-green-700 transition"
                >
                  Serum
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-green-700 transition"
                >
                  Your Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 hover:text-green-700 transition"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="ml-1">Cart</span>
                  <span className="bg-amber-400 text-black rounded-full px-1 text-xs">
                    {(cartItems || []).length}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-green-700 transition"
                >
                  Account Settings
                </Link>
              </li>
              {user?.user?.email === "asadalam4291@gmail.com" && (
                <li>
                  <Link
                    to="/dashboard"
                    className="font-bold text-red-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    ADMIN
                  </Link>
                </li>
              )}
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 hover:text-green-700 transition"
                  >
                    Logout <MdLogout />
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-green-700 transition"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      {/* Desktop Header-------------------------------------------- */}
      <div className="hidden md:flex items-center justify-between px-8 py-3 bg-[#dfe3d6]">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-green-700">
            <img src={logo} alt="Logo" className="w-10 h-auto rounded" />
          </Link>
          <nav className="hidden lg:flex gap-6 text-sm text-gray-800">
            <Link to="/serum1" className="hover:text-green-700 font-bold">
              Serum
            </Link>
            <Link to="/mobile" className="hover:text-green-700 font-bold">
              Shampoo
            </Link>
            
            <Link to="/orders" className="hover:text-green-700 font-bold">
              Orders
            </Link>
            {user?.user?.email === "asadalam4291@gmail.com" && (
              <Link to="/dashboard" className="text-red-600 font-bold">
                Admin
              </Link>
            )}
          </nav>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-8">
          {/* Theme Toggle */}
          {/* <button onClick={toggleMode} className="text-xl">
            {mode === "dark" ? <BsFillCloudSunFill /> : <FiSun />}
          </button> */}

          {/* Search Icon/Input on Large Screens */}
          <div className="relative hidden lg:flex items-center">
            {!searchBarOpen ? (
              <button
                onClick={() => setSearchBarOpen(true)}
                className="text-xl cursor-pointer"
              >
                <BsSearchHeart
                  className="text-black hover:text-[#449474]"
                  size={21}
                />
              </button>
            ) : (
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                value={searchkey}
                onChange={(e) => setSearchkey(e.target.value)}
                onBlur={() => setSearchBarOpen(false)}
                className="px-4 py-1 border border-gray-300 bg-amber-50 rounded-md outline-none w-60 transition"
                style={{ maxWidth: "260px" }}
              />
            )}
          </div>

          {user ? (
            <button
              title="Logout"
              onClick={handleLogout}
              className="flex items-center gap-1 cursor-pointer hover:text-[#449474] "
            >
              <IoLogOut size={22} />
            </button>
          ) : (
            <Link
              to="/login"
              title="Login"
              className="flex flex-col hover:text-[#449474]"
            >
              <FaUserAlt />
            </Link>
          )}
          <Link
            to="/cart"
            className="relative flex items-center text-sm hover:text-[#3a9a72] font-bold "
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="ml-1">Cart</span>
            <span className="absolute -top-2 -right-3 bg-[#449474] text-white text-xs rounded-full px-1">
              {(cartItems || []).length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
