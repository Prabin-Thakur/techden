import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fireStoreDatabase } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "../../models/models";

const initialState: Product[] = [];

const nameSpace: string = "productsSlice";

const fetchProducts = createAsyncThunk<void>(
  `${nameSpace}/productsSlice`,
  async (params, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(
        collection(fireStoreDatabase, "products")
      );
      const fetchedData: Product[] = [];
      querySnapshot.forEach((doc: any) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
      thunkAPI.dispatch(populateProducts(fetchedData));
    } catch (err) {
      console.log(err);
    }
  }
);

export const productsSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    populateProducts: (state, action: PayloadAction<Product[]>) =>
      (state = action.payload),
  },
});

export const { populateProducts } = productsSlice.actions;
export { fetchProducts };
export default productsSlice.reducer;
