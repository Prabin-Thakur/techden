import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sideBarReducer from "./sideBar/sideBarSlice";
import productsReducer from "./products/productsSlice";

export const store = configureStore({
  reducer: {
    sideBar: sideBarReducer,
    products: productsReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
