import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import { useAppDispatch } from "../redux/hooks";
import { showSnackBar } from "../redux/snackBar/snackBarSlice";

interface CartList {
  id: string;
  quantity: number;
}

interface LocalStorageContextProps {
  wishList: string[];
  addWishList: (id: string) => void;
  removeWishList: (id: string) => void;
  cartList: CartList[];
  addCartList: (key: string, quantity: number) => void;
  removeCartList: (key: string) => void;
  resetCartList: () => void;
}

export const LocalStorageContext = createContext<LocalStorageContextProps>({
  wishList: [],
  addWishList: () => {},
  removeWishList: () => {},
  cartList: [],
  addCartList: () => {},
  removeCartList: () => {},
  resetCartList: () => {},
});

export function useStorage() {
  return useContext(LocalStorageContext);
}

interface LocalStorageProviderProps {
  children: React.ReactNode;
}

export const LocalStorageProvider = (props: LocalStorageProviderProps) => {
  const dispatch = useAppDispatch();

  const [wishList, setWishList] = useLocalStorage("wishList", []);
  const [cartList, setCartList] = useLocalStorage("cartList", []);

  const addCartList = (key: string, quantity: number) => {
    const existingIndex = cartList.findIndex(
      (item: CartList) => item.id === key
    );

    //runs if the item with the id doesn't exist in cartList
    if (existingIndex === -1) {
      setCartList([...cartList, { id: key, quantity }]);
      dispatch(showSnackBar({ text: "Added item to cart", type: "info" }));
    }

    //runs if item with that id exists in the cartList
    if (existingIndex !== -1) {
      return;
      // const newCartList = [...cartList];
      // newCartList[existingIndex] = { id: key, quantity };
      // setCartList(newCartList);
      // dispatch(showSnackBar({ text: "Item to cart", type: "info" }));
    }
  };

  const addWishList = (id: string) => {
    const existingIndex = wishList.indexOf(id);

    //runs if item with id already exists
    if (existingIndex !== -1) {
      dispatch(
        showSnackBar({ text: "Item already on the wishlist", type: "error" })
      );
    } else {
      setWishList([...wishList, id]);
      dispatch(
        showSnackBar({ text: "Added item on the wishlist", type: "info" })
      );
    }
  };

  const removeWishList = (id: string) => {
    const filteredArray = wishList.filter((el: string) => el !== id);
    setWishList(filteredArray);
    dispatch(
      showSnackBar({ text: "Item removed from Favourites", type: "info" })
    );
  };

  const removeCartList = (id: string) => {
    const updatedCartList = cartList.filter((item: CartList) => item.id !== id);
    setCartList(updatedCartList);
    dispatch(showSnackBar({ text: "Removed item from cart", type: "info" }));
  };

  const resetCartList = () => {
    setCartList([]);
  };

  return (
    <LocalStorageContext.Provider
      value={{
        wishList,
        addWishList,
        removeWishList,
        cartList,
        addCartList,
        removeCartList,
        resetCartList,
      }}
    >
      {props.children}
    </LocalStorageContext.Provider>
  );
};
