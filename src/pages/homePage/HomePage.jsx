import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import EditerCard from "../../components/editerCard/EditerCard";
import "./HomePage.scss";
import NoteCard from "../../components/noteCard/NoteCard";
import { useSelector } from "react-redux";

const prevTheme = localStorage.getItem("theme");
let themeValue;
if (prevTheme === "false") {
  themeValue = false;
} else {
  themeValue = true;
}
const HomePage = () => {
  const [theme, setTheme] = useState(themeValue);
  const [listOrGridView, setListOrGridView] = useState(true);
  const [searchInput, setSearchInput] = useState({
    searchValue: "",
    isSearching: false,
  });
  // console.log(listOrGridView);
  // const noteList = useSelector((state) => state.noteList);
  // console.log(noteList);
  // console.log(searchInput);
  return (
    <>
      <header>
        <NavBar
          listOrGridView={listOrGridView}
          setListOrGridView={setListOrGridView}
          setSearchInputProp={setSearchInput}
          themeProp={theme}
          setThemeProp={setTheme}
        />
      </header>
      <main>
        {/* <EditerCard /> */}
        <NoteCard
          listOrGridView={listOrGridView}
          searchInput={searchInput}
          theme={theme}
        />
      </main>
    </>
  );
};

export default HomePage;
