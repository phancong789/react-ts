import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import * as env from "../env";
import IListData from "../Interface/IListData";
import IRowUserData from "../Interface/IRowUserData";
import IRole from "../Interface/IRole";
import IError from "../Interface/IError";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.hostName,
    prepareHeaders: (headers, { getState }) => {
      const RootState = getState() as RootState;
      const token = RootState.authorSlice.token;
      if (token) {
        headers.set(
          "Authorization",
          `${token.token_type} ${token.access_token}`
        );
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, IError, {}>,
  tagTypes: ["UserApi"],
  endpoints: (builder) => ({
    getUserList: builder.query<IListData<IRowUserData[]>, any>({
      query: () => ({
        url: env.apiRoute.users,
        params: [...env.getUserParams],
      }),
      keepUnusedDataFor: 0,
      providesTags: [{ type: "UserApi" }],
    }),
    getRolesList: builder.query<IRole[], any>({
      query: () => ({
        url: env.apiRoute.role,
      }),
    }),
    addNewUser: builder.mutation({
      query: (data) => ({
        url: env.apiRoute.users,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "UserApi" }],
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: env.apiRoute.users + "/" + data.id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "UserApi" }],
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: env.apiRoute.users + "/" + data.id,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: [{ type: "UserApi" }],
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserListQuery,
  useGetRolesListQuery,
} = UserApi;
