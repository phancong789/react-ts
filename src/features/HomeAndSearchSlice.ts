import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { HomeAndSearchApi } from "../service/HomeAndSearchApi";
import ISpecies from "../Interface/ISpecies";
import IListData from "../Interface/IListData";
import IGeneralFilterData from "../Interface/IGeneralFilterData";
import IMapInfo from "../Interface/IMapInfo";

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
  News: INew | null;
  Province: IGeneralFilterData[] | null;
  khubaoton: IGeneralFilterData[] | null;
  SearchResult: ISpecies[] | null;
  Species: IListData<ISpecies[]> | null;
  mapinfo: IMapInfo[] | null;
  status: "idle" | "loading" | "failed";
}

const initialState: tokenState = {
  Species: null,
  News: null,
  Province: null,
  khubaoton: null,
  SearchResult: null,
  mapinfo: null,
  status: "idle",
};

const HomeAndSearchSlice = createSlice({
  name: "HomeAndSearchSlice",
  initialState,
  reducers: {
    setSpeciesData: (state, action: PayloadAction<IListData<ISpecies[]>>) => {
      if (state.Species === null) {
        state.Species = action.payload;
      } else if (state.Species) {
        state.Species.list = [...state.Species.list, ...action.payload.list];
      }

      state.status = "idle";
    },

    setSearchResult: (state, action: PayloadAction<ISpecies[]>) => {
      state.SearchResult = action.payload;
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      HomeAndSearchApi.endpoints.getNews.matchFulfilled,
      (state, { payload }) => {
        state.News = payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      HomeAndSearchApi.endpoints.getProvince.matchFulfilled,
      (state, { payload }) => {
        state.Province = payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      HomeAndSearchApi.endpoints.getKhuBaoton.matchFulfilled,
      (state, { payload }) => {
        state.khubaoton = payload;
        state.status = "idle";
      }
    );
    builder
      // .addMatcher(
      //   HomeAndSearchApi.endpoints.getMapinfo.matchPending,
      //   (state) => {
      //     state.mapinfo = null;
      //     state.status = "idle";
      //   }
      // )
      .addMatcher(
        HomeAndSearchApi.endpoints.getMapinfo.matchFulfilled,
        (state, { payload }) => {
          state.mapinfo = payload;
          state.status = "idle";
        }
      );
  },
});

export const { setSearchResult, setSpeciesData } = HomeAndSearchSlice.actions;

export const selectSearch = (state: RootState) =>
  state.HomeAndSearchSlice.SearchResult;

export const selectSpecies = (state: RootState) =>
  state.HomeAndSearchSlice.Species;

export const selectProvinces = (state: RootState) =>
  state.HomeAndSearchSlice.Province;

export const selectkhubaotons = (state: RootState) =>
  state.HomeAndSearchSlice.khubaoton;

export const selectMapInfo = (state: RootState) =>
  state.HomeAndSearchSlice.mapinfo;

export default HomeAndSearchSlice.reducer;
