import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-[#fffaf4] text-[#2c2c2c] py-12 px-6 md:px-12 lg:px-24 leading-relaxed">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-[#003d29]">Terms & Conditions</h1>
      <p className="mb-8">
        Welcome to <strong>Noor By Shayan</strong>, a premium handmade Ayurvedic skincare brand under <strong>Zaphira Organic Farms (OPC) Private Limited</strong>.
        By accessing or purchasing from our website, social media platforms, or any affiliated channels, you agree to abide by the following terms and conditions.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">1. 🛒 Product Use & Responsibility</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All products sold by Noor By Shayan are for external, personal use only.</li>
            <li>Please read all ingredients and usage instructions before applying. Patch testing is recommended.</li>
            <li>We are not liable for any skin reactions, allergies, or issues resulting from incorrect usage or personal skin conditions.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">2. 📦 Orders & Payments</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Orders are confirmed only after full payment is received, except for Cash on Delivery (COD).</li>
            <li>Once placed, orders cannot be modified or cancelled.</li>
            <li>We reserve the right to cancel orders suspected of fraud or incorrect address information.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">3. 📬 Shipping & Delivery</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Orders are shipped via trusted courier partners.</li>
            <li>Shipping timelines are mentioned in our Shipping Policy but may vary due to external conditions.</li>
            <li>If delivery fails due to customer unavailability, reshipping charges will apply.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">4. 🔁 Return & Refund Policy</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Due to the handmade, hygienic nature of our products, returns are not accepted.</li>
            <li>Refunds are only provided if the product is damaged in transit or the wrong product is received.</li>
            <li>To be eligible, issues must be reported within 24 hours with the product unused and sealed.</li>
            <li>No refund will be processed if the seal is broken or product is used.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">5. 📊 Pricing & Promotions</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All prices are in INR (₹) and may change without notice.</li>
            <li>Promotions are time-bound and cannot be applied post order placement.</li>
            <li>Noor By Shayan reserves the right to modify or terminate any offer at any time.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">6. 🛡 Intellectual Property</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All content, images, designs, and brand identity belong to Zaphira Organic Farms.</li>
            <li>Unauthorized use, reproduction, or distribution is prohibited and may lead to legal action.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">7. ⚖ Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Lucknow, Uttar Pradesh.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">8. 📞 Contact Information</h2>
          <p>For queries, concerns, or grievances, contact us at:</p>
          <ul className="list-disc list-inside mt-2">
            <li>📧 <a href="mailto:hello@noorbyshayan.in" className="text-[#007044] underline">hello@noorbyshayan.in</a></li>
            <li>📞 <a href="tel:+917518202507" className="text-[#007044] underline">+91-7518202507</a></li>
          </ul>
        </div>
      </div>

      <p className="mt-10 text-sm text-[#6a6a6a]">
        By placing an order, you confirm that you have read, understood, and agreed to the above Terms & Conditions.
      </p>
    </section>
  );
};

export default TermsAndConditions;