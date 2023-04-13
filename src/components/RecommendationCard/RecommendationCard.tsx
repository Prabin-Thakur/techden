import { useEffect, useMemo } from "react";
import "./RecommendationCard.scss";
import { useAppSelector } from "../../redux/hooks";
import { Product } from "../../models/models";
import Card from "../../components/Card/Card";
import { scrollToTop } from "../../utils";

const RecommendationCard: React.FC<{
  category: string;
  currentProduct: string;
}> = ({ category, currentProduct }) => {
  const products: Product[] = useAppSelector((state) => state.products) || [];

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(
      (product: Product) =>
        product.type.toLowerCase() === category && product.id !== currentProduct
    );
    return filtered.slice(0, 3);
  }, [category, currentProduct, products]);

  //to make sure when page first loads you are on top of the page
  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to the top of the page
  }, []);

  return (
    <div className="recommendation-card-container">
      <div className="title">You might also like</div>
      <div className="items">
        {filteredProducts.map((el: Product) => (
          <div onClick={scrollToTop}>
            <Card item={el} key={el.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCard;
