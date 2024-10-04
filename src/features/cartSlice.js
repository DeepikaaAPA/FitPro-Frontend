import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart:(state,action)=>{
      return state.filter((item,i)=>i!==action.payload)
    },
    resetCart: (state) => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart,resetCart } = cartSlice.actions;
export default cartSlice.reducer;
