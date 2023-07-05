import React from "react";
import TopBar from "../Compoments/ControlPanelPage/TopBar";
import SideBar from "../Compoments/ControlPanelPage/SideBar";
import { UserContext } from "../Context/UserContext";
import ControlPanelContent from "../Compoments/ControlPanelPage/ControlPanelContent";

export default function ControlPanelPage() {
  const usechecklogin = React.useContext(UserContext);
  usechecklogin?.CheckLogin(true);
  return (
    <>
      <TopBar />
      <div className="d-flex" style={{ height: "100%" }}>
        <SideBar />
        <ControlPanelContent />
      </div>
    </>
  );
}
