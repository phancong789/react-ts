import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserApi } from "../service/UserApi";
import { RootState } from "../app/store";
import IUserData from "../Interface/IUserData";
import IListDataUser from "../Interface/IListData";
import IRowUserData from "../Interface/IRowUserData";

export interface UsersState {
  currentUser: IUserData | null;
  ListUsers: IListDataUser<IRowUserData> | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  currentUser: null,
  ListUsers: null,
  status: "idle",
};

const usersSilce = createSlice({
  name: "usersSilce",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      UserApi.endpoints.me.matchFulfilled,
      (state, { payload }) => {
        state.currentUser = payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      UserApi.endpoints.getUserList.matchFulfilled,
      (state, { payload }) => {
        state.ListUsers = payload;
        state.status = "idle";
      }
    );
  },
});

export const {} = usersSilce.actions;

export const selectCurrentUser = (state: RootState) => state.authorSlice.token;

export default usersSilce.reducer;
