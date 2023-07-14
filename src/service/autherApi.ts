import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import * as env from "../env";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
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
  tagTypes: ["AuthApi"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formdata: FormData) => {
        return {
          url: env.apiRoute.webAuthenticate,
          method: "post",
          body: formdata,
        };
      },
      invalidatesTags: [{ type: "AuthApi" }],
    }),
    logout: builder.query({
      query: () => env.apiRoute.logout,
      providesTags: [{ type: "AuthApi" }],
    }),
  }),
});

export const { useLoginMutation, useLogoutQuery } = AuthApi;
