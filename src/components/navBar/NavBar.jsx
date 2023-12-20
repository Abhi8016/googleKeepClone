import React, { useState } from "react";
import "./NavBar.scss";
import logo from "../../assets/keep_2020q4_48dp.png";
import { FiSearch, FiMenu } from "react-icons/fi";
import { IoGridOutline } from "react-icons/io5";
import { FaRegSun, FaRegMoon } from "react-icons/fa";

const NavBar = ({
  listOrGridView,
  setListOrGridView,
  setSearchInputProp,
  setThemeProp,
  themeProp,
}) => {
  const [theme, setTheme] = useState(themeProp);

  const [searchInputBtn, setSearchInputBtn] = useState(false);

  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: `${
            theme ? "var(--editerColor)" : "var(--blackGray)"
          }`,
        }}
      >
        <div className="leftSide">
          <img src={logo} alt="logo-pic" />
          <span style={{ color: `${theme ? "" : "white"}` }}>Keep</span>
        </div>
        <div className="rightSide">
          <FiSearch
            onClick={() => {
              setSearchInputBtn(!searchInputBtn);
            }}
          />
          <div className="SearchBar">
            {searchInputBtn && (
              <input
                placeholder="Search"
                onChange={(e) =>
                  setSearchInputProp({
                    searchValue: e.target.value,
                    isSearching: true,
                  })
                }
                onBlur={() => {
                  setSearchInputBtn(false);
                  setSearchInputProp({
                    searchValue: "",
                    isSearching: false,
                  });
                }}
              />
            )}
          </div>
          <div onClick={() => setListOrGridView(!listOrGridView)}>
            {listOrGridView ? <IoGridOutline /> : <FiMenu />}
          </div>

          <div
            onClick={() => {
              setTheme(!theme);
              setThemeProp(!theme);
              localStorage.setItem("theme", JSON.stringify(!theme));
            }}
          >
            {theme ? <FaRegSun /> : <FaRegMoon />}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
