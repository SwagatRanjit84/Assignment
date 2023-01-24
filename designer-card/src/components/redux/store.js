import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createItemSlice from "./slice/create-item";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, createItemSlice);

const store = configureStore({
  reducer: {
    item1: persistedReducer,
  },
  applyMiddleware,
});

const persistor = persistStore(store);
export { persistor, store };
