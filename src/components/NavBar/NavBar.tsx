import React, { useState, useEffect } from "react";
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
import Slide from "@mui/material/Slide";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import useAuth from "../../customHooks/useAuth";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products: Product[] = useAppSelector((state) => state.products) || [];
  const { cartList } = useStorage();
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openUserDetails, setOpenUserDetails] = useState<boolean>(false);
  const { handleLogout, deleteUserAccount } = useAuth();

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

  const handleToggle = () => {
    setOpenUserDetails((prevIsOpen) => !prevIsOpen);
  };

  const handleSearch = () => {
    if (searchQuery.replace(/ /g, "").length === 0) {
      setSearchQuery("");
      return;
    }
    navigate(`/search/${searchQuery}`);
    setSearchQuery("");
    setOpenSearch(false);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          TECH<span>DEN</span>
        </div>
        <div className="navbar-links">
          <Link
            className="links"
            to="/products/smartphone"
            style={{
              borderBottom: `${
                window.location.pathname.includes("smartphone")
                  ? "3px solid red"
                  : ""
              }`,
            }}
          >
            Smartphone
          </Link>
          <Link
            className="links"
            to="/products/camera"
            style={{
              borderBottom: `${
                window.location.pathname.includes("camera")
                  ? "3px solid red"
                  : ""
              }`,
            }}
          >
            Camera
          </Link>
          <Link
            className="links"
            to="/products/audio"
            style={{
              borderBottom: `${
                window.location.pathname.includes("audio")
                  ? "3px solid red"
                  : ""
              }`,
            }}
          >
            Audio
          </Link>

          <Link
            className="links"
            to="/products/wearable"
            style={{
              borderBottom: `${
                window.location.pathname.includes("wearable")
                  ? "3px solid red"
                  : ""
              }`,
            }}
          >
            Wearables
          </Link>
          <Link
            className="links"
            to="/products/pc"
            style={{
              borderBottom: `${
                window.location.pathname.includes("pc") ? "3px solid red" : ""
              }`,
            }}
          >
            Pc
          </Link>
        </div>

        {openSearch ? (
          <Slide direction="left" in={openSearch} mountOnEnter unmountOnExit>
            <div className="navbar-search">
              <Autocomplete
                className="search-field"
                id="free-solo-demo"
                value={searchQuery}
                onInputChange={(event, newInputValue) => {
                  setSearchQuery(newInputValue);
                }}
                freeSolo
                options={products.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    autoFocus
                    className="text-field"
                    placeholder="Search Products..."
                    {...params}
                    onKeyPress={(event) => {
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
              <CloseRoundedIcon
                className="close"
                onClick={() => {
                  setOpenSearch(false);
                  setSearchQuery("");
                }}
              />
            </div>
          </Slide>
        ) : (
          <div className="navbar-icons">
            <SearchRoundedIcon
              className="icons"
              onClick={() => {
                setOpenSearch(true);
              }}
            />

            {localStorage.getItem("isLoggedIn") === "true" ? (
              <Tooltip
                title={
                  <div className="login-tooltip">
                    <div className="tooltip-button" onClick={handleLogout}>
                      Log out&nbsp; <LogoutRoundedIcon className="icon" />
                    </div>
                    <div className="tooltip-button" onClick={deleteUserAccount}>
                      Delete Account&nbsp;{" "}
                      <PersonRemoveRoundedIcon className="icon" />
                    </div>
                  </div>
                }
                open={openUserDetails}
                onClose={() => setOpenUserDetails(false)}
                onOpen={() => setOpenUserDetails(true)}
                TransitionComponent={Fade}
                placement="bottom"
                arrow
              >
                <PersonOutlineOutlinedIcon
                  className="icons"
                  onClick={() => {
                    handleToggle();
                  }}
                />
              </Tooltip>
            ) : (
              <PersonOutlineOutlinedIcon
                className="icons"
                onClick={() => {
                  navigate("/login");
                }}
              />
            )}
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
