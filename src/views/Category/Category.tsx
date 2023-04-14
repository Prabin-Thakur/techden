import { useEffect, useMemo, useState } from "react";
import "./Category.scss";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Product } from "../../models/models";
import Card from "../../components/Card/Card";
import { CircularProgress } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Category: React.FC = () => {
  const { category } = useParams();
  const products: Product[] = useAppSelector((state) => state.products) || [];
  const { sortBy, handleChangeSort } = useFilter();

  const filteredProducts: Product[] = useMemo(() => {
    return products.filter(
      (el: Product) => el.type.toLowerCase() === category?.toLowerCase()
    );
  }, [category, products]);

  const filteredProductsByCategory = useMemo(() => {
    if (filteredProducts.length === 0) {
      return [];
    }
    if (!sortBy) {
      return filteredProducts;
    } else {
      if (sortBy === "Highest") {
        const array = filteredProducts
          .slice()
          .sort((a, b) => b.price - a.price);
        return array;
      }
      if (sortBy === "Lowest") {
        const array = filteredProducts
          .slice()
          .sort((a, b) => a.price - b.price);
        return array;
      }
    }
  }, [sortBy, filteredProducts]);

  //to make sure when page first loads you are on top of the page
  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to the top of the page
  }, []);

  return (
    <>
      <div className="category-filter">
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-helper-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={sortBy}
            label="Sort by"
            onChange={handleChangeSort}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Lowest">Price(Lowest first)</MenuItem>
            <MenuItem value="Highest">Price(Highest first)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="category-container">
        {filteredProductsByCategory?.length !== 0 ? (
          filteredProductsByCategory?.map((el: Product) => (
            <Card item={el} key={el.id} />
          ))
        ) : (
          <div className="progress">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};

export default Category;

function useFilter() {
  const [sortBy, setSortBy] = useState("");

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  return { sortBy, handleChangeSort };
}
