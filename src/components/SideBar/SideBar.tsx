import { useState, useRef, useEffect } from "react";
import { Drawer } from "@mui/material";
import { hideSideBar } from "../../redux/sideBar/sideBarSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CloseIcon from "@mui/icons-material/Close";
import "./SideBar.scss";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useStorage } from "../../context/localStorageContext";
import { showCart } from "../../redux/cart/cartSlice";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Product } from "../../models/models";

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sideBarShowing = useAppSelector((state) => state.sideBar);
  const [rotate, setRotate] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { cartList } = useStorage();
  const products: Product[] = useAppSelector((state) => state.products) || [];

  const handleSearch = () => {
    if (searchQuery.replace(/ /g, "").length === 0) {
      setSearchQuery("");
      return;
    }
    navigate(`/search/${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <Drawer
      className="sideBar_container"
      anchor="left"
      open={sideBarShowing}
      onClose={() => {
        dispatch(hideSideBar());
        setSearchQuery("");
      }}
      PaperProps={{
        sx: {
          width: {
            xs: "100vw",
            sm: "20rem",
          },
        },
      }}
    >
      <div className="siderBar_elements">
        <CloseIcon
          className="sideBar_closeIcon"
          onClick={() => {
            setRotate(true);
            dispatch(hideSideBar());
            setSearchQuery("");
            setTimeout(() => {
              setRotate(false);
            }, 200);
          }}
          sx={{
            fontSize: "3rem",
            transform: rotate ? "rotate(90deg)" : "none",
            transition: rotate ? "transform 0.1s ease" : "none",
          }}
        />

        <div className="sideBar-search">
          <Autocomplete
            className="search-field"
            id="free-solo-demo"
            freeSolo
            value={searchQuery}
            onInputChange={(event, newInputValue) => {
              setSearchQuery(newInputValue);
            }}
            options={products.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                // autoFocus
                className="text-field"
                placeholder="Search Products..."
                {...params}
                onKeyPress={(event: any) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  // @ts-ignore
                  maxLength: 25,
                  endAdornment: (
                    <div
                      onClick={() => {
                        handleSearch();
                      }}
                    >
                      <SearchRoundedIcon className="icon" />
                    </div>
                  ),
                }}
              />
            )}
          />
        </div>
        <div className="drawer_links_container">
          <div
            className="drawer_items"
            style={{
              animation: "slide-in-left 0.5s ease-in-out both",
              transition: "animation 0.1s ease-in-out",
            }}
            onClick={() => {
              dispatch(hideSideBar());
              navigate("/products/camera");
            }}
          >
            Camera
          </div>
          <div
            className="drawer_items"
            style={{
              animation: "slide-in-left 0.5s ease-in-out 0.1s both",
              transition: "animation 0.1s ease-in-out",
            }}
            onClick={() => {
              dispatch(hideSideBar());
              navigate("/products/smartphone");
            }}
          >
            Smartphone
          </div>
          <div
            className="drawer_items"
            style={{
              animation: "slide-in-left 0.5s ease-in-out 0.20s both",
              transition: "animation 0.1s ease-in-out",
            }}
            onClick={() => {
              dispatch(hideSideBar());
              navigate("/products/wearable");
            }}
          >
            Wearable
          </div>
          <div
            className="drawer_items"
            style={{
              animation: "slide-in-left 0.5s ease-in-out 0.30s both",
              transition: "animation 0.1s ease-in-out",
            }}
            onClick={() => {
              dispatch(hideSideBar());
              navigate("/products/audio");
            }}
          >
            Audio
          </div>
          <div
            className="drawer_items"
            style={{
              animation: "slide-in-left 0.5s ease-in-out 0.40s both",
              transition: "animation 0.1s ease-in-out",
            }}
            onClick={() => {
              dispatch(hideSideBar());
              navigate("/products/pc");
            }}
          >
            Pc
          </div>
        </div>
        <div className="sidebar-icons">
          <PersonOutlineOutlinedIcon className="icons" />
          <FavoriteBorderOutlinedIcon
            className="icons"
            onClick={() => {
              dispatch(hideSideBar());
              navigate("/favourites");
            }}
          />
          <div
            className="cart-icon"
            onClick={() => {
              dispatch(hideSideBar());
              dispatch(showCart());
            }}
          >
            <ShoppingCartOutlinedIcon className="icons" />
            <span
              style={{
                backgroundColor: `${cartList.length === 0 ? "#2879fe" : ""}`,
              }}
            >
              {cartList.length}
            </span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default SideBar;
