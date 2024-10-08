import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import authReducer from "../features/authSlice";
import postReducer from "../features/postSlice";
import uiReducer from "../features/uiSlice";

const reduxStore = configureStore({
  reducer: { themeReducer, authReducer, postReducer, uiReducer },
});

export default reduxStore;

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
