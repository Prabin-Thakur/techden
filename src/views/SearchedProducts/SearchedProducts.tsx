import { useMemo } from "react";
import { useParams } from "react-router-dom";
import "./SearchedProducts.scss";
import { Product } from "../../models/models";
import { useAppSelector } from "../../redux/hooks";
import Card from "../../components/Card/Card";

const SearchedProducts: React.FC = () => {
  const { query = "" } = useParams();
  const products: Product[] = useAppSelector((state) => state.products) || [];

  const filteredProducts = useMemo(() => {
    return products.filter((item: Product) => {
      return item?.title?.toLowerCase().includes(query.toLowerCase());
    });
  }, [products, query]);

  return (
    <div className="searched-products-container">
      {filteredProducts && (
        <div
          className="items-found"
          style={{ height: `${filteredProducts.length === 0 ? "80vh" : ""}` }}
        >
          " {filteredProducts.length === 0 ? " No" : filteredProducts.length}{" "}
          item found "
        </div>
      )}
      <div className="items">
        {filteredProducts.map((el: Product) => (
          <Card item={el} key={el.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchedProducts;
