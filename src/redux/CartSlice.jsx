import { createSlice } from "@reduxjs/toolkit";

// jab cart item me koi data nahi hoga to empty array dikhega aur data hoga to whi show karega
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

// export const increaseQuantity = (itemId) => ({
//   type: "cart/increaseQuantity",
//   payload: itemId,
// });

// export const decreaseQuantity = (itemId) => ({
//   type: "cart/decreaseQuantity",
//   payload: itemId,
// });

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    
    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) item.quan += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item && item.quan > 1) {
        item.quan -= 1;
      }
    },
  }
});

//exporting these function to make global fn.
export const {addToCart, deleteFromCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;