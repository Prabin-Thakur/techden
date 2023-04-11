import { useEffect } from "react";
import "./Products.scss";
import { useAppSelector } from "../../redux/hooks";
import { Product } from "../../models/models";
import Card from "../../components/Card/Card";
import { Skeleton } from "@mui/material";

const Products: React.FC = () => {
  const products: Product[] = useAppSelector((state) => state.products) || [];

  //to make sure when page first loads you are on top of the page
  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to the top of the page
  }, []);

  return (
    <div className="products-container">
      {products.length !== 0 ? (
        products.map((el: Product) => <Card item={el} />)
      ) : (
        <div className="skeleton_container">
          <Skeleton
            className="skeleton"
            variant="rectangular"
            width={280}
            height={350}
          >
            Loading...
          </Skeleton>
          <Skeleton
            className="skeleton"
            variant="rectangular"
            width={280}
            height={350}
          >
            Loading...
          </Skeleton>
          <Skeleton
            className="skeleton"
            variant="rectangular"
            width={280}
            height={350}
          >
            Loading...
          </Skeleton>
        </div>
      )}
    </div>
  );
};

export default Products;
