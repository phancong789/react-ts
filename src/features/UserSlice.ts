import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserApi } from "../service/UserApi";
import { RootState } from "../app/store";
import IUserData from "../Interface/IUserData";
import IListDataUser from "../Interface/IListData";
import IRowUserData from "../Interface/IRowUserData";
import IRole from "../Interface/IRole";

export interface UsersState {
  ListUsers: IListDataUser<IRowUserData[]> | null;
  roleList: IRole[] | null;
  selectUser: IRowUserData | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  ListUsers: null,
  roleList: null,
  selectUser: null,
  status: "idle",
};

const usersSilce = createSlice({
  name: "usersSilce",
  initialState,
  reducers: {
    setSelectUser: (state, action: PayloadAction<IRowUserData>) => {
      state.selectUser = action.payload;
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      UserApi.endpoints.getUserList.matchFulfilled,
      (state, { payload }) => {
        state.ListUsers = payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      UserApi.endpoints.getRolesList.matchFulfilled,
      (state, { payload }) => {
        state.roleList = payload;
        state.status = "idle";
      }
    );
  },
});

export const { setSelectUser } = usersSilce.actions;

export const selectListUsers = (state: RootState) => state.usersSilce.ListUsers;
export const selectListRoles = (state: RootState) => state.usersSilce.roleList;
export const selectSelectedUser = (state: RootState) =>
  state.usersSilce.selectUser;

export default usersSilce.reducer;
