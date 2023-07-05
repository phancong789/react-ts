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
import { ControlPanelContext } from "../../Context/ControlPanelContext";

export default function SideBar() {
  const controlpanelcontext = React.useContext(ControlPanelContext);
  return (
    <div className="ControlPanelSidebar">
      <Link
        id="bang-dieu-khien"
        className={
          controlpanelcontext?.sideBarState === "bang-dieu-khien"
            ? "active"
            : ""
        }
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
          controlpanelcontext?.setSideBarState(event.currentTarget.id)
        }
        to={"/bang-dieu-khien"}
      >
        <ViewDashboardIcon />
        <p>{controlpanelcontext?.sidebarActive ? "Bảng điều khiển" : ""}</p>
      </Link>
      <Link
        id="he-thong-nguoi-dung"
        className={
          controlpanelcontext?.sideBarState === "he-thong-nguoi-dung"
            ? "active"
            : ""
        }
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
          controlpanelcontext?.setSideBarState(event.currentTarget.id)
        }
        to={"/he-thong/nguoi-dung"}
      >
        <AccountIcon />
        <p>{controlpanelcontext?.sidebarActive ? "Quản lý người dùng" : ""}</p>
      </Link>
      <Link
        id="phan-loai-hoc"
        className={
          controlpanelcontext?.sideBarState === "phan-loai-hoc" ? "active" : ""
        }
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
          controlpanelcontext?.setSideBarState(event.currentTarget.id)
        }
        to={"/phan-loai-hoc"}
      >
        <SortAscendingIcon />
        <p>{controlpanelcontext?.sidebarActive ? "Phân loại học" : ""}</p>
      </Link>
      <Link
        id="loai"
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
          controlpanelcontext?.setSideBarState(event.currentTarget.id)
        }
        className={controlpanelcontext?.sideBarState === "loai" ? "active" : ""}
        to={"/loai"}
      >
        <SheepIcon />
        <p>
          {controlpanelcontext?.sidebarActive ? "Loài nguy cấp quý hiếm" : ""}
        </p>
      </Link>
      <Link
        id="bai-viet"
        className={
          controlpanelcontext?.sideBarState === "bai-viet" ? "active" : ""
        }
        to={"/bai-viet"}
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
          controlpanelcontext?.setSideBarState(event.currentTarget.id)
        }
      >
        <PencilIcon />
        <p>{controlpanelcontext?.sidebarActive ? "Bài viết" : ""}</p>
      </Link>
      <ul>
        <CodeNotEqualIcon />
        {controlpanelcontext?.sidebarActive ? (
          <span>
            Phiếu đề xuất <TriangleDownIcon />
          </span>
        ) : (
          ""
        )}
        <li></li>
      </ul>
      <ul>
        <BookSettingsIcon />
        {controlpanelcontext?.sidebarActive ? (
          <span>
            Danh mục <TriangleDownIcon />
          </span>
        ) : (
          ""
        )}
        <li></li>
      </ul>
    </div>
  );
}
