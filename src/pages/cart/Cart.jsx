import React, { useContext, useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  RiDeleteBin6Fill,
  RiDiscountPercentFill,
  RiDiscountPercentLine,
} from "react-icons/ri";
import { FaIndianRupeeSign, FaRupeeSign } from "react-icons/fa6";
import { deleteFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { addDoc, doc, setDoc, collection } from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import { BsEmojiSunglasses } from "react-icons/bs";
import NoOrderFound from "../../components/noorder/NoOrderFound";

function Cart() {
  const context = useData();
  const { mode, calcOffer } = context;
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  // delete item from cart----------------
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.warning("delete item sucessfully");
  };
  // also delete from local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // For calculating total amount of all product-------------
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = Number(temp) + parseFloat(calcOffer(cartItem.price));
    });
    setTotalAmount(temp);
    console.log(temp);
  }, [cartItems]);

  // Calculate GST------------------ -- -- -- -- -- -- -- --
  const calcGST = (price) => {
    let discount = 0.18;
    const discountedPrice = price * discount;
    return discountedPrice.toFixed(2);
  };
  const GST = calcGST(totalAmount);
  const shipping = Number(100);
  const grandTotal =
    Number(totalAmount) > 0 ? totalAmount + shipping + Number(GST) : 0;

  const overallDiscount = parseFloat(grandTotal - grandTotal * 0.1);

  // =============================================================================
  // ----------------------------PAYMENT INTEGRATION CODE ------------------------
  // =============================================================================
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async (method) => {
    // validation
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required");
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    if (method === "cod") {
      // Place order directly for Cash on Delivery
      const orderInfo = {
        cartItems,
        addressInfo,
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        email: JSON.parse(localStorage.getItem("user")).user.email,
        userid: JSON.parse(localStorage.getItem("user")).user.uid,
        paymentId: "COD",
        paymentMethod: "Cash on Delivery",
      };

      try {
        const orderRef = collection(firebaseDB, "orders");
        await addDoc(orderRef, orderInfo);
        toast.success("Order placed successfully with Cash on Delivery!");
        // Optionally clear cart or redirect
      } catch (error) {
        console.log(error);
        toast.error("Failed to place order.");
      }
      return;
    }

    // Online Payment (Razorpay)
    var options = {
      key: "rzp_test_rmJprKHkqwT85l",
      key_secret: "7vqkNgOjwnfx8a13WysHFoiV",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      order_receipt: "order_rcptid_" + name,
      name: "Noor By Shayan",
      description: "Secured Payment Dude ",
      handler: function (response) {
        toast.success("Payment Successful");
        const paymentId = response.razorpay_payment_id;

        // store order information into firebase
        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
          paymentMethod: "Online Payment",
        };

        try {
          const orderRef = collection(firebaseDB, "orders");
          addDoc(orderRef, orderInfo);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#FF9900",
        hide_topbar: false,
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  // Go to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    // <div
    //   className="h-full lg:h-screen bg-gray-100 pt-5 "
    //   style={{
    //     backgroundColor: mode === "dark" ? "#282c34" : "",
    //     color: mode === "dark" ? "white" : "",
    //   }}
    // >
    //   <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    //   <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
    //     <div className="rounded-lg md:w-2/3 max-h-[80vh] overflow-y-auto">
    //       {cartItems.length > 0 ? (
    //         <div className="grid gap-6 sm:grid-cols-2">
    //           {cartItems.map((item, index) => {
    //             const { title, price, imageUrl, description, id, category } =
    //               item;
    //             return (
    //               <div
    //                 key={index}
    //                 className={`flex flex-col bg-white rounded-2xl shadow-xl border border-gray-200 ${
    //                   mode === "dark" ? "bg-[#23272f] border-gray-700" : ""
    //                 } transition hover:scale-[1.01]`}
    //               >
    //                 <img
    //                   src={imageUrl}
    //                   onClick={() =>
    //                     (window.location.href = `/productinfo/${id}`)
    //                   }
    //                   alt="product-image"
    //                   className="w-full h-48 object-cover rounded-t-2xl cursor-pointer"
    //                 />
    //                 <div className="flex-1 flex flex-col justify-between p-4">
    //                   <div>
    //                     <h2
    //                       className="text-lg font-bold mb-1"
    //                       style={{ color: mode === "dark" ? "white" : "" }}
    //                     >
    //                       {title}
    //                     </h2>
    //                     <p className="text-xs text-gray-500 mb-1">{category}</p>
    //                     <p
    //                       className="text-sm mb-2"
    //                       style={{ color: mode === "dark" ? "white" : "" }}
    //                     >
    //                       {description}
    //                     </p>
    //                   </div>
    //                   <div className="flex items-center justify-between mt-2">
    //                     <div className="flex items-center gap-2">
    //                       <span className="text-lg font-bold text-green-600">
    //                         ₹{calcOffer(Number(price))}
    //                       </span>
    //                       <span className="text-sm line-through text-gray-400">
    //                         ₹{price}
    //                       </span>
    //                     </div>
    //                     <RiDeleteBin6Fill
    //                       onClick={() => deleteCart(item)}
    //                       className="text-2xl cursor-pointer hover:text-[#377a5f]"
    //                       title="Remove from cart"
    //                     />
    //                   </div>
    //                 </div>
    //               </div>
    //             );
    //           })}
    //         </div>
    //       ) : (
    //         <NoOrderFound />
    //       )}
    //     </div>

    //     {/* TOTAL AMOUT OF ALL ITEM CARD */}
    //     <div
    //       className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
    //       style={{
    //         backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
    //         color: mode === "dark" ? "white" : "",
    //       }}
    //     >
    //       <div className="mb-2 flex justify-between">
    //         <p
    //           className="text-gray-700"
    //           style={{ color: mode === "dark" ? "white" : "" }}
    //         >
    //           Subtotal
    //         </p>
    //         <p
    //           className="text-gray-700  flex items-center"
    //           style={{ color: mode === "dark" ? "white" : "" }}
    //         >
    //           <FaIndianRupeeSign />
    //           {totalAmount.toFixed(2)}
    //         </p>
    //       </div>
    //       <div className="mb-2 flex justify-between">
    //         <p
    //           className="text-gray-700"
    //           style={{ color: mode === "dark" ? "white" : "" }}
    //         >
    //           GST <span className="text-rose-600 font-bold">18%</span>
    //         </p>
    //         <p
    //           className="text-gray-700  flex items-center"
    //           style={{ color: mode === "dark" ? "white" : "" }}
    //         >
    //           <FaIndianRupeeSign />
    //           {GST}
    //         </p>
    //       </div>
    //       <div className="flex justify-between">
    //         <p
    //           className="text-gray-700"
    //           style={{ color: mode === "dark" ? "white" : "" }}
    //         >
    //           Shipping
    //         </p>
    //         <p
    //           className="text-gray-700 font-semibold flex items-center"
    //           style={{ color: mode === "dark" ? "white" : "" }}
    //         >
    //           <FaIndianRupeeSign />
    //           {shipping.toFixed(2)}
    //         </p>
    //       </div>

    //       <div className="flex justify-between mb-3">
    //         <div className="text-base font-bold line-through "></div>
    //       </div>

    //       <hr />
    //       <div className="flex justify-between mb-3">
    //         <div>
    //           <p
    //             className="text-lg font-bold flex items-center justify-center"
    //             style={{ color: mode === "dark" ? "white" : "" }}
    //           >
    //             Grand Total :
    //           </p>
    //         </div>
    //         <div className="text-lg font-bold">
    //           <p
    //             className="mb-1 text-lg font-bold flex items-center"
    //             style={{ color: mode === "dark" ? "white" : "" }}
    //           >
    //             <FaIndianRupeeSign />
    //             {overallDiscount.toFixed(2)}
    //           </p>
    //         </div>
    //       </div>

    //       <Modal
    //         name={name}
    //         address={address}
    //         pincode={pincode}
    //         phoneNumber={phoneNumber}
    //         setName={setName}
    //         setAddress={setAddress}
    //         setPincode={setPincode}
    //         setPhoneNumber={setPhoneNumber}
    //         buyNow={buyNow}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div
  className="min-h-screen bg-gray-100 pt-5"
  style={{
    backgroundColor: mode === "dark" ? "#1f2937" : "",
    color: mode === "dark" ? "white" : "",
  }}
>
  <h1 className="text-center text-3xl font-extrabold mb-8">My Cart</h1>

  <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-6 px-4 xl:px-0">
    {/* LEFT SIDE - CART ITEMS */}
    <div className="md:w-2/3 space-y-6 max-h-[80vh] overflow-y-auto pr-2">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => {
          const { title, price, imageUrl, description, id, category } = item;
          return (
            <div
              key={index}
              className={`flex bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition duration-200 ${
                mode === "dark" ? "bg-[#2c2f36] border-gray-700" : ""
              }`}
            >
              <img
                src={imageUrl}
                onClick={() => (window.location.href = `/productinfo/${id}`)}
                alt="product"
                className="w-32 h-32 object-cover cursor-pointer"
              />
              <div className="flex flex-col justify-between p-4 flex-1">
                <div>
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <p className="text-sm text-gray-500 mb-1">{category}</p>
                  <p className="text-sm text-gray-600">{description.slice(0, 60)}...</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-left">
                    <p className="text-green-600 font-bold text-lg">
                      ₹{calcOffer(Number(price))}
                    </p>
                    <p className="text-sm line-through text-gray-400">₹{price}</p>
                  </div>
                  <RiDeleteBin6Fill
                    onClick={() => deleteCart(item)}
                    className="text-xl text-gray-600 hover:text-red-500 cursor-pointer"
                    title="Remove from cart"
                  />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <NoOrderFound />
      )}
    </div>

    {/* RIGHT SIDE - ORDER SUMMARY */}
    <div
      className={`md:w-1/3 p-6 rounded-xl shadow-lg border bg-white h-fit ${
        mode === "dark" ? "bg-[#23272f] border-gray-700" : ""
      }`}
    >
      <h3 className="text-xl font-bold mb-4 border-b pb-2">Price Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="flex items-center">
            <FaIndianRupeeSign className="mr-1" />
            {totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>
            GST <span className="text-rose-600 font-semibold">(18%)</span>
          </span>
          <span className="flex items-center">
            <FaIndianRupeeSign className="mr-1" />
            {GST}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="flex items-center font-medium">
            <FaIndianRupeeSign className="mr-1" />
            {shipping.toFixed(2)}
          </span>
        </div>
        <hr />
        <div className="flex justify-between text-base font-bold">
          <span>Grand Total</span>
          <span className="flex items-center">
            <FaIndianRupeeSign className="mr-1" />
            {overallDiscount.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Modal
          name={name}
          address={address}
          pincode={pincode}
          phoneNumber={phoneNumber}
          setName={setName}
          setAddress={setAddress}
          setPincode={setPincode}
          setPhoneNumber={setPhoneNumber}
          buyNow={buyNow}
        />
      </div>
    </div>
  </div>
</div>

  );
}

export default Cart;
