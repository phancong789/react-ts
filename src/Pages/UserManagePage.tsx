import React from "react";
import TopBar from "../Compoments/ControlPanelPage/TopBar";
import SideBar from "../Compoments/ControlPanelPage/SideBar";
import { UserContext } from "../Context/UserContext";
import UserManageContent from "../Compoments/ControlPanelPage/UserManageContent";
import Pagination from "../Compoments/Shared/Pagination";
import CreateNewUserForm from "../Compoments/ControlPanelPage/UserManageCompoment/CreateNewUserForm";
import EditUserForm from "../Compoments/ControlPanelPage/UserManageCompoment/EditUserForm";
import Alert from "react-bootstrap/esm/Alert";
import { ControlPanelContext } from "../Context/ControlPanelContext";
import DeleteUserForm from "../Compoments/ControlPanelPage/UserManageCompoment/DeleteUserForm";

export default function UserManagePage() {
  const usechecklogin = React.useContext(UserContext);
  const controlpanelcontext = React.useContext(ControlPanelContext);
  let errordata = controlpanelcontext?.errorData;
  usechecklogin?.CheckLogin(true);
  return (
    <>
      <TopBar />
      {controlpanelcontext?.showAlert && (
        <Alert
          variant={errordata?.errors ? "danger" : "success"}
          className="position-fixed z-3"
          style={{ top: "1rem", right: "1rem" }}
          onClose={() => controlpanelcontext.setShowAlert(false)}
          dismissible
        >
          {errordata?.message}
        </Alert>
      )}
      <div className="d-flex" style={{ height: "100%" }}>
        <SideBar />
        <div style={{ flexGrow: 2, overflow: "scroll" }}>
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
