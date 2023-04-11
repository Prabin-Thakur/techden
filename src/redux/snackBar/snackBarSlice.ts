import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface snackBarState {
  showing: boolean;
  text: string;
  type: "error" | "warning" | "info" | "success";
}

interface snackBarParams {
  text: string;
  type: "error" | "warning" | "info" | "success";
}

const initialState: snackBarState = {
  showing: false,
  text: "",
  type: "success",
};

const nameSpace: string = "snackBar";

export const snackBarSlice = createSlice({
  name: nameSpace,

  initialState,
  reducers: {
    showSnackBar: (state, action: PayloadAction<snackBarParams>) =>
      (state = {
        showing: true,
        text: action.payload.text,
        type: action.payload.type,
      }),
    hideSnackBar: (state) =>
      (state = { showing: false, text: "", type: "success" }),
  },
});

export const { showSnackBar, hideSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
