import { configureStore } from "@reduxjs/toolkit";
import createItemSlice from "./slice/create-item";

export const store = configureStore({
  reducer: {
    item1: createItemSlice,
  },
});
