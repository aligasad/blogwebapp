import { useEffect } from "react";
import { useData } from "../../../context/data/MyState";

function AddProduct() {
  const context = useData();
  const { products, setProducts, addProduct } = context;

  return (
    <div className="py-6 min-h-screen bg-gradient-to-br from-green-50 to-lime-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
        <h1 className="text-center text-2xl font-extrabold text-green-800 mb-6 tracking-wide">
          Add New Blogs
        </h1>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="title"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Product Title"
            value={products.title}
            onChange={(e) =>
              setProducts({ ...products, title: e.target.value })
            }
          />
          <input
            type="text"
            name="subtitle"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Sub Title"
            value={products.subtitle || ""}
            onChange={(e) =>
              setProducts({ ...products, subtitle: e.target.value })
            }
          />
          <input
            type="text"
            name="author"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Author Name"
            value={products.author || ""}
            onChange={(e) => setProducts({ ...products, author: e.target.value })}
          />
          <input
            type="text"
            name="imageUrl"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Image URL"
            value={products.imageUrl}
            onChange={(e) =>
              setProducts({ ...products, imageUrl: e.target.value })
            }
          />
          <input
            type="text"
            name="imageUrl2"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Image URL"
            value={products.imageUrl2}
            onChange={(e) =>
              setProducts({ ...products, imageUrl2: e.target.value })
            }
          />
          <input
            type="text"
            name="imageUrl3"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Image URL"
            value={products.imageUrl3}
            onChange={(e) =>
              setProducts({ ...products, imageUrl3: e.target.value })
            }
          />
          <input
            type="text"
            name="imageUrl4"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Image URL"
            value={products.imageUrl4}
            onChange={(e) =>
              setProducts({ ...products, imageUrl4: e.target.value })
            }
          />

          <textarea
            cols="30"
            rows="4"
            name="content"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="content"
            value={products.content}
            onChange={(e) =>
              setProducts({ ...products, content: e.target.value })
            }
          ></textarea>
          
          <input
            type="text"
            name="category"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Category (Like Buildings, Monoments etc"
            value={products.category}
            onChange={(e) =>
              setProducts({ ...products, category: e.target.value })
            }
          />
          <input
            type="text"
            name="type"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Type Technology, etc"
            value={products.type}
            onChange={(e) =>
              setProducts({ ...products, type: e.target.value })
            }
          />
          
          {/* New Benefits Field */}
          {/* <textarea
            cols="30"
            rows="3"
            name="benefits"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Benefits (comma separated or paragraph)"
            value={products.benefits || ""}
            onChange={(e) =>
              setProducts({ ...products, benefits: e.target.value })
            }
          ></textarea> */}
          {/* Checkboxes */}
          <div className="flex items-center gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={products.isNew || false}
                onChange={(e) =>
                  setProducts({ ...products, isNew: e.target.checked })
                }
                className="accent-rose-500 w-4 h-4"
              />
              <span className="text-green-700 text-sm">Mark as New</span>
            </label>
          </div>
        </div>
        <button
          onClick={addProduct}
          className="mt-6 w-full bg-gradient-to-r from-green-400 to-lime-400 text-white font-bold py-2 rounded-lg shadow hover:from-green-500 hover:to-lime-500 transition cursor-pointer"
        >
          Add Product
        </button>
      </div>
    </div>

    
  );
}

export default AddProduct;
