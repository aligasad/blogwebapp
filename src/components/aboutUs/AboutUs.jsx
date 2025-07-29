import React from "react";
import { Droplet, Sparkles, Leaf } from "lucide-react";

function AboutUs() {
  return (
    <section className="text-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-100 via-white to-green-50 py-16 px-6 text-center">
        <h1 className="text-5xl font-bold text-green-800 mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          Nature's best for your skin and hair. We craft 100% organic shampoos, face serums, and soaps that cleanse,
          nourish, and rejuvenate — naturally.
        </p>
      </div>

      {/* Brand Story */}
      <div className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          src="https://i.ibb.co/dwMqHHt0/banner.jpg"
          alt="Organic Products"
          className="rounded-3xl shadow-xl"
        />
        <div>
          <h2 className="text-3xl font-semibold text-green-700 mb-4">Rooted in Nature</h2>
          <p className="text-gray-600 leading-relaxed">
            Every bottle of shampoo, every serum drop, every soap bar — is a reflection of our passion for clean beauty.
            Handcrafted in small batches, our products are made using ancient Ayurvedic wisdom and modern sustainability.
            Free from sulfates, parabens, and synthetic fragrances.
          </p>
        </div>
      </div>

      {/* What We Offer */}
      <div className="bg-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-12">Our Specialities</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <div className="bg-green-100 inline-block p-4 rounded-full mb-4">
              <Droplet className="h-8 w-8 text-green-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Herbal Shampoo</h3>
            <p className="text-gray-600 text-sm">
              Enriched with neem, bhringraj, and aloe vera — for strong, dandruff-free hair without harsh chemicals.
            </p>
          </div>
          <div>
            <div className="bg-green-100 inline-block p-4 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-green-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Glow Serum</h3>
            <p className="text-gray-600 text-sm">
              A lightweight blend of tulsi, saffron, and rosehip oil that restores your skin's natural glow and reduces blemishes.
            </p>
          </div>
          <div>
            <div className="bg-green-100 inline-block p-4 rounded-full mb-4">
              <Leaf className="h-8 w-8 text-green-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ayurvedic Soap</h3>
            <p className="text-gray-600 text-sm">
              Cold-processed soaps with neem, turmeric, and sandalwood — gently cleansing while maintaining skin balance.
            </p>
          </div>
        </div>
      </div>

      {/* Ethical Commitment */}
      <div className="bg-green-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Our Promise</h2>
          <p className="text-gray-700 leading-relaxed">
            All our products are <strong>cruelty-free</strong>, <strong>vegan</strong>, and made with <strong>zero toxic chemicals</strong>.
            We believe in transparency, sustainability, and holistic well-being — from our farms to your shelf.
          </p>
        </div>
      </div>

      {/* Founder Message */}
      <div className="bg-white py-14 text-center">
        <p className="italic text-lg max-w-3xl mx-auto text-green-800 mb-4">
          “Organic beauty isn't a trend — it's a return to our roots. With every product we create, we honor the Earth and your body.”
        </p>
        <h4 className="text-green-700 font-semibold text-base">— Shayan, Founder</h4>
      </div>
    </section>
  );
}

export default AboutUs;
