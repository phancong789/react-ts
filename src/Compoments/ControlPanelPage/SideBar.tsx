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

export default function SideBar() {
  return (
    <div className="ControlPanelSidebar">
      <Link id="/bang-dieu-khien" to={"/bang-dieu-khien"}>
        <ViewDashboardIcon />
        <p></p>
      </Link>
      <Link id="/he-thong-nguoi-dung" to={"/he-thong-nguoi-dung"}>
        <AccountIcon />
        <p></p>
      </Link>
      <Link id="/phan-loai-hoc" to={"/phan-loai-hoc"}>
        <SortAscendingIcon />
        <p></p>
      </Link>
      <Link id="/loai" to={"/loai"}>
        <SheepIcon />
        <p></p>
      </Link>
      <Link id="/bai-viet" to={"/bai-viet"}>
        <PencilIcon />
        <p></p>
      </Link>
      <ul>
        <CodeNotEqualIcon />
        <li></li>
      </ul>
      <ul>
        <BookSettingsIcon />
        <li></li>
      </ul>
    </div>
  );
}
