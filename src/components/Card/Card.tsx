import React from "react";
import "./Card.scss";
import { Product } from "../../models/models";
import { useNavigate } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useStorage } from "../../context/localStorageContext";

const Card: React.FC<{ item: Product }> = ({ item }) => {
  const navigate = useNavigate();
  const { removeWishList } = useStorage();

  const removeFromWishList = (event: React.MouseEvent<SVGSVGElement>) => {
    //to prevent from bubbling cause we have another thing on container click going on
    event.stopPropagation();
    removeWishList(item.id);
  };

  return (
    <div
      className="card-container"
      onClick={() => navigate(`/product/${item.id}`)}
    >
      {window.location.pathname.includes("/favourites") && (
        <div className="remove-favourite">
          <DeleteOutlinedIcon className="delete" onClick={removeFromWishList} />
        </div>
      )}
      <div className="image">
        {item?.new && <span>New</span>}
        <img src={item?.img1} alt="" className="mainImg" />
        <img src={item?.img2} alt="" className="secondImg" />
      </div>
      <h2>{item?.title}</h2>
      <div className="prices">
        <h3>${item?.price}</h3>
        {item?.oldPrice && <h3>${item.oldPrice}</h3>}
      </div>
    </div>
  );
};

export default Card;
