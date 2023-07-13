import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import * as env from "../env";

export const HomeAndSearchApi = createApi({
  reducerPath: "HomeAndSearchApi",
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
  tagTypes: ["HomeAndSearchApi"],
  endpoints: (builder) => ({
    getProminentSpecies: builder.query({
      query: () => env.apiRoute.loainoibat,
    }),

    getExtinctionRate: builder.query({
      query: () => env.apiRoute.tyleloai,
    }),

    getNews: builder.query({
      query: () => env.apiRoute.News + env.HomePageParam,
    }),
  }),
});

export const {
  useGetExtinctionRateQuery,
  useGetNewsQuery,
  useGetProminentSpeciesQuery,
} = HomeAndSearchApi;
