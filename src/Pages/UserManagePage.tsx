import React from "react";
import TopBar from "../Compoments/ControlPanelPage/TopBar";
import SideBar from "../Compoments/ControlPanelPage/SideBar";
import { UserContext } from "../Context/UserContext";
import UserManageContent from "../Compoments/ControlPanelPage/UserManageContent";
import Pagination from "../Compoments/Shared/Pagination";
import CreateNewUserForm from "../Compoments/ControlPanelPage/UserManageCompoment/CreateNewUserForm";

export default function UserManagePage() {
  const usechecklogin = React.useContext(UserContext);
  usechecklogin?.CheckLogin(true);
  return (
    <>
      <TopBar />
      <div className="d-flex" style={{ height: "100%" }}>
        <SideBar />
        <div style={{ flexGrow: 2 }}>
          <UserManageContent />
          <Pagination />
        </div>
      </div>
      <CreateNewUserForm />
    </>
  );
}
