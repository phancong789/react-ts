import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthApi } from "../../service/autherApi";
import { RootState } from "../../app/store";

export interface IToken {
  access_token: string;
  token_type: string;
}

export interface tokenState {
  token: IToken | null;
  status: "idle" | "loading" | "failed";
}

const initialState: tokenState = {
  token: null,
  status: "idle",
};

const AuthorSilce = createSlice({
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
        localStorage.setItem("token", JSON.stringify(state.token));
      }
    );
  },
});

export const { setTokenFormStogare } = AuthorSilce.actions;

export const selectToken = (state: RootState) => state.authorSlice.token;

export default AuthorSilce.reducer;
