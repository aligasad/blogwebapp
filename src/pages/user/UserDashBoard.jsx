import React, { useEffect, useState } from "react";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
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

      const q = query(collection(firebaseDB, "blogs"), where("userId", "==", user.user.uid));
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
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
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
        userBlogs.map((b) => (b.id === editingBlog.id ? { ...b, ...formData } : b))
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 py-10 px-4">
      <h1 className="text-3xl font-extrabold text-green-800 text-center mb-8">
        ✍️ Your Blogs Dashboard
      </h1>

      {userBlogs.length === 0 ? (
        <div className="text-center text-gray-600 mt-12 text-lg">
          You haven’t written any blogs yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {userBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all border border-green-100"
            >
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-xl font-bold text-green-800 mb-1">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{blog.subtitle}</p>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {blog.content.slice(0, 150)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {blog.category || "Uncategorized"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(blog)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl relative">
            <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
              Edit Blog
            </h2>
            <button
              onClick={() => setEditingBlog(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold"
            >
              ✖
            </button>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-3">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Main Image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="border p-2 rounded"
              />
              <textarea
                placeholder="Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="border p-2 rounded"
                rows={4}
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="border p-2 rounded"
              />
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={formData.isNew || false}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="accent-rose-500 w-4 h-4"
                />
                <span className="text-green-700 text-sm">Mark as New</span>
              </label>
              <button
                type="submit"
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg"
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
