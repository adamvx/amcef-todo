import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "./app.initial";
import { TTodoStatusFilter } from "@custom-types/todo.types";

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setStatusFilter: (state, action: PayloadAction<TTodoStatusFilter>) => {
			state.statusFilter = action.payload;
		},
	},
});
const { actions, reducer } = appSlice;
export const appActions = actions;
export const appReducer = reducer;
