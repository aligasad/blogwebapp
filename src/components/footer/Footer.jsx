import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
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
    <footer className="bg-[#0B1C17] text-white px-6 md:px-20 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            The <span className="text-[#46C47E]">Insight</span> Blog
          </h2>
          <p className="text-sm leading-relaxed mb-4 text-gray-300">
            A place where ideas meet creativity. Explore articles on tech,
            design, productivity, and life — curated for curious minds.
          </p>
          <div className="flex space-x-3 mt-4">
            {[FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, index) => (
              <div
                key={index}
                className="group w-9 h-9 flex items-center justify-center bg-[#163A2E] rounded-full cursor-pointer transform transition-transform duration-200 hover:scale-110"
              >
                <Icon className="text-white text-lg group-hover:text-[#46C47E]" />
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer hover:text-[#46C47E]">Technology</li>
            <li className="hover:underline cursor-pointer hover:text-[#46C47E]">Lifestyle</li>
            <li className="hover:underline cursor-pointer hover:text-[#46C47E]">Design</li>
            <li className="hover:underline cursor-pointer hover:text-[#46C47E]">Travel</li>
            <li className="hover:underline cursor-pointer hover:text-[#46C47E]">Productivity</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li
              className="hover:underline cursor-pointer hover:text-[#46C47E]"
              onClick={() => navigate("about")}
            >
              About
            </li>
            <li
              className="hover:underline cursor-pointer hover:text-[#46C47E]"
              onClick={() => navigate("blogs")}
            >
              All Blogs
            </li>
            <li
              className="hover:underline cursor-pointer hover:text-[#46C47E]"
              onClick={() => navigate("contact")}
            >
              Contact
            </li>
            <li
              className="hover:underline cursor-pointer hover:text-[#46C47E]"
              onClick={() => navigate("privacy-policy")}
            >
              Privacy Policy
            </li>
            <li
              className="hover:underline cursor-pointer hover:text-[#46C47E]"
              onClick={() => navigate("terms&conditions")}
            >
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
          <p className="text-sm mb-4 text-gray-300">
            Get the latest stories, writing tips, and creative insights straight to your inbox.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-[#2C5547] bg-transparent text-white placeholder-gray-400 mb-3 focus:outline-none focus:ring-2 focus:ring-[#46C47E]"
          />
          <button
            onClick={handleSubscribe}
            className="w-full bg-[#46C47E] text-[#0B1C17] font-medium py-2 rounded-md transition transform hover:scale-105 cursor-pointer"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#1E4A3B] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <p className="mb-4 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} The Insight Blog — Crafted with passion for writers and readers.
        </p>
        <div className="flex space-x-6">
          <a
            onClick={() => navigate("privacy-policy")}
            className="hover:underline cursor-pointer hover:text-[#46C47E]"
          >
            Privacy Policy
          </a>
          <a
            onClick={() => navigate("terms&conditions")}
            className="hover:underline cursor-pointer hover:text-[#46C47E]"
          >
            Terms
          </a>
          <a
            href="#top"
            className="hover:underline cursor-pointer hover:text-[#46C47E]"
          >
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
