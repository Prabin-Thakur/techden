import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sideBarReducer from "./sideBar/sideBarSlice";

export const store = configureStore({
  reducer: {
    sideBar: sideBarReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
