import { useData } from "../../context/data/MyState";
import { BsFillCloudSunFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoClose, IoLogOut } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaAngleDown, FaUserAlt } from "react-icons/fa";
import {
  Home,
  User,
  Layers,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
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

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // For Select Options in header-=============================================
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const productRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        productRef.current &&
        !productRef.current.contains(event.target) &&
        event.target.getAttribute("data-dropdown") !== "product"
      ) {
        setIsProductDropdownOpen(false);
      }
      if (
        userRef.current &&
        !userRef.current.contains(event.target) &&
        event.target.getAttribute("data-dropdown") !== "user"
      ) {
        setIsUserDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (path) => {
    setIsProductDropdownOpen(false);
    setIsUserDropdownOpen(false);
    navigate(path);
  };

  // For dark and light mode-----------------------
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
      <div
        className="md:hidden flex justify-between items-center px-4 py-1"
        style={{ backgroundColor: "#F4E9D7" }} // Background color
      >
        <Link
          to="/"
          className="text-2xl font-bold"
          style={{ color: "#D97D55" }}
        >
          <div
            className=" p-1 rounded-full"
            style={{ borderColor: "#D97D55" }}
          >
            <img
              onClick={onTop}
              src={logo}
              alt="Logo"
              className="h-10 shadow shadow-[#d97d55] rounded-sm"
            />
          </div>
        </Link>

        {/* Right side icons */}
        <div className="flex items-center gap-5">
          {/* Mobile Search Icon & Input */}
          {!searchBarOpen ? (
            <button
              onClick={() => setSearchBarOpen(true)}
              className="text-xl"
              style={{ color: "#6FA4AF" }}
            >
              <RiSearchLine />
            </button>
          ) : (
            <input
              type="text"
              autoFocus
              placeholder="Search..."
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              onBlur={() => setSearchBarOpen(false)}
              className="w-44 p-2 text-sm border rounded-md outline-none"
              style={{
                borderColor: "#B8C4A9",
                color: "#6FA4AF",
                maxWidth: "220px",
              }}
            />
          )}

          {/* Cart button */}
          {/* <Link to="/cart">
            <div className="relative">
              <ShoppingCart
                className="h-5 w-5 font-bold"
                style={{ color: "#6FA4AF" }}
              />
              <span
                className="text-[12px] rounded-full px-[5px] absolute -top-2 -right-3"
                style={{
                  backgroundColor: "#B8C4A9",
                  color: "#000",
                }}
              >
                {(cartItems || []).length}
              </span>
            </div>
          </Link> */}

          {/* Menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl"
            style={{ color: "#D97D55" }}
          >
            {menuOpen ? <IoClose /> : <Menu />}
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
              className="absolute inset-0 bg-gradient-to-r from-[#D97D55]/30 to-transparent w-1/2 h-full pointer-events-auto"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          {/* Slide-in menu from left, half screen */}
          <div
            className="fixed top-0 left-0 h-full w-1/2 sm:w-3/5 shadow-2xl z-50 rounded-r-2xl border-r transform transition-transform duration-300 ease-in-out"
            style={{
              backgroundColor: "#F4E9D7", // Theme background
              borderColor: "#B8C4A9", // Accent Light Green border
              transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            {/* Header */}
            <div
              className="flex justify-between items-center px-6 py-4 border-b"
              style={{ borderColor: "#B8C4A9" }}
            >
              <h2
                className="text-lg font-semibold"
                style={{ color: "#D97D55" }}
              >
                Menu
              </h2>
              <X
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-2xl"
                style={{ color: "#D97D55" }}
              />
            </div>

            {/* Menu Items */}
            <ul
              className="space-y-4 px-6 py-6 font-medium"
              style={{ color: "#6FA4AF" }}
            >
              {/* Product Dropdown */}
              <li>
                <div
                  className="relative inline-block text-left"
                  ref={productRef}
                >
                  <button
                    data-dropdown="product"
                    onClick={() => {
                      setIsProductDropdownOpen(!isProductDropdownOpen);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-1 font-bold cursor-pointer transition"
                    style={{
                      color: "#6FA4AF",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#D97D55")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "#6FA4AF")
                    }
                  >
                    Categories{" "}
                    {isProductDropdownOpen ? (
                      <ChevronUp size={16} className="cursor-pointer" />
                    ) : (
                      <ChevronDown size={16} className="cursor-pointer" />
                    )}
                  </button>

                  {isProductDropdownOpen && (
                    <ul
                      className="absolute mt-3 shadow-lg rounded-xl py-2 px-4 z-50 min-w-[160px] space-y-2"
                      style={{
                        backgroundColor: "#F4E9D7",
                        color: "#6FA4AF",
                        border: "1px solid #B8C4A9",
                      }}
                    >
                      {[
                        { path: "/allblogs", label: "All Blogs" },
                        { path: "/technology", label: "Technology" },
                        { path: "/lifestyle", label: "Lifestyle" },
                        { path: "/design", label: "Design" },
                        { path: "/travel", label: "Travel" },
                        { path: "/productivity", label: "Productivity" },
                      ].map((item) => (
                        <li
                          key={item.path}
                          onClick={() => {
                            handleSelect(item.path);
                            setIsProductDropdownOpen(false);
                            setMenuOpen(false);
                          }}
                          className="hover:underline hover:cursor-pointer"
                          style={{ color: "#6FA4AF" }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.color = "#D97D55")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.color = "#6FA4AF")
                          }
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>

              {/* Other Links */}
              <li>
                <Link
                  to="/userdashboard"
                  onClick={() => setMenuOpen(false)}
                  className="transition"
                  style={{ color: "#6FA4AF" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#D97D55")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#6FA4AF")}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/adduserblogs"
                  onClick={() => setMenuOpen(false)}
                  className="transition"
                  style={{ color: "#6FA4AF" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#D97D55")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#6FA4AF")}
                >
                  Add Blog
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className="transition"
                  style={{ color: "#6FA4AF" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#D97D55")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#6FA4AF")}
                >
                  About
                </Link>
              </li>

              {user?.user?.email === "tanveer123alam@gmail.com" ||
              user?.user?.email === "asadalamalig@gmail.com" ? (
                <li>
                  <Link
                    to="/dashboard"
                    className="font-bold"
                    onClick={() => setMenuOpen(false)}
                    style={{ color: "#D97D55" }}
                  >
                    ADMIN
                  </Link>
                </li>
              ) : null}

              {user && (
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="transition"
                    style={{ color: "#6FA4AF" }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#D97D55")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "#6FA4AF")
                    }
                  >
                    Profile
                  </Link>
                </li>
              )}

              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 transition"
                    style={{ color: "#6FA4AF" }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#D97D55")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "#6FA4AF")
                    }
                  >
                    Logout <MdLogout />
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="transition"
                    style={{ color: "#6FA4AF" }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#D97D55")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "#6FA4AF")
                    }
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
      <div className="hidden md:flex items-center justify-between px-8 bg-[#F4E9D7] border-b-2 border-[#6FA4AF]">
        <div className="flex items-center gap-6">
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to="/"
            className="text-2xl font-bold text-[#D97D55]"
          >
            <div className="p-1">
              <img src={logo} className="h-12 shadow shadow-[#d97d55] rounded-sm" />
            </div>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-[#6FA4AF]">
            <Link to="/" className="hover:text-[#D97D55] font-bold">
              Blogs
            </Link>

            <div className="relative inline-block text-left" ref={productRef}>
              <button
                data-dropdown="product"
                onClick={() => {
                  setIsProductDropdownOpen(!isProductDropdownOpen);
                  setIsDropdownOpen(false);
                }}
                className="flex items-center gap-1 text-[#6FA4AF] font-bold hover:text-[#D97D55] cursor-pointer transition"
              >
                Blog Categories{" "}
                {isProductDropdownOpen ? (
                  <ChevronUp size={16} className="cursor-pointer" />
                ) : (
                  <ChevronDown size={16} className="cursor-pointer" />
                )}
              </button>

              {isProductDropdownOpen && (
                <ul className="absolute mt-3 bg-[#F4E9D7] text-[#6FA4AF] shadow-lg rounded-xl py-2 px-4 z-50 min-w-[160px] space-y-2">
                  <li
                    onClick={() => {
                      handleSelect("/allblogs"),
                        setIsProductDropdownOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:underline hover:text-[#D97D55] hover:cursor-pointer"
                  >
                    All Blogs
                  </li>
                  <li
                    onClick={() => {
                      handleSelect("/technology"),
                        setIsOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:underline hover:text-[#D97D55] hover:cursor-pointer"
                  >
                    Technology
                  </li>
                  <li
                    onClick={() => {
                      handleSelect("/lifestyle"),
                        setIsOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:underline hover:text-[#D97D55] hover:cursor-pointer"
                  >
                    Lifestyle
                  </li>
                  <li
                    onClick={() => {
                      handleSelect("/design"),
                        setIsOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:underline hover:text-[#D97D55] hover:cursor-pointer"
                  >
                    Design
                  </li>
                  <li
                    onClick={() => {
                      handleSelect("/travel"),
                        setIsOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:underline hover:text-[#D97D55] hover:cursor-pointer"
                  >
                    Travel
                  </li>
                  <li
                    onClick={() => {
                      handleSelect("/productivity"),
                        setIsOpen(false),
                        setMenuOpen(false);
                    }}
                    className="hover:underline hover:text-[#D97D55] hover:cursor-pointer"
                  >
                    Productivity
                  </li>
                </ul>
              )}
            </div>

            <Link to="/about" className="hover:text-[#D97D55] font-bold">
              About
            </Link>
            {user?.user?.email === "tanveer123alam@gmail.com" ||
              (user?.user?.email === "asadalamalig@gmail.com" && (
                <Link to="/dashboard" className="text-[#B8C4A9] font-bold">
                  Admin
                </Link>
              ))}
          </nav>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-8">
          {/* Search Icon/Input on Large Screens */}
          <div className="relative hidden sm:flex items-center">
            {!searchBarOpen ? (
              <button
                onClick={() => setSearchBarOpen(true)}
                className="text-xl cursor-pointer"
              >
                <RiSearchLine
                  className="text-[#6FA4AF] hover:text-[#D97D55]"
                  size={21}
                />
              </button>
            ) : (
              <input
                type="text"
                autoFocus
                placeholder="Search blogs..."
                value={searchkey}
                onChange={(e) => setSearchkey(e.target.value)}
                onBlur={() => setSearchBarOpen(false)}
                className="px-4 py-1 border border-[#B8C4A9] bg-[#F4E9D7] rounded-md outline-none w-60 transition"
                style={{ maxWidth: "260px" }}
              />
            )}
          </div>

          {user ? (
            <button
              title="Logout"
              className="flex items-center gap-1 cursor-pointer hover:text-[#D97D55]"
            >
              <div className="relative inline-block text-left">
                <div ref={userRef} className="relative">
                  <button
                    data-dropdown="user"
                    onClick={() => {
                      setIsUserDropdownOpen(!isUserDropdownOpen);
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-1 text-[#6FA4AF] font-bold hover:text-[#D97D55] cursor-pointer transition"
                  >
                    Profile{" "}
                    {isUserDropdownOpen ? (
                      <ChevronUp size={16} className="cursor-pointer" />
                    ) : (
                      <ChevronDown size={16} className="cursor-pointer" />
                    )}
                  </button>

                  {isUserDropdownOpen && (
                    <ul className="absolute mt-3 bg-[#F4E9D7] text-[#6FA4AF] shadow-lg rounded-xl py-2 px-4 z-50 min-w-[160px] space-y-2">
                      <li
                        onClick={() => {
                          handleSelect("/profile");
                          setIsUserDropdownOpen(false);
                        }}
                        className="hover:underline hover:text-[#D97D55] hover:cursor-pointer"
                      >
                        Profile
                      </li>
                      <li
                        onClick={() => {
                          handleLogout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="hover:underline hover:text-[#D97D55] hover:cursor-pointer"
                      >
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </button>
          ) : (
            <Link
              to="/login"
              title="Login"
              className="flex flex-col hover:text-[#D97D55]"
            >
              <p className="flex items-center gap-1 ">
                <FaUserAlt />
                <span className="font-bold">Login</span>
              </p>
            </Link>
          )}
          {/* <Link
            to="/cart"
            className="relative flex items-center text-sm hover:text-[#D97D55] font-bold "
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="ml-1">Cart</span>
            <span className="absolute -top-2 -right-3 bg-[#D97D55] text-white text-xs rounded-full px-1">
              {(cartItems || []).length}
            </span>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
