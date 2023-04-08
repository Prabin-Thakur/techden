import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const nameSpace: string = "sideBar";

export const sideBar = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    showSideBar: (state) => (state = true),
    hideSideBar: (state) => (state = false),
  },
});

export const { showSideBar, hideSideBar } = sideBar.actions;
export default sideBar.reducer;
