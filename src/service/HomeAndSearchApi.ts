import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import * as env from "../env";
import ISpecies from "../Interface/ISpecies";
import { INew } from "../features/HomeAndSearchSlice";
import IListData from "../Interface/IListData";
import IGeneralFilterData from "../Interface/IGeneralFilterData";
import IMapInfo from "../Interface/IMapInfo";

export const HomeAndSearchApi = createApi({
  reducerPath: "HomeAndSearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.hostName,
    prepareHeaders: (headers, { getState }) => {
      const RootState = getState() as RootState;
      const token = RootState.authorSlice.token;
      if (token)
        headers.set(
          "Authorization",
          token.token_type + " " + token.access_token
        );

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
        paginate: boolean;
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

    getExtinctionRate: builder.query<{ tong_loai: string }, any>({
      query: () => env.apiRoute.tyleloai,
      providesTags: [{ type: "HomeAndSearchApi" }],
    }),

    getMapinfo: builder.query<IMapInfo[], any>({
      query: (id) => env.apiRoute.mapinfo + "/" + id,
    }),
    getNews: builder.query<INew, any>({
      query: () => ({
        url: env.apiRoute.News,
        params: env.HomePageParam,
      }),
      providesTags: [{ type: "HomeAndSearchApi" }],
    }),

    getProvince: builder.query<IGeneralFilterData[], any>({
      query: () => env.apiRoute.provinces,
    }),

    getKhuBaoton: builder.query<IGeneralFilterData[], any>({
      query: () => env.apiRoute.khubaoton,
    }),
  }),
});

export const {
  useGetExtinctionRateQuery,
  useGetNewsQuery,
  useGetSpeciesQuery,
  useGetProminentSpeciesQuery,
  useGetKhuBaotonQuery,
  useGetProvinceQuery,
  useLazyGetMapinfoQuery,
} = HomeAndSearchApi;
