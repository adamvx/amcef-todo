import { configureStore } from "@reduxjs/toolkit";
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from "react-redux";
import rootReducer from "./store.slice";
import { TAppDispatch, TAppStore } from "./store.types";

export const store = configureStore({
	reducer: rootReducer,
	devTools: __DEV__,
});

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TAppStore> = useSelector;
export const useAppStore = () => useStore<TAppStore>();

export default store;
