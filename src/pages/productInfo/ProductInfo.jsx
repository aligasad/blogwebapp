import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
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
      const q = query(collection(firebaseDB, "blogs"), where("category", "==", blog.category));
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
    <section className="bg-gradient-to-br from-[#E6F5EE] to-[#D4E7F7] text-gray-800 min-h-screen pb-16">
      {/* Blog Header */}
      <div className="relative w-full bg-[#124170] text-white py-16 mb-10">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{blog.title}</h1>
          <p className="text-base md:text-lg opacity-90 mb-3">{blog.subtitle}</p>
          <div className="flex justify-center items-center flex-wrap gap-3 text-sm">
            <span className="bg-[#67C090] px-3 py-1 rounded-full font-semibold">
              {blog.category || "Uncategorized"}
            </span>
            <span>{blog.author || "Anonymous"}</span>
            <span>• {blog.date || "2 days ago"}</span>
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Main Image */}
        <div className="rounded-2xl overflow-hidden shadow-md mb-8">
          <img
            src={selectedImage || blog.imageUrl}
            alt={blog.title}
            className="w-full max-h-[70vh] object-cover transition-all duration-300"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg md:prose-xl max-w-none leading-relaxed text-gray-700 mb-10">
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
        <div className="border border-gray-200 rounded-2xl mb-10 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("images")}
            className="w-full text-left flex justify-between items-center px-5 py-3 bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700"
          >
            <span>Additional Images</span>
            <FaArrowCircleDown
              className={`transform transition-transform duration-300 ${
                openSection === "images" ? "rotate-180 text-[#26667F]" : ""
              }`}
            />
          </button>
          {openSection === "images" && (
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white">
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
              {![blog.imageUrl2, blog.imageUrl3, blog.imageUrl4].some(Boolean) && (
                <p className="text-gray-400 italic">No additional images</p>
              )}
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#26667F] mb-4">Comments</h2>
          <ReviewSection productId={{ id: params.id }} />
        </div>

        {/* Related Blogs */}
        {similarBlogs.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-[#124170] mb-6">
              You may also like
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {similarBlogs.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => (window.location.href = `/bloginfo/${b.id}`)}
                >
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-xs uppercase text-[#67C090] font-semibold mb-1">
                      {b.category}
                    </p>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
                      {b.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
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
