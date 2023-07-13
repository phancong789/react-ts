import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import * as env from "../env";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.hostName,
    prepareHeaders: (headers, { getState }) => {
      const RootState = getState() as RootState;
      const token = RootState.authorSlice.token;
      if (token)
        headers.set("authortization", token.token_type + token.access_token);

      return headers;
    },
  }),
  tagTypes: ["UserApi"],
  endpoints: (builder) => ({}),
});

export const {} = UserApi;
