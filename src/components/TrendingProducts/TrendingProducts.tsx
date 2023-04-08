import React from "react";
import Card from "../Card/Card";
import "./TrendingProducts.scss";
import { Product } from "../../models/models";

const data: Product[] = [
  {
    id: "1",
    img1: "https://images.pexels.com/photos/5083490/pexels-photo-5083490.jpeg?auto=compress&cs=tinysrgb&w=1600",
    img2: "https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Huawei P30 pro",
    isNew: true,
    isTrending: false,
    price: 1000,
    oldPrice: 800,
  },
  {
    id: "1",
    img1: "https://images.pexels.com/photos/5083490/pexels-photo-5083490.jpeg?auto=compress&cs=tinysrgb&w=1600",
    img2: "https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Huawei P30 pro",
    isNew: false,
    isTrending: true,
    price: 1000,
    oldPrice: 800,
  },
  {
    id: "1",
    img1: "https://images.pexels.com/photos/5083490/pexels-photo-5083490.jpeg?auto=compress&cs=tinysrgb&w=1600",
    img2: "https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Huawei P30 pro",
    isNew: false,
    isTrending: true,
    price: 1000,
    oldPrice: 800,
  },
  {
    id: "1",
    img1: "https://images.pexels.com/photos/5083490/pexels-photo-5083490.jpeg?auto=compress&cs=tinysrgb&w=1600",
    img2: "https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Huawei P30 pro",
    isNew: false,
    isTrending: true,
    price: 1000,
    oldPrice: 800,
  },
];

const FeaturedProducts: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div className="trending-products-container">
      <div className="top">
        <h1>
          <span>{type}</span> Products
        </h1>
      </div>
      <div className="center">
        {data?.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      <div className="bottom">BROWSE</div>
    </div>
  );
};

export default FeaturedProducts;
