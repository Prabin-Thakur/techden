import React, { useState, useRef, useEffect } from "react";
import "./NavBar.scss";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate, Link } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";
import { showCart } from "../../redux/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useStorage } from "../../context/localStorageContext";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Product } from "../../models/models";
import { useAppSelector } from "../../redux/hooks";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products: Product[] = useAppSelector((state) => state.products) || [];
  const { cartList } = useStorage();
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const searchRef = useRef<HTMLDivElement>(null);
  // const searchInputRef = useRef<any>(null);
  // const autoCompleteRef = useRef<any>(null);
  // const searchIconRef = useRef<SVGSVGElement>(null);
  // const optionsRef = useRef<any>(null);

  // //to hide search field if other area than search is clicked
  // useEffect(() => {
  //   let handler = (event: any) => {
  //     if (
  //       !searchRef.current?.contains(event.target) &&
  //       !searchInputRef.current?.contains(event.target) &&
  //       !searchIconRef.current?.contains(event.target) &&
  //       !autoCompleteRef.current?.contains(event.target) &&
  //       !optionsRef.current?.contains(event.target)
  //     ) {
  //       setOpenSearch(false);
  //       setSearchQuery("");
  //     }
  //   };

  //   document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // }, [searchRef]);

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          TECH<span>DEN</span>
        </div>
        <div className="navbar-links">
          <Link className="links" to="/products/smartphone">
            Smartphone
          </Link>
          <Link className="links" to="/products/camera">
            Camera
          </Link>
          <Link className="links" to="/products/audio">
            Audio
          </Link>

          <Link className="links" to="/products/wearable">
            Wearables
          </Link>
          <Link className="links" to="/products/pc">
            Pc
          </Link>
        </div>

        {openSearch ? (
          <div className="navbar-search">
            <Autocomplete
              className="search-field"
              id="free-solo-demo"
              freeSolo
              options={products.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  autoFocus
                  value={searchQuery}
                  className="text-field"
                  placeholder="Search Products..."
                  {...params}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      if (searchQuery.replace(/ /g, "").length === 0) {
                        setSearchQuery("");
                        return;
                      }
                      navigate(`/search/${searchQuery}`);
                      setSearchQuery("");
                      setOpenSearch(false);
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    // @ts-ignore
                    maxLength: 25,
                    endAdornment: (
                      <div
                        onClick={() => {
                          if (searchQuery.replace(/ /g, "").length === 0) {
                            setSearchQuery("");
                            return;
                          }
                          navigate(`/search/${searchQuery}`);
                          setSearchQuery("");
                          setOpenSearch(false);
                        }}
                      >
                        <SearchRoundedIcon className="icon" />
                      </div>
                    ),
                  }}
                />
              )}
            />
            <CloseRoundedIcon
              className="close"
              onClick={() => {
                setOpenSearch(false);
                setSearchQuery("");
              }}
            />
          </div>
        ) : (
          <div className="navbar-icons">
            <SearchRoundedIcon
              className="icons"
              onClick={() => {
                setOpenSearch(true);
              }}
            />
            <PersonOutlineOutlinedIcon className="icons" />
            <FavoriteBorderOutlinedIcon
              className="icons"
              onClick={() => navigate("/favourites")}
            />
            <div className="cart-icon" onClick={() => dispatch(showCart())}>
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
        )}
        <div className="hamburger-icon">
          <Hamburger />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
