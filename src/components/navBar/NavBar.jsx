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
  const [theme, setTheme] = useState(themeProp); // setting the theme initial state as it is in the localstorage geting it from props

  const [searchInputBtn, setSearchInputBtn] = useState(false); // setting if user is searching or not

  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: `${
            theme ? "var(--editerColor)" : "var(--blackGray)"
          }`,
        }} // changing theme color
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
          {/* // setting listview or gridview */}
          <div onClick={() => setListOrGridView(!listOrGridView)}> 
            {listOrGridView ? <IoGridOutline /> : <FiMenu />}
          </div>

          <div
            onClick={() => {
              setTheme(!theme);
              setThemeProp(!theme);
              localStorage.setItem("theme", JSON.stringify(!theme)); // saving theme value in localstorage
            }}
          >
            {/* // changing theme icon */}
            {theme ? <FaRegSun /> : <FaRegMoon />}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
