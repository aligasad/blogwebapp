import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png"
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { firebaseDB } from "../../firebase/FirebaseConfig";

const Footer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState("");

  async function handleSubscribe() {
    if (!user) {
      toast.warning("Please login to subscribe.");
      return;
    }
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const subscribersRef = collection(firebaseDB, "subscribers");
      const q = query(subscribersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.warning("This email is already subscribed.");
        return;
      }

      await addDoc(subscribersRef, {
        email,
        subscribedAt: Timestamp.now(),
      });

      setEmail("");
      toast.success("Thank you for subscribing!");
    } catch (error) {
      console.error("Error adding email:", error);
      toast.error("Failed to subscribe. Please try again later.");
    }
  }

  return (
    <footer className="bg-[#F4E9D7] text-[#0B1C17] px-6 md:px-20 py-14 border-t border-[#B8C4A9]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About Section */}
        <div>
          <div className="text-2xl font-bold mb-1 text-[#D97D55] flex justify-start items-center gap-2 ">
            <img src={logo} className="h-6 shadow shadow-[#d97d55] rounded-sm" />
            <p><span className="text-[#6FA4AF] "> Insight</span> Blog</p>
          </div>
          <p className="text-sm leading-relaxed mb-4 text-[#4a4a4a]">
            A place where ideas meet creativity. Explore articles on tech,
            design, productivity, and life — curated for curious minds.
          </p>
          <div className="flex space-x-3 mt-4">
            {[FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="group w-9 h-9 flex items-center justify-center bg-[#D97D55] rounded-full cursor-pointer transform transition-transform duration-200 hover:scale-110"
                >
                  <Icon className="text-[#F4E9D7] text-lg group-hover:text-[#6FA4AF]" />
                </div>
              )
            )}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#D97D55]">Categories</h3>
          <ul className="space-y-2 text-sm text-[#0B1C17]">
            {["Technology", "Lifestyle", "Design", "Travel", "Productivity"].map(
              (cat, i) => (
                <li
                  key={i}
                  className="hover:underline cursor-pointer hover:text-[#6FA4AF]"
                >
                  {cat}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#D97D55]">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[#0B1C17]">
            {[
              { name: "About", path: "about" },
              { name: "All Blogs", path: "blogs" },
              { name: "Contact", path: "contact" },
              { name: "Privacy Policy", path: "privacy-policy" },
              { name: "Terms & Conditions", path: "terms&conditions" },
            ].map((item, i) => (
              <li
                key={i}
                className="hover:underline cursor-pointer hover:text-[#6FA4AF]"
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#D97D55]">
            Join Our Newsletter
          </h3>
          <p className="text-sm mb-4 text-[#4a4a4a]">
            Get the latest stories, writing tips, and creative insights straight
            to your inbox.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-[#B8C4A9] bg-transparent text-[#0B1C17] placeholder-[#6FA4AF] mb-3 focus:outline-none focus:ring-2 focus:ring-[#D97D55]"
          />
          <button
            onClick={handleSubscribe}
            className="w-full bg-[#D97D55] text-[#F4E9D7] font-medium py-2 rounded-md transition transform hover:scale-105 cursor-pointer"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#B8C4A9] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-[#6FA4AF]">
        <p className="mb-4 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} The Insight Blog — Crafted with passion for writers and readers.
        </p>
        <div className="flex space-x-6">
          <a
            onClick={() => navigate("privacy-policy")}
            className="hover:underline cursor-pointer hover:text-[#D97D55]"
          >
            Privacy Policy
          </a>
          <a
            onClick={() => navigate("terms&conditions")}
            className="hover:underline cursor-pointer hover:text-[#D97D55]"
          >
            Terms
          </a>
          <a
            href="#top"
            className="hover:underline cursor-pointer hover:text-[#D97D55]"
          >
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
