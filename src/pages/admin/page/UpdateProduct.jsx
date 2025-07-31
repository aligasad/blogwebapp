import { useEffect } from "react";
import { useData } from "../../../context/data/MyState";

function UpdateProduct() {
  const context = useData(); // custom hook
  const { products, setProducts, updateProduct } = context;

  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  

  return (
    <div className=" py-3 ">
      <div className=" flex justify-center items-center h-full">
        <div className=" bg-gray-800 px-10 py-5 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Update Product
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
            name="quantity"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Quantity (e.g., 500g, 1L)"
            value={products.quantity || ""}
            onChange={(e) =>
              setProducts({ ...products, quantity: e.target.value })
            }
          />
          <input
            type="number"
            name="originalPrice"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Original Price (₹)"
            value={products.originalPrice || ""}
            onChange={(e) =>
              setProducts({ ...products, originalPrice: e.target.value })
            }
          />
          <input
            type="number"
            name="price"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Selling Price (₹)"
            value={products.price}
            onChange={(e) =>
              setProducts({ ...products, price: e.target.value })
            }
          />
          <input
            type="number"
            name="stock"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Stock"
            value={products.stock || ""}
            onChange={(e) =>
              setProducts({ ...products, stock: e.target.value })
            }
          />
          <input
            type="text"
            name="tags"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Tags (comma separated)"
            value={products.tags || ""}
            onChange={(e) => setProducts({ ...products, tags: e.target.value })}
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
          
          <input
            type="text"
            name="category"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Category"
            value={products.category}
            onChange={(e) =>
              setProducts({ ...products, category: e.target.value })
            }
          />
          <input
            type="text"
            name="type"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Type"
            value={products.type}
            onChange={(e) => setProducts({ ...products, type: e.target.value })}
          />
          <textarea
            cols="30"
            rows="4"
            name="description"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Description"
            value={products.description}
            onChange={(e) =>
              setProducts({ ...products, description: e.target.value })
            }
          ></textarea>
          {/* New Ingredients Field */}
          <textarea
            cols="30"
            rows="3"
            name="ingredients"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Ingredients (comma separated or paragraph)"
            value={products.ingredients || ""}
            onChange={(e) =>
              setProducts({ ...products, ingredients: e.target.value })
            }
          ></textarea>
          {/* New Benefits Field */}
          <textarea
            cols="30"
            rows="3"
            name="benefits"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Benefits (comma separated or paragraph)"
            value={products.benefits || ""}
            onChange={(e) =>
              setProducts({ ...products, benefits: e.target.value })
            }
          ></textarea>
          {/* Rating Field */}
          {/* <input
            type="number"
            name="rating"
            min="1"
            max="5"
            step="0.1"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Rating (1-5)"
            value={products.rating || ""}
            onChange={(e) =>
              setProducts({ ...products, rating: e.target.value })
            }
          /> */}
          {/* Review Field */}
          {/* <textarea
            cols="30"
            rows="2"
            name="review"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Review"
            value={products.review || ""}
            onChange={(e) =>
              setProducts({ ...products, review: e.target.value })
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
                className="accent-green-500 w-4 h-4"
              />
              <span className="text-green-700 text-sm">Mark as New</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={products.onSale || false}
                onChange={(e) =>
                  setProducts({ ...products, onSale: e.target.checked })
                }
                className="accent-green-500 w-4 h-4"
              />
              <span className="text-green-700 text-sm">On Sale</span>
            </label>
          </div>
        </div>
            </div>
          <div className=" flex justify-center mb-3">
            <button
              onClick={updateProduct}
              className="mt-3 px-6 py-2 bg-[#449474] text-white font-semibold rounded-full hover:bg-[#003d29] transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
