import React, { useContext } from "react";
import { useData } from "../../context/data/MyState";

function Testimonial() {
  const context = useData();
  const { mode } = context;
  return (
    <section className="body-font mb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto py-10 max-w-7xl">
        <h1
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
          style={{ color: mode === "dark" ? "#fff" : "#232F3E" }}
        >
          Customer Reviews
        </h1>
        <h2
          className="text-center text-base sm:text-xl font-medium mb-10"
          style={{ color: mode === "dark" ? "#ddd" : "#555" }}
        >
          What our <span className="text-[#429372]">verified buyers</span> are
          saying
        </h2>

        <div className="flex flex-wrap -m-4 justify-center">
          {[
            {
              name: "Jackline Chupli",
              role: "Senior Product Designer",
              content:
                "Absolutely love the quality! It feels premium and fits great. Shipping was fast too. Would highly recommend to anyone looking for a solid product.",
            },
            {
              name: "Narendra Gaddi",
              role: "HOD SOA",
              content:
                "Very pleased with the overall shopping experience. Smooth payment process and timely delivery. Will definitely shop again.",
            },
            {
              name: "Baba Rajwan",
              role: "SanT",
              content:
                "Customer support was responsive and helpful. The discounts were genuine and the product met all expectations. Great job!",
            },
          ].map((review, idx) => (
            <div
              key={idx}
              className="w-full sm:w-1/2 lg:w-1/3 p-4 transition-all duration-300"
            >
              <div className="h-full bg-white dark:bg-[#52997db8] p-6 rounded-2xl border border-gray-200 dark:border-[#2b493d] shadow hover:shadow-lg transition">
                <div className="flex justify-center mb-4">
                  <img
                    alt="testimonial"
                    className="w-16 h-16 object-cover rounded-full border border-gray-300 dark:border-gray-500"
                    src="https://cdn-icons-png.flaticon.com/128/4202/4202843.png"
                  />
                </div>
                <svg
                  className="w-6 h-6 mx-auto mb-4 text-[#000000]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.17 6A5.001 5.001 0 002 11v2a1 1 0 001 1h3v4a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1H5v-1a3 3 0 015.83-1H7.17zm10 0A5.001 5.001 0 0012 11v2a1 1 0 001 1h3v4a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-3v-1a3 3 0 015.83-1h-3.83z" />
                </svg>
                <p className="leading-relaxed text-sm text-[#52997d] dark:text-gray-200 text-center">
                  {review.content}
                </p>
                <div className="mt-6 text-center">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-black dark:text-white">
                    {review.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
