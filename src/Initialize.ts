import { useEffect } from "react";
import { fetchProducts } from "./redux/products/productsSlice";
import { useAppDispatch } from "./redux/hooks";
// import useAuth from "./customHooks/useAuth";

function Initialize() {
  // const { currentUser } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // useEffect(() => {
  //   if (Object.keys(currentUser).length > 0) {
  //     localStorage.setItem("isLoggedIn", JSON.stringify(true));
  //     localStorage.setItem("userId", JSON.stringify(currentUser.uid));
  //     return;
  //   }
  //   if (!currentUser) {
  //     localStorage.setItem("isLoggedIn", JSON.stringify(false));
  //     localStorage.removeItem("userId");
  //   }
  // }, [currentUser]);
}

export default Initialize;
