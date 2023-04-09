import { useState, useEffect } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const Product: React.FC = () => {
  const id = useParams().id;
  const product: any =
    useAppSelector((state) => state.products.find((el) => el.id === id)) || {};
  const [selectedImg, setSelectedImg] = useState<string>("img1");
  const [quantity, setQuantity] = useState<number>(1);

  //to make sure when page first loads you are on top of the page
  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to the top of the page
  }, []);

  return (
    <div className="product-container">
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
        <h1>{product?.title}</h1>
        <span className="price">
          ${product?.price} {product?.oldPrice && <p>${product?.oldPrice}</p>}
        </span>
        <p className="description">
          Blah b;ah maifdjsdf pofdsaf kdsf pofj dsfsfois fdsfdsf odsfods fdsfh
          sfhf sfdsf osfsfoj hkjsfhiewu fkdswofdshf iufkdsjfwofdshf fdfh
          fhfdsohfdf hff
        </p>
        <div className="quantity">
          <button
            onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => (prev === 10 ? 10 : prev + 1))}
          >
            +
          </button>
        </div>
        <button className="add">
          <AddShoppingCartIcon /> ADD TO CART
        </button>
        <div className="links">
          <FavoriteBorderIcon /> ADD TO WISH LIST
        </div>
        <div className="info">
          <span>Vendor: {product.title.split(" ")[0]}</span>
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
    </div>
  );
};

export default Product;
