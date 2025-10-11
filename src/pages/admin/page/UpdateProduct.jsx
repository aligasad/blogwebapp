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
                onChange={(e) =>
                  setProducts({ ...products, author: e.target.value })
                }
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
