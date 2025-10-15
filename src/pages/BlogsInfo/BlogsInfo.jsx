import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import ReviewSection from "../../components/reviews/reviews";
import { FaArrowCircleDown } from "react-icons/fa";

function ProductInfo() {
  const [blog, setBlog] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const params = useParams();

  const fetchBlog = async () => {
    try {
      const docRef = doc(firebaseDB, "blogs", params.id);
      const blogSnap = await getDoc(docRef);
      if (blogSnap.exists()) {
        setBlog(blogSnap.data());
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const fetchSimilarBlogs = async () => {
    if (!blog?.category) return;
    try {
      const q = query(
        collection(firebaseDB, "blogs"),
        where("category", "==", blog.category)
      );
      const snapshot = await getDocs(q);
      const items = [];
      snapshot.forEach((doc) => {
        if (doc.id !== params.id) items.push({ id: doc.id, ...doc.data() });
      });
      setSimilarBlogs(items);
    } catch (error) {
      console.error("Error fetching similar blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  useEffect(() => {
    if (blog?.category) fetchSimilarBlogs();
  }, [blog?.category]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen text-green-700 text-lg font-semibold">
        Loading blog...
      </div>
    );
  }

  return (
    <section
      className="min-h-screen pb-16 text-[#2D2A26]"
      style={{
        background: "linear-gradient(135deg, #F4E9D7 0%, #B8C4A9 100%)",
      }}
    >
      {/* Blog Header */}
      <div
        className="relative w-full py-16 mb-10 text-center"
        style={{
          background: "linear-gradient(135deg, #D97D55, #6FA4AF)",
          color: "white",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-wide">
            {blog.title}
          </h1>
          <p className="text-base md:text-lg opacity-95 mb-3 italic">
            {blog.subtitle}
          </p>
          <div className="flex justify-center items-center flex-wrap gap-3 text-sm">
            <span className="bg-[#B8C4A9] text-[#2D2A26] px-3 py-1 rounded-full font-semibold shadow-sm">
              {blog.category || "Uncategorized"}
            </span>
            <span className="text-[#F4E9D7]">{blog.author || "Anonymous"}</span>
            <span>• {blog.date || "2 days ago"}</span>
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Featured Image */}
        <div className="w-full rounded-3xl flex items-center justify-center mb-8 overflow-hidden shadow-lg border border-[#EAD7C3]">
          <img
            alt={blog.title}
            src={selectedImage || blog.imageUrl}
            className="w-full max-h-[55vh] object-contain transition-all duration-500 hover:scale-[1.02]"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 justify-center mb-8">
          {[blog.imageUrl, blog.imageUrl2, blog.imageUrl3, blog.imageUrl4]
            .filter(Boolean)
            .map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`thumb-${idx}`}
                className={`w-16 h-16 object-cover rounded-xl cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                  (selectedImage || blog.imageUrl) === url
                    ? "border-[#D97D55] shadow-md"
                    : "border-[#B8C4A9] opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelectedImage(url)}
              />
            ))}
        </div>

        {/* Blog Content */}
        <h3
          className="text-2xl font-bold mt-3 mb-4"
          style={{ color: "#D97D55" }}
        >
          About {blog.title}
        </h3>

        <article className="prose prose-lg max-w-none leading-relaxed text-[#2D2A26] mb-10">
          {blog.content ? (
            blog.content.split("\n").map((para, i) => (
              <p key={i} className="mb-5 text-justify">
                {para}
              </p>
            ))
          ) : (
            <p>No content available.</p>
          )}
        </article>

        {/* Additional Images Accordion */}
        <div className="border border-[#EAD7C3] rounded-2xl mb-10 shadow-md overflow-hidden">
          <button
            onClick={() => toggleSection("images")}
            className="w-full text-left flex justify-between items-center px-5 py-3 bg-[#F4E9D7] hover:bg-[#EAD7C3] font-semibold text-[#2D2A26] transition-all"
          >
            <span>Additional Images</span>
            <FaArrowCircleDown
              className={`transform transition-transform duration-300 ${
                openSection === "images"
                  ? "rotate-180 text-[#D97D55]"
                  : "text-[#6FA4AF]"
              }`}
            />
          </button>

          {openSection === "images" && (
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-[#FFF8F3]">
              {[blog.imageUrl2, blog.imageUrl3, blog.imageUrl4]
                .filter(Boolean)
                .map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`extra-${idx}`}
                    className="w-full h-48 object-cover rounded-lg shadow-sm hover:scale-[1.02] transition-transform"
                  />
                ))}
              {![blog.imageUrl2, blog.imageUrl3, blog.imageUrl4].some(
                Boolean
              ) && (
                <p className="text-[#B8C4A9] italic">No additional images</p>
              )}
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="mt-10 bg-[#FFF8F3] rounded-2xl shadow-md p-6 border border-[#EAD7C3]">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#6FA4AF" }}>
            Comments
          </h2>
          <ReviewSection productId={{ id: params.id }} />
        </div>

        {/* Related Blogs */}
        {similarBlogs.length > 0 && (
          <div className="mt-14">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#D97D55" }}
            >
              You may also like
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {similarBlogs.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#FFF8F3] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#EAD7C3]"
                  onClick={() => (window.location.href = `/bloginfo/${b.id}`)}
                >
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-4">
                    <p
                      className="text-xs uppercase font-semibold mb-1"
                      style={{ color: "#6FA4AF" }}
                    >
                      {b.category}
                    </p>
                    <h3 className="text-lg font-bold mb-1 truncate">
                      {b.title}
                    </h3>
                    <p className="text-sm text-[#B8C4A9] line-clamp-2">
                      {b.subtitle || "Read more..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductInfo;
