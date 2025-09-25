import { configureStore } from "@reduxjs/toolkit";
import lessonsReducer from "../features/lessons/lessonsSlice";

export const store = configureStore({
  reducer: {
    lessons: lessonsReducer,
  },
});

export default store;
