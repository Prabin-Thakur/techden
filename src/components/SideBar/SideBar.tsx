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

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sideBarShowing = useAppSelector((state) => state.sideBar);
  const [rotate, setRotate] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { cartList } = useStorage();

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
          <input
            maxLength={25}
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            className="search-field"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                if (searchQuery.replace(/ /g, "").length === 0) {
                  setSearchQuery("");
                  return;
                }
                navigate(`/search/${searchQuery}`);
                setSearchQuery("");
              }
            }}
          />
          <SearchRoundedIcon
            className="icon"
            onClick={() => {
              if (searchQuery.replace(/ /g, "").length === 0) {
                setSearchQuery("");
                return;
              }
              navigate(`/search/${searchQuery}`);
              setSearchQuery("");
            }}
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
              navigate("/camera");
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
              navigate("/smartphone");
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
              navigate("/wearable");
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
              navigate("/audio");
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
              navigate("/pc");
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
