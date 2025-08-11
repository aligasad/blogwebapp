import React, { useEffect } from "react";

const ReturnPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <section className="bg-[#fffaf4] text-[#2c2c2c] py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#663c00]">
          Return & Refund Policy
        </h2>
        <p className="text-lg mb-6 leading-relaxed">
          At <span className="font-semibold">Noor By Shayan</span>, each product
          is handcrafted with utmost care and precision using the purest organic
          ingredients. Due to the personal and sensitive nature of skincare
          products, and in order to maintain the highest hygiene and safety
          standards, we follow a strict return and refund policy.
        </p>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-[#3d2f19]">
            🧾 Eligibility for Return/Refund:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
            <li>
              <span className="font-medium">Damaged or Defective Product:</span>{" "}
              If the product is damaged during transit or found defective upon
              delivery. Must be reported within{" "}
              <span className="font-medium">24 hours</span> of delivery with
              proper unboxing video and photographs as proof.
            </li>
            <li>
              <span className="font-medium">Wrong Product Delivered:</span> In
              case you receive a different product from what you ordered.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-[#3d2f19]">
            ❌ Non-Returnable / Non-Refundable Items:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
            <li>If the product seal is broken or packaging is opened.</li>
            <li>If the product is used or tampered with.</li>
            <li>
              For reasons of personal dislike of texture, fragrance, or results
              (as skin types vary).
            </li>
            <li>
              For items bought during a sale, combo offer, or promotional
              campaign (unless damaged or wrong item).
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-[#3d2f19]">
            📝 Return Procedure:
          </h3>
          <p className="mb-2">
            To initiate a return, email us at{" "}
            <a
              href="mailto:support@noorbyshayan.com"
              className="text-[#00823b] font-medium underline"
            >
              support@noorbyshayan.com
            </a>{" "}
            with your Order ID and issue details within 24 hours of receiving
            the product.
          </p>
          <p className="mb-2">Please attach:</p>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>Unboxing video</li>
            <li>Photos of the damaged/wrong product</li>
          </ul>
          <p className="mt-2">
            Our customer service team will guide you through the next steps
            after reviewing your request.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-[#3d2f19]">
            💸 Refund Process:
          </h3>
          <p className="mb-2">
            Once the return is approved and verified, the refund will be
            processed within{" "}
            <span className="font-medium">7–10 business days</span> to your
            original mode of payment.
          </p>
          <p>
            In case of Cash on Delivery (COD), refunds will be initiated to your
            bank account after confirmation.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-[#3d2f19]">
            🧴 Note:
          </h3>
          <p className="leading-relaxed">
            As all our products are handmade, Ayurvedic, and preservative-free,
            slight variations in color, texture, or scent are natural and do not
            qualify as defects.
          </p>
        </div>

        <div className="border-t pt-6 text-base">
          <p className="font-semibold mb-1">
            For any assistance, feel free to reach us at:
          </p>
          <p className="mb-1">
            📧{" "}
            <a
              href="mailto:hello@noorbyshayan.in"
              className="text-[#00823b] underline"
            >
              hello@noorbyshayan.in
            </a>
          </p>
          <p>
            📞{" "}
            <a href="tel:+917518202507" className="text-[#00823b] underline">
              +91-7518202507
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReturnPolicy;
