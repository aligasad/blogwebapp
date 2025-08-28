import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
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
    <footer className="bg-[#003d29] text-white px-6 md:px-20 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div>
          <h2 className="text-xl font-bold flex items-center mb-4">
            <span className="text-2xl mr-2">🌿</span> Pure Organic
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            Transforming skincare with the purest organic ingredients.
            Experience the power of nature for radiant, healthy skin.
          </p>
          <div className="flex space-x-3">
            {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, index) => (
              <div
                key={index}
                className="group w-9 h-9 flex items-center justify-center bg-[#19523f] rounded-full cursor-pointer transform transition-transform duration-200 hover:scale-110"
              >
                <Icon className="text-white text-lg group-hover:text-amber-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li
              className="hover:underline cursor-pointer hover:text-amber-400"
              onClick={() => navigate("about")}
            >
              About Us
            </li>
            <li className="hover:underline cursor-pointer hover:text-amber-400">Products</li>
            <li
              className="hover:underline cursor-pointer hover:text-amber-400"
              onClick={() => navigate("return-policy")}
            >
              Return Policy
            </li>
            <li className="hover:underline cursor-pointer hover:text-amber-400">Reviews</li>
            <li className="hover:underline cursor-pointer hover:text-amber-400">
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MdEmail /> <a href="mailto:office@thezaphira.com">office@thezaphira.com</a>
            </li>
            <li className="flex items-center gap-2 hover:text-rose-600">
              <MdPhone /> <a href="tel:+917518202507">+91-7518202507</a>
            </li>
            <li className="flex items-center gap-2">
              <MdLocationOn />{" "}
              <a
                href="https://www.google.com/maps?q=Zaphira Organic Farm Lucknow"
                target="_blank"
                rel="NoorByShayan"
              >
                Lucknow, India
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm mb-4">
            Get the latest skincare tips and exclusive offers.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-[#19523f] bg-transparent text-white placeholder-white mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={handleSubscribe}
            className="w-full bg-[#3ca769] text-white hover:text-amber-300 font-medium py-2 rounded-md transition transform hover:scale-105 cursor-pointer"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#19523f] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white">
        <p className="mb-4 md:mb-0">
          © 2024 Pure Organic Skincare. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a
            onClick={() => navigate("privacy-policy")}
            className="hover:underline cursor-pointer hover:text-amber-400"
          >
            Privacy Policy
          </a>
          <a
            onClick={() => navigate("terms&condition")}
            className="hover:underline cursor-pointer hover:text-amber-400"
          >
            Terms and Conditions
          </a>
          <a href="#" className="hover:underline cursor-pointer hover:text-amber-400">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
