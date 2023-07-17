import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserApi } from "../service/UserApi";
import { RootState } from "../app/store";
import IUserData from "../Interface/IUserData";
import IListDataUser from "../Interface/IListData";
import IRowUserData from "../Interface/IRowUserData";
import IRole from "../Interface/IRole";

export interface UIState {
  toggleControlPanelSiderBar: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: UIState = {
  toggleControlPanelSiderBar: true,
  status: "idle",
};

const uiSilce = createSlice({
  name: "uiSilce",
  initialState,
  reducers: {
    setToggleControlPanelSiderBar: (state) => {
      state.toggleControlPanelSiderBar = !state.toggleControlPanelSiderBar;
      state.status = "idle";
    },
  },
});

export const { setToggleControlPanelSiderBar } = uiSilce.actions;

export const selectToggleControlPanelSiderBar = (state: RootState) =>
  state.uiSilce.toggleControlPanelSiderBar;

export default uiSilce.reducer;
