import React from "react";
import AccountIcon from "mdi-react/AccountIcon";
import UserFilter from "./UserManageCompoment/UserFilter";
import UserTable from "./UserManageCompoment/UserTable";
export default function UserManageContent() {
  return (
    <div className="m-4 flex-grow-1">
      <div className="d-flex">
        <AccountIcon className="m-1" />
        <h4>Danh sách người dùng</h4>
      </div>
      <div className="mt-3">
        <UserFilter />
        <UserTable />
      </div>
    </div>
  );
}
