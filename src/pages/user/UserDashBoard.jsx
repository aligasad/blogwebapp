import React, { useEffect, useState } from "react";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

function UserDashboard() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null); // ✅ blog being edited
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    author: "",
    imageUrl: "",
    imageUrl2: "",
    imageUrl3: "",
    imageUrl4: "",
    content: "",
    category: "",
    isNew: false,
  });

  const fetchUserBlogs = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.user?.uid) {
        alert("⚠️ Please login first.");
        return;
      }

      const q = query(
        collection(firebaseDB, "blogs"),
        where("userId", "==", user.user.uid)
      );
      const snapshot = await getDocs(q);
      const blogsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserBlogs(blogsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(firebaseDB, "blogs", id));
      setUserBlogs(userBlogs.filter((blog) => blog.id !== id));
      toast.success("🗑️ Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("❌ Failed to delete blog");
    }
  };

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setFormData({ ...blog }); // prefill form with existing data
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const blogRef = doc(firebaseDB, "blogs", editingBlog.id);
      await updateDoc(blogRef, { ...formData });
      setUserBlogs(
        userBlogs.map((b) =>
          b.id === editingBlog.id ? { ...b, ...formData } : b
        )
      );
      toast.success("✏️ Blog updated successfully!");
      setEditingBlog(null);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("❌ Failed to update blog");
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-green-700 text-lg font-semibold">
        Loading your blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4E9D7] to-[#B8C4A9] py-10 px-4">
      <h1 className="text-3xl font-extrabold text-[#D97D55] text-center mb-8">
        ✍️ Your Blogs Dashboard
      </h1>

      {userBlogs.length === 0 ? (
        <div className="text-center text-[#6FA4AF] mt-12 text-lg">
          You haven’t written any blogs yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {userBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#F4E9D7] shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all border border-[#B8C4A9]"
            >
              <div className="relative">
                {blog.imageUrl && (
                  <img
                    onClick={() =>
                      (window.location.href = `/bloginfo/${blog.id}`)
                    }
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="cursor-pointer h-48 w-full object-cover"
                  />
                )}
                <span className="absolute top-3 left-3 bg-[#6FA4AF] text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {blog.category}
                </span>
              </div>

              <div className="p-4">
                <h2 className="text-xl font-bold text-[#D97D55] mb-1">
                  {blog.title}
                </h2>
                <p className="text-sm text-[#6FA4AF] mb-2">{blog.subtitle}</p>
                <p className="text-[#3b3b3b] text-sm line-clamp-3">
                  {blog.content}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-xs bg-[#B8C4A9] hover:bg-[#D97D55] px-2 py-1 rounded">
                    <p
                      className="text-[#D97D55] text-sm cursor-pointer hover:text-[#B8C4A9] font-semibold transition-all duration-100"
                      onClick={() => (window.location.href = `/bloginfo/${id}`)}
                    >
                      Read More
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEditClick(blog)}
                      className="text-[#6FA4AF] hover:text-[#D97D55] text-sm font-bold cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-[#D97D55] hover:text-[#6FA4AF] text-sm font-bold cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-[#F4E9D7] rounded-2xl p-6 w-full max-w-2xl relative my-10">
            <h2 className="text-2xl font-bold text-[#D97D55] mb-4 text-center">
              Edit Blog
            </h2>
            <button
              onClick={() => setEditingBlog(null)}
              className="absolute top-4 right-4 text-[#6FA4AF] hover:text-[#D97D55] font-bold"
            >
              ✖
            </button>

            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 gap-3 max-h-[75vh] overflow-y-auto pr-2"
            >
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="border border-[#B8C4A9] p-2 rounded"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                className="border border-[#B8C4A9] p-2 rounded"
              />
              <input
                type="text"
                placeholder="Author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="border border-[#B8C4A9] p-2 rounded"
              />
              <input
                type="text"
                placeholder="Main Image URL"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="border border-[#B8C4A9] p-2 rounded"
              />
              <input
                type="text"
                placeholder="Image URL 2"
                value={formData.imageUrl2}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl2: e.target.value })
                }
                className="border border-[#B8C4A9] p-2 rounded"
              />
              <input
                type="text"
                placeholder="Image URL 3"
                value={formData.imageUrl3}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl3: e.target.value })
                }
                className="border border-[#B8C4A9] p-2 rounded"
              />
              <input
                type="text"
                placeholder="Image URL 4"
                value={formData.imageUrl4}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl4: e.target.value })
                }
                className="border border-[#B8C4A9] p-2 rounded"
              />
              <textarea
                placeholder="Content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="border border-[#B8C4A9] p-2 rounded"
                rows={4}
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border border-[#B8C4A9] p-2 rounded"
              />
              <input
                type="text"
                placeholder="Type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="border border-[#B8C4A9] p-2 rounded"
              />
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={formData.isNew || false}
                  onChange={(e) =>
                    setFormData({ ...formData, isNew: e.target.checked })
                  }
                  className="accent-[#D97D55] w-4 h-4"
                />
                <span className="text-[#6FA4AF] text-sm">Mark as New</span>
              </label>

              <button
                type="submit"
                className="mt-4 bg-[#D97D55] hover:bg-[#B8C4A9] text-white font-bold py-2 rounded-lg transition-all"
              >
                Update Blog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
