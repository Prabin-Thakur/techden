import { useMemo } from "react";
import Card from "../Card/Card";
import "./TrendingProducts.scss";
import { Product } from "../../models/models";
import { useAppSelector } from "../../redux/hooks";

const FeaturedProducts: React.FC<{ type: string }> = ({ type }) => {
  const products: Product[] = useAppSelector((state) => state.products) || [];

  const product = useMemo(
    () =>
      type === "New"
        ? products.filter((el) => el.new === true).slice(0, 5)
        : products.filter((el) => el.trending === true).slice(0, 5),
    [products]
  );

  return (
    <div className="trending-products-container">
      <div className="top">
        <p>
          <span>{type}</span> Products
        </p>
      </div>
      <div className="center">
        {product?.map((item: Product) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      <div className="bottom">BROWSE</div>
    </div>
  );
};

export default FeaturedProducts;
