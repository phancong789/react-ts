import React from "react";
import ViewDashboardIcon from "mdi-react/ViewDashboardIcon";
export default function ControlPanelContent() {
  return (
    <div>
      <div className="d-flex m-3">
        <ViewDashboardIcon className="m-1" />
        <h4>Báo cáo quản trị trạng thái hệ thống</h4>
      </div>
    </div>
  );
}
