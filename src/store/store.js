import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./NoteSlice";
export const store = configureStore({
  reducer: {
    noteList: noteSlice,
  },
});
