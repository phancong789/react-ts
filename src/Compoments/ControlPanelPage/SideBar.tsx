import React from "react";
import ViewDashboardIcon from "mdi-react/ViewDashboardIcon";
import AccountIcon from "mdi-react/AccountIcon";
import SortAscendingIcon from "mdi-react/SortAscendingIcon";
import SheepIcon from "mdi-react/SheepIcon";
import PencilIcon from "mdi-react/PencilIcon";
import CodeNotEqualIcon from "mdi-react/CodeNotEqualIcon";
import BookSettingsIcon from "mdi-react/BookSettingsIcon";
import TriangleDownIcon from "mdi-react/TriangleDownIcon";
import { Link } from "react-router-dom";
import "./Assets/Scss/SiderBar.scss";
import { useAppSelector } from "../../CustomHook/hook";
import { selectToggleControlPanelSiderBar } from "../../features/UiSlice";

export default function SideBar() {
  const toggleControlPanelSiderBar = useAppSelector(
    selectToggleControlPanelSiderBar
  );
  return (
    <div className="ControlPanelSidebar">
      <Link id="/bang-dieu-khien" to={"/bang-dieu-khien"}>
        <ViewDashboardIcon />
        <p>{toggleControlPanelSiderBar ? "Bảng điều Khiển" : undefined}</p>
      </Link>
      <Link id="/he-thong-nguoi-dung" to={"/he-thong-nguoi-dung"}>
        <AccountIcon />
        <p>{toggleControlPanelSiderBar ? "Quản lý người dùng" : undefined}</p>
      </Link>
      <Link id="/phan-loai-hoc" to={"/phan-loai-hoc"}>
        <SortAscendingIcon />
        <p>{toggleControlPanelSiderBar ? "Phân loại học" : undefined}</p>
      </Link>
      <Link id="/loai" to={"/loai"}>
        <SheepIcon />
        <p>
          {toggleControlPanelSiderBar ? "Loài nguy cấp nguy hiểm" : undefined}
        </p>
      </Link>
      <Link id="/bai-viet" to={"/bai-viet"}>
        <PencilIcon />
        <p>{toggleControlPanelSiderBar ? "Bài viết" : undefined}</p>
      </Link>
      <ul>
        <CodeNotEqualIcon />{" "}
        {toggleControlPanelSiderBar ? (
          <span>
            Phiến đề xuất <TriangleDownIcon />
          </span>
        ) : undefined}
        <li></li>
      </ul>
      <ul>
        <BookSettingsIcon />
        {toggleControlPanelSiderBar ? (
          <span>
            Danh mục <TriangleDownIcon />
          </span>
        ) : undefined}
        <li></li>
      </ul>
    </div>
  );
}
