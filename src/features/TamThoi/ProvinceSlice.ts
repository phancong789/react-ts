import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import IGeneralFilterData from "../../Interface/IGeneralFilterData";
import { ProvinceApi } from "./ProvinceApi";

export interface StartState {
  Province: IGeneralFilterData[] | null;
  mapinfo: number[];
  status: "idle" | "loading" | "failed";
}

const initialState: StartState = {
  Province: null,
  mapinfo: [],
  status: "idle",
};

const ProvinceSlice = createSlice({
  name: "ProvinceSlice",
  initialState,
  reducers: {
    deleteMapInfo: (state, action: PayloadAction<number[]>) => {
      state.mapinfo = state.mapinfo.filter(
        (id) => !action.payload.includes(id)
      );
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      ProvinceApi.endpoints.getProvince.matchFulfilled,
      (state, { payload }) => {
        state.Province = payload;
        state.status = "idle";
      }
    );
  },
});

export const { deleteMapInfo } = ProvinceSlice.actions;

export const selectProvinces = (state: RootState) =>
  state.ProvinceSlice.Province;

export default ProvinceSlice.reducer;
