import { createSlice } from "@reduxjs/toolkit";
const myList = JSON.parse(localStorage.getItem("noteList"));
const noteListSlice = createSlice({
  name: "noteList",
  initialState: [...(myList || "")],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
      localStorage?.setItem("noteList", JSON.stringify(state));
    },
    remove: (state, action) => {
      const filterState = state.filter((item) => item.id !== action.payload);
      localStorage?.setItem("noteList", JSON.stringify(filterState));
      return filterState;
    },
    update: (state, action) => {
      const updatedList = state.map((i) => {
        if (i.id === action.payload.id) {
          i = action.payload;
        }
        return i;
      });
      localStorage?.setItem("noteList", JSON.stringify(updatedList));
      return updatedList;
    },
  },
});

export const { add, remove, update } = noteListSlice.actions;
export default noteListSlice.reducer;
