import React from "react";
import DotsGridIcon from "mdi-react/DotsGridIcon";
import MenuIcon from "mdi-react/MenuIcon";
import MapIcon from "mdi-react/MapIcon";
import ChartBarIcon from "mdi-react/ChartBarIcon";
import { useAppDispatch, useAppSelector } from "../../CustomHook/hook";
import {
  selectSwitchSearchPageContent,
  setSwitchSearchPageContent,
} from "../../features/UiSlice";
import "./assets/scss/Topbar.scss";

export default function TopBar() {
  const switchcontent = useAppSelector(selectSwitchSearchPageContent);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setSwitchSearchPageContent(event.currentTarget.id));
  };

  return (
    <div className="topbar">
      <div></div>
      <div>
        <div className={switchcontent === "grid" ? "pressed" : undefined}>
          <button id={"grid"} onClick={handleClick}>
            <DotsGridIcon size={30} />
            <p>Lưới</p>
          </button>
        </div>
        <div className={switchcontent === "table" ? "pressed" : undefined}>
          <button id={"table"} onClick={handleClick}>
            <MenuIcon size={30} />
            <p>Bảng</p>
          </button>
        </div>
        <div className={switchcontent === "map" ? "pressed" : undefined}>
          <button id={"map"} onClick={handleClick}>
            <MapIcon size={30} />
            <p>Bản Đồ</p>
          </button>
        </div>
        <div
          className={switchcontent === "statistical" ? "pressed" : undefined}
        >
          <button id={"statistical"} onClick={handleClick}>
            <ChartBarIcon size={30} />
            <p>Thống Kê</p>
          </button>
        </div>
      </div>
      <div className="excelbtn">
        <button></button>
      </div>
    </div>
  );
}
