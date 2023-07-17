import React from "react";
import TopBar from "../Compoments/ControlPanelPage/TopBar";
import SideBar from "../Compoments/ControlPanelPage/SideBar";
import UserManageContent from "../Compoments/ControlPanelPage/UserManageContent";
import Pagination from "../Compoments/Shared/Pagination";
import CreateNewUserForm from "../Compoments/ControlPanelPage/UserManageCompoment/CreateNewUserForm";
import EditUserForm from "../Compoments/ControlPanelPage/UserManageCompoment/EditUserForm";
import DeleteUserForm from "../Compoments/ControlPanelPage/UserManageCompoment/DeleteUserForm";
import { ToastContainer } from "react-toastify";

export default function UserManagePage() {
  return (
    <>
      <ToastContainer />
      <TopBar />
      <div className="d-flex" style={{ height: "100%" }}>
        <SideBar />
        <div style={{ flexGrow: 2 }}>
          <UserManageContent />
          <Pagination />
        </div>
      </div>
      <CreateNewUserForm />
      <EditUserForm />
      <DeleteUserForm />
    </>
  );
}
