import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { HomeAndSearchApi } from "../service/HomeAndSearchApi";
import ISpecies from "../Interface/ISpecies";

export interface INew {
  list: {
    ngay_viet: string;
    anh_dai_dien: string;
    tieu_de: string;
    tom_tat: string;
  }[];
  pagination: {
    count: number;
    hasMoreItems: boolean;
    itemsPerPage: number;
    page: number;
    total: number;
  };
}

export interface IExtinctionRate {
  data: { ten: string; ty_le: number }[];
  tong_loai: number;
}

export interface tokenState {
  ProminentSpecies: ISpecies[] | null;
  News: INew | null;
  ExtinctionRate: IExtinctionRate | null;
  SearchResult: ISpecies[] | null;
  Species: ISpecies[] | null;
  status: "idle" | "loading" | "failed";
}

const initialState: tokenState = {
  Species: null,
  News: null,
  ExtinctionRate: null,
  SearchResult: null,
  ProminentSpecies: null,
  status: "idle",
};

const HomeAndSearchSlice = createSlice({
  name: "HomeAndSearchSlice",
  initialState,
  reducers: {
    setSearchResult: (state, action: PayloadAction<ISpecies[]>) => {},
  },
  extraReducers(builder) {
    builder.addMatcher(
      HomeAndSearchApi.endpoints.getProminentSpecies.matchFulfilled,
      (state, { payload }) => {
        state.Species = payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      HomeAndSearchApi.endpoints.getNews.matchFulfilled,
      (state, { payload }) => {
        state.News = payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      HomeAndSearchApi.endpoints.getExtinctionRate.matchFulfilled,
      (state, { payload }) => {
        state.ExtinctionRate = payload;
        state.status = "idle";
      }
    );
  },
});

export const { setSearchResult } = HomeAndSearchSlice.actions;

export default HomeAndSearchSlice.reducer;
