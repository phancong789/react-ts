import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthApi } from "../service/autherApi";
import { RootState } from "../app/store";
import IToken from "../Interface/IToken";

export interface tokenState {
  token: IToken | null;
  status: "idle" | "loading" | "failed";
}

const initialState: tokenState = {
  token: null,
  status: "idle",
};

const authorSilce = createSlice({
  name: "authorSilce",
  initialState,
  reducers: {
    setTokenFormStogare: (state, action: PayloadAction<IToken>) => {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      AuthApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload;
        state.status = "idle";
        localStorage.setItem("token", JSON.stringify(state.token));
      }
    );
    builder.addMatcher(AuthApi.endpoints.logout.matchFulfilled, (state) => {
      state.token = null;
      state.status = "idle";
      localStorage.removeItem("token");
    });
  },
});

export const { setTokenFormStogare } = authorSilce.actions;

export const selectToken = (state: RootState) => state.authorSlice.token;

export default authorSilce.reducer;
