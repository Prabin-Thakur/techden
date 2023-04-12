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

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartList } = useStorage();
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchIconRef = useRef<SVGSVGElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  //to hide search field if other area than search is clicked
  useEffect(() => {
    let handler = (event: any) => {
      if (
        !searchRef.current?.contains(event.target) &&
        !searchInputRef.current?.contains(event.target) &&
        !searchIconRef.current?.contains(event.target)
      ) {
        setOpenSearch(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [searchRef]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (openSearch) {
      timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 200);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [openSearch]);

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          TECH<span>DEN</span>
        </div>
        <div className="navbar-links">
          <Link className="links" to="/smartphone">
            Smartphone
          </Link>
          <Link className="links" to="/pc">
            Camera
          </Link>
          <Link className="links" to="/audio">
            Audio
          </Link>
          <Link className="links" to="/wearables">
            Wearables
          </Link>
        </div>

        {openSearch ? (
          <div className="navbar-search" ref={searchRef}>
            <input
              ref={searchInputRef}
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
              ref={searchIconRef}
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
