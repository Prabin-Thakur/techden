import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const nameSpace: string = "cart";

export const cart = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    showCart: (state) => (state = !state),
    hideCart: (state) => (state = false),
  },
});

export const { showCart, hideCart } = cart.actions;
export default cart.reducer;
