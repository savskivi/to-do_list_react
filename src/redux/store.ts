import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import todoReducer from "./slices/todoReducer";
import filterReducer from "./slices/filterReducer";
import themeReducer from "./slices/themeReducer";

const preloadedState = localStorage.getItem("todoListReact")
  ? JSON.parse(localStorage.getItem("todoListReact") as string)
  : {};

const rootReducer = combineReducers({
  todo: todoReducer,
  filter: filterReducer,
  theme: themeReducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
store.subscribe(() => {
  localStorage.setItem("todoListReact", JSON.stringify(store.getState()));
});

export default store;
