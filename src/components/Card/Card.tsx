import React from "react";
import "./Card.scss";
import { Product } from "../../models/models";
import { useNavigate } from "react-router-dom";

const Card: React.FC<{ item: Product }> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card-container"
      onClick={() => navigate(`/product/${item.id}`)}
    >
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
