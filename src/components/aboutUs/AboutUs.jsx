import React, { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <section className="bg-[#fefdfb] py-20 px-6 text-[#2b2b2b]">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#006b3c] to-[#003d29] bg-clip-text text-transparent mb-4">
            About Noor By Shayan
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#4a4a4a]">
            Discover the elegance of nature and heritage blended into every
            drop.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-[17px] md:text-lg leading-relaxed text-justify">
          <p>
            <strong className="text-[#006b3c]">Noor By Shayan</strong> is more
            than a skincare brand – it's a reflection of purity, heritage, and
            healing, inspired by the timeless wisdom of Ayurveda and powered by
            the elegance of nature. A proud creation under{" "}
            <strong>Zaphira Organic Farms (OPC) Private Limited</strong>, Noor
            blends handmade artistry with the science of skin wellness.
          </p>

          <p>
            Each product is a story of tradition, hand-blended with ingredients
            like saffron, sandalwood, rose, turmeric, and organic oils. Free
            from harmful chemicals, parabens, and artificial fragrances, Noor
            promises authenticity – skincare that speaks the language of your
            skin.
          </p>

          <p>
            Founded with the belief that beauty should be clean, conscious, and
            culturally rooted, Noor By Shayan is made for the modern soul
            seeking results without compromise – elegance without excess.
          </p>
        </div>

        {/* Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#e0e0e0]">
            <h2 className="text-2xl font-semibold text-[#003d29] mb-4">
              We are proudly:
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[#444]">
              <li>✅ 100% Organic & Handmade</li>
              <li>✅ Based on Ayurvedic Formulations</li>
              <li>✅ Cruelty-Free & Eco-Conscious</li>
              <li>✅ Dermatologically Safe</li>
              <li>✅ Made in India with Love</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#fdf6f0] to-[#fff] p-6 rounded-2xl shadow-lg border border-[#f2e9e0] flex items-center">
            <p className="text-lg leading-relaxed text-[#2d2d2d]">
              From our bestselling <strong>Kumkumadi Night Elixir</strong> to
              our indulgent <strong>Sandal-Rose Ubtans</strong>, every jar is
              handcrafted in small batches – ensuring freshness, quality, and
              care.
            </p>
          </div>
        </div>

        {/* Closing Line */}
        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl italic text-[#006b3c] font-medium">
            ✨ Noor is not just what you wear on your skin – it’s the light you
            carry from within.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
