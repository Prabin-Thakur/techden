import { useEffect, useState, useMemo, useRef } from "react";
import "./Products.scss";
import { useAppSelector } from "../../redux/hooks";
import { Product } from "../../models/models";
import Card from "../../components/Card/Card";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Theme, useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { scrollToTop } from "../../utils";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const Products: React.FC = () => {
  const products: Product[] = useAppSelector((state) => state.products) || [];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const inputFilterRef = useRef<any>(null);
  const {
    category,
    categoryName,
    setCategoryName,
    handleChange,
    getStyles,
    MenuProps,
    sortBy,
    handleChangeSort,
  } = useFilter();
  const theme = useTheme();

  //to make sure when page first loads you are on top of the page
  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to the top of the page
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryName, sortBy]);

  const filteredProducts = useMemo(() => {
    if (products.length === 0) {
      return [];
    }
    if (categoryName.length === 0 && !sortBy) {
      return products;
    }
    if (sortBy) {
      if (sortBy === "Lowest") {
        if (categoryName.length === 0) {
          const array = products.slice().sort((a, b) => a.price - b.price);
          return array;
        }
        if (categoryName.length !== 0) {
          let filterBy = categoryName.map((item) => item.toLowerCase());
          let array = products.filter((item) =>
            filterBy.includes(item.type.toLowerCase())
          );
          const sortedArray = array.sort((a, b) => a.price - b.price);
          return sortedArray;
        }
      }
      if (sortBy === "Highest") {
        if (categoryName.length === 0) {
          const array = products.slice().sort((a, b) => b.price - a.price);
          return array;
        }
        if (categoryName.length !== 0) {
          let filterBy = categoryName.map((item) => item.toLowerCase());
          let array = products.filter((item) =>
            filterBy.includes(item.type.toLowerCase())
          );
          let sortedArray = array.sort((a, b) => b.price - a.price);
          return sortedArray;
        }
      }
    } else {
      let filterBy = categoryName.map((item) => item.toLowerCase());
      return products.filter((item) =>
        filterBy.includes(item.type.toLowerCase())
      );
    }
  }, [categoryName, sortBy, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const itemsForCurrentPage = useMemo(() => {
    return filteredProducts?.slice(indexOfFirstItem, indexOfLastItem);
  }, [products, filteredProducts, currentPage]);

  return (
    <>
      <div className="products-container">
        <div className="products-filter">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">
              Filter Products
            </InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={categoryName}
              onChange={handleChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Filter Product"
                  inputRef={inputFilterRef}
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      clickable
                      onDelete={(event) => {
                        setCategoryName((prev) =>
                          prev.filter((name) => name !== value)
                        );
                        inputFilterRef.current.blur();
                      }}
                      deleteIcon={
                        <CancelRoundedIcon
                          onMouseDown={(e) => e.stopPropagation()}
                        />
                      }
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {category.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, categoryName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Sort by
            </InputLabel>
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

        {itemsForCurrentPage?.length !== 0 ? (
          itemsForCurrentPage?.map((el: Product) => (
            <Card item={el} key={el.id} />
          ))
        ) : (
          <div className="progress">
            <CircularProgress />
          </div>
        )}
      </div>
      {filteredProducts && filteredProducts.length > 10 && (
        <div className="pagination">
          <Pagination
            shape="rounded"
            variant="outlined"
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "1.1rem",
              },
            }}
            count={Math.ceil(filteredProducts?.length / itemsPerPage)}
            onChange={(event, page) => {
              setCurrentPage(page);
              scrollToTop();
            }}
            page={currentPage}
          />
        </div>
      )}
    </>
  );
};

export default Products;

function useFilter() {
  const category = ["Smartphone", "Camera", "Audio", "Wearable", "Pc"];
  const [categoryName, setCategoryName] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("");

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent<typeof categoryName>) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function getStyles(name: string, categoryName: string[], theme: Theme) {
    return {
      fontWeight:
        categoryName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return {
    category,
    categoryName,
    setCategoryName,
    handleChange,
    getStyles,
    MenuProps,
    sortBy,
    handleChangeSort,
  };
}
