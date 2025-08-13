import React, { useEffect } from "react";
import { motion } from "framer-motion";
const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="bg-[#E2FCE7] min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-[#376A55]">
          Privacy Policy
        </h1>

        {/* All sections rendered as cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <PolicyCard title="📍 Delivery Locations:">
            <p>
              We currently deliver across Pan India. For specific PIN code
              serviceability, please check at the time of checkout or contact
              our team.
            </p>
          </PolicyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <PolicyCard title="⏱ Processing Time:">
            <ul className="list-disc list-inside space-y-1">
              <li>
                All orders are processed within 1–3 business days after
                receiving full payment.
              </li>
              <li>
                Orders placed on weekends or public holidays will be processed
                on the next working day.
              </li>
            </ul>
          </PolicyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <PolicyCard title="📦 Shipping Duration:">
            <ul className="list-disc list-inside space-y-1">
              <li>Metro Cities: 2–5 business days</li>
              <li>Tier 2/3 Cities & Towns: 4–7 business days</li>
              <li>Remote/Rural Areas: 6–10 business days</li>
            </ul>
            <p className="mt-2 text-sm italic text-gray-600">
              Note: Delivery timelines may vary due to unforeseen circumstances
              such as weather, strikes, or courier delays.
            </p>
          </PolicyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <PolicyCard title="💵 Shipping Charges:">
            <ul className="list-disc list-inside space-y-1">
              <li>Free shipping on all prepaid orders above ₹999.</li>
              <li>Orders below ₹999: Flat shipping fee of ₹60.</li>
              <li>
                Cash on Delivery (COD): Flat fee of ₹79, where applicable.
              </li>
            </ul>
          </PolicyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <PolicyCard title="🔒 Order Tracking:">
            <p>
              Once your order is shipped, you will receive a tracking ID and
              link via SMS/email. You can track your order at every step until
              it reaches your doorstep.
            </p>
          </PolicyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <PolicyCard title="🚫 Order Delays / Issues:">
            <p>If your order hasn’t arrived on time, reach out to us at:</p>
            <ul className="list-none mt-2 space-y-1">
              <li>
                📧{" "}
                <a
                  href="mailto:hello@noorbyshayan.in"
                  className="text-[#376A55] underline"
                >
                  hello@noorbyshayan.in
                </a>
              </li>
              <li>
                📞{" "}
                <a
                  href="tel:+917518202507"
                  className="text-[#376A55] underline"
                >
                  +91-7518202507
                </a>
              </li>
            </ul>
            <p className="mt-2">
              We’ll be happy to assist and resolve your concern promptly.
            </p>
          </PolicyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <PolicyCard title="📌 Important Notes:">
            <ul className="list-disc list-inside space-y-1">
              <li>Once shipped, orders cannot be cancelled or modified.</li>
              <li>
                Noor By Shayan is not responsible for courier delays or
                incorrect addresses.
              </li>
              <li>
                Reshipping costs due to customer unavailability will be borne by
                the customer.
              </li>
            </ul>
          </PolicyCard>
        </motion.div>
      </div>
    </div>
  );
};

// Reusable card component
const PolicyCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <h2 className="text-2xl font-semibold mb-3 text-[#376A55]">{title}</h2>
    <div className="text-base text-gray-800 space-y-2">{children}</div>
  </div>
);

export default PrivacyPolicy;
