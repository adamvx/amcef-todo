import store from "@store";
import rootReducer from "./store.slice";

export type TAppStore = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
