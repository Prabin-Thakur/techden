import React, { useState, useRef, useEffect } from "react";
import "./NavBar.scss";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useNavigate, Link } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";

const NavBar: React.FC = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  //to hide search field if other area than search is clicked
  useEffect(() => {
    let handler = (event: any) => {
      if (!searchRef.current?.contains(event.target)) {
        setOpenSearch(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [searchRef]);

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
          <div className="navbar-search">
            <input
              maxLength={20}
              ref={searchRef}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              className="search-field"
            />
            <CloseRoundedIcon
              className="icon"
              onClick={() => {
                setOpenSearch(false);
                setSearchQuery("");
              }}
            />
          </div>
        ) : (
          <div className="navbar-icons">
            <SearchIcon
              className="icons"
              onClick={() => {
                setOpenSearch(true);
              }}
            />
            <PersonOutlineOutlinedIcon className="icons" />
            <FavoriteBorderOutlinedIcon className="icons" />
            <div className="cart-icon">
              <ShoppingCartOutlinedIcon className="icons" />
              <span>{0}</span>
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
