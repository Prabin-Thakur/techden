import { useMemo } from "react";
import "./Favourites.scss";
import { useAppSelector } from "../../redux/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import { Product } from "../../models/models";
import { useStorage } from "../../context/localStorageContext";
import Card from "../Card/Card";

const Favourites: React.FC = () => {
  const products: Product[] = useAppSelector((state) => state.products) || [];
  const { wishList } = useStorage();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return wishList.some((cartItem: string) => cartItem === product.id);
    });
  }, [products, wishList]);

  return (
    <div className="favourite-container">
      {filteredProducts.length > 0 ? (
        <>
          {filteredProducts.map((el: Product) => (
            <Card item={el} key={el.id} />
          ))}
        </>
      ) : (
        <div
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="text-favourites">NO ITEMS IN FAVOURITES</div>
        </div>
      )}
    </div>
  );
};

export default Favourites;
