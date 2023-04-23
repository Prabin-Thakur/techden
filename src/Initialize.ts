import { useEffect } from "react";
import { fetchProducts } from "./redux/products/productsSlice";
import { useAppDispatch } from "./redux/hooks";

function Initialize() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
}

export default Initialize;
