import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import searchReducer from "./slice/searchSlice";
import massageReducer from "./slice/massageSlice";
import socketSlice from "./slice/socketSlice";

const reducer = {
  auth: authReducer,
  search: searchReducer,
  massage: massageReducer,
  socket: socketSlice,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
