import { useRef, useEffect, useMemo } from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useAppSelector } from "../../redux/hooks";
import { Product } from "../../models/models";
import CloseIcon from "@mui/icons-material/Close";
import { hideCart } from "../../redux/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useStorage } from "../../context/localStorageContext";
import emptyCart from "../../assets/svgs/emptyCart.svg";

const Cart: React.FC = () => {
  const products: Product[] = useAppSelector((state) => state.products) || [];
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { cartList, removeCartList, resetCartList } = useStorage();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return cartList.some((cartItem) => cartItem.id === product.id);
    });
  }, [cartList]);

  //to close cart if clicked outside of this container
  useEffect(() => {
    let handler = (event: any) => {
      if (!containerRef.current?.contains(event.target)) {
        dispatch(hideCart());
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [containerRef]);

  const totalPrice = useMemo((): number => {
    let totalPrice = 0;

    filteredProducts.forEach((product) => {
      const itemInCart = cartList.find((item) => item.id === product.id);

      if (itemInCart) {
        const { quantity } = itemInCart;
        const price = product.price * quantity;
        totalPrice += price;
      }
    });

    return totalPrice;
  }, [filteredProducts]);

  return (
    <div className="cart-container" ref={containerRef}>
      <div className="title">
        <h1>Products in cart</h1>
        <CloseIcon
          className="close-cart"
          onClick={() => {
            dispatch(hideCart());
          }}
        />
      </div>

      {cartList.length > 0 ? (
        <div className="items-cart">
          {filteredProducts?.map((item) => (
            <div className="item" key={item.id}>
              <img src={item?.img1} alt="product" />
              <div className="details">
                <h1>{item?.title}</h1>
                <p>{item.description?.substring(0, 30)} ...</p>
                <div className="price">
                  {cartList.find((el) => el.id === item.id)?.quantity} x $
                  {item.price.toLocaleString("en-US")}
                </div>
              </div>
              <DeleteOutlinedIcon
                className="delete"
                onClick={() => removeCartList(item.id)}
              />
            </div>
          ))}
          <div className="total">
            <span>SUBTOTAL</span>
            <span>${totalPrice.toLocaleString("en-US")}</span>
          </div>
          <button
          // onClick={handlePayment}
          >
            PROCEED TO CHECKOUT
          </button>
          <span
            className="reset"
            onClick={() => {
              resetCartList();
            }}
          >
            Reset Cart
          </span>
        </div>
      ) : (
        <>
          <div className="empty-cart-svg">
            <img src={emptyCart} />
          </div>
          <p className="empty-text">Cart Empty</p>
        </>
      )}
    </div>
  );
};

export default Cart;
