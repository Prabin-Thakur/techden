import { useEffect, useMemo } from "react";
import "./Category.scss";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Product } from "../../models/models";
import Card from "../../components/Card/Card";
import { CircularProgress } from "@mui/material";

const Category: React.FC = () => {
  const { category } = useParams();
  const products: Product[] = useAppSelector((state) => state.products) || [];

  const filteredProducts: Product[] = useMemo(() => {
    return products.filter(
      (el: Product) => el.type.toLowerCase() === category?.toLowerCase()
    );
  }, [category, products]);

  //to make sure when page first loads you are on top of the page
  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to the top of the page
  }, []);

  return (
    <div className="category-container">
      {filteredProducts.length !== 0 ? (
        filteredProducts.map((el: Product) => <Card item={el} key={el.id} />)
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Category;
