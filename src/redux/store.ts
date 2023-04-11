import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sideBarReducer from "./sideBar/sideBarSlice";
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";
import snackBarReducer from "./snackBar/snackBarSlice";

export const store = configureStore({
  reducer: {
    sideBar: sideBarReducer,
    products: productsReducer,
    cart: cartReducer,
    snackBar: snackBarReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
