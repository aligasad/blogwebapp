import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
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
                className="w-9 h-9 flex items-center justify-center bg-[#19523f] rounded-full cursor-pointer transform transition-transform duration-200 hover:scale-110"
              >
                <Icon className="text-white text-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Products</li>
            <li className="hover:underline cursor-pointer">Ingredients</li>
            <li className="hover:underline cursor-pointer">Reviews</li>
            <li className="hover:underline cursor-pointer"><a href="tel:+7417331926">Contact</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MdEmail /> office@thezaphira.com
            </li>
            <li className="flex items-center gap-2">
              <MdPhone /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <MdLocationOn /> Lucknow, India
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
            className="w-full px-4 py-2 rounded-md border border-[#19523f] bg-transparent text-white placeholder-white mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button className="w-full bg-[#3ca769] text-white font-medium py-2 rounded-md transition transform hover:scale-105 cursor-pointer">
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
          <a href="#" className="hover:underline cursor-pointer">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline cursor-pointer">
            Terms of Service
          </a>
          <a href="#" className="hover:underline cursor-pointer">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;