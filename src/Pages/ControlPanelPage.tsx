import React from "react";
import TopBar from "../Compoments/ControlPanelPage/TopBar";
import SideBar from "../Compoments/ControlPanelPage/SideBar";
import ControlPanelContent from "../Compoments/ControlPanelPage/ControlPanelContent";

export default function ControlPanelPage() {
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
