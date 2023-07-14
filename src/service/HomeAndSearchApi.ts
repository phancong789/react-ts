import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import * as env from "../env";
import ISpecies from "../Interface/ISpecies";
import { INew } from "../features/HomeAndSearchSlice";
import IListData from "../Interface/IListData";

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
    getProminentSpecies: builder.query<ISpecies[], any>({
      query: () => env.apiRoute.loainoibat,
      providesTags: [{ type: "HomeAndSearchApi" }],
    }),

    getSpecies: builder.query<
      IListData<ISpecies[]>,
      {
        paginate: true;
        page: number;
        perpage: number;
        search: string;
      }
    >({
      query: (arg) => ({
        url: env.apiRoute.loaicongbo,
        params: arg,
      }),
      providesTags: [{ type: "HomeAndSearchApi" }],
    }),

    getExtinctionRate: builder.query({
      query: () => env.apiRoute.tyleloai,
      providesTags: [{ type: "HomeAndSearchApi" }],
    }),

    getNews: builder.query<INew, any>({
      query: () => ({
        url: env.apiRoute.News,
        params: env.HomePageParam,
      }),
      providesTags: [{ type: "HomeAndSearchApi" }],
    }),
  }),
});

export const {
  useGetExtinctionRateQuery,
  useGetNewsQuery,
  useGetSpeciesQuery,
  useGetProminentSpeciesQuery,
} = HomeAndSearchApi;
