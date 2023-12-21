import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import "./HomePage.scss";
import NoteCard from "../../components/noteCard/NoteCard";

const prevTheme = localStorage.getItem("theme"); // geting theme value from localStorage
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
