import { useState, useEffect } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import { useStorage } from "../../context/localStorageContext";
import RecommendationCard from "../../components/RecommendationCard/RecommendationCard";

const Product: React.FC = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState<string>("img1");
  const [quantity, setQuantity] = useState<number>(1);
  const [disableCart, setDisableCart] = useState<boolean>(false);
  const { addWishList, cartList, addCartList } = useStorage();
  const product: any =
    useAppSelector((state) => state.products.find((el) => el.id === id)) || {};

  //to make sure when page first loads you are on top of the page
  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to the top of the page
  }, []);

  const existingIndex = cartList.findIndex(
    (item: { id: string; quantity: number }) => item.id === product.id
  );

  useEffect(() => {
    if (existingIndex !== -1) {
      setDisableCart(true);
    } else {
      setDisableCart(false);
    }
  }, [existingIndex]);

  return (
    <>
      <div className="product-container">
        {Object.keys(product).length === 0 ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            {" "}
            <div className="product-left">
              <div className="small-image">
                <div className="images">
                  <img
                    src={product.img1}
                    alt="image1"
                    onClick={() => setSelectedImg("img1")}
                  />
                </div>
                <div className="images">
                  <img
                    src={product.img2}
                    alt="image2"
                    onClick={() => setSelectedImg("img2")}
                  />
                </div>
                {product?.img3 && (
                  <div className="images">
                    <img
                      src={product.img3}
                      alt="image3"
                      onClick={() => setSelectedImg("img3")}
                    />
                  </div>
                )}
                {product?.img4 && (
                  <div className="images">
                    <img
                      src={product.img4}
                      alt="image4"
                      onClick={() => setSelectedImg("img4")}
                    />
                  </div>
                )}
              </div>
              <div className="large-image">
                <div className="large-image-image">
                  <img src={product[selectedImg]} alt="image-showcase" />
                </div>
              </div>
            </div>
            <div className="product-right">
              <div className="title">{product?.title}</div>
              <span className="price">
                ${product?.price.toLocaleString("en-US")}{" "}
                {product?.oldPrice && (
                  <p>${product?.oldPrice.toLocaleString("en-US")}</p>
                )}
              </span>
              <p className="description">{product?.description}</p>
              <div className="quantity">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev === 10 ? 10 : prev + 1))
                  }
                >
                  +
                </button>
              </div>
              <button
                disabled={disableCart}
                className="add"
                onClick={() => {
                  if (!disableCart) {
                    addCartList(product.id, quantity);
                  }
                }}
                style={{
                  backgroundColor: disableCart ? "#8eb9ff" : "",
                  cursor: disableCart ? "not-allowed" : "",
                  border: disableCart ? "none" : "",
                }}
              >
                <AddShoppingCartIcon /> ADD TO CART
              </button>
              <div
                className="links"
                onClick={() => {
                  addWishList(product.id);
                }}
              >
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="info">
                <span>Vendor: {product?.title?.split(" ")[0]}</span>
                <span>Product Type: {product.type}</span>
                <span>Tag: {product.type}</span>
              </div>
              <hr />
              <div className="info">
                <span>DESCRIPTION</span>
                <hr />
                <span>ADDITIONAL INFORMATION</span>
                <hr />
                <span>FAQ</span>
              </div>
            </div>
          </>
        )}
      </div>
      {Object.keys(product).length !== 0 && (
        <RecommendationCard
          category={product?.type.toLowerCase()}
          currentProduct={product?.id}
        />
      )}
    </>
  );
};

export default Product;
