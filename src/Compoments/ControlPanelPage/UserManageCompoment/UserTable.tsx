import React from "react";
import { ControlPanelContext } from "../../../Context/ControlPanelContext";
import PencilIcon from "mdi-react/PencilIcon";
import DeleteOutlineIcon from "mdi-react/DeleteOutlineIcon";
import LockResetIcon from "mdi-react/LockResetIcon";
import { styled } from "styled-components";

const TableData = styled.td`
  padding: 0 10px;
  button {
    border: none;
    background-color: inherit;
    &:first-of-type {
      color: gray;
    }
    &:nth-of-type(2) {
      color: green;
    }
    &:last-of-type {
      color: red;
    }
  }
`;

export default function UserTable() {
  const controlpanelcontext = React.useContext(ControlPanelContext);
  let userListdata = controlpanelcontext?.GetUserData();
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Tên hiển thị</th>
            <th>Tên đăng nhập</th>
            <th>Số điện thoại</th>
            <th>Trạng thái</th>
            <th>Quyền</th>
            <th>Ngày tạo</th>
            <th>Hàng Động</th>
          </tr>
        </thead>
        <tbody>
          {userListdata?.list.map((user) => {
            return (
              <tr>
                <TableData>{user.name}</TableData>
                <TableData>{user.username}</TableData>
                <TableData>{user.mobile}</TableData>
                <TableData>{!user.inactive ? "true" : "false"}</TableData>
                <TableData style={{ display: "flex", flexWrap: "wrap" }}>
                  {user.roles.map((role) => {
                    return (
                      <span
                        style={{
                          padding: "0.2rem 0.4rem",
                          margin: "0.2rem 0.2rem",
                          borderRadius: 5,
                          fontWeight: "bolder",
                          whiteSpace: "nowrap",
                          color: role.meta["text-color"],
                          backgroundColor: role.meta.color,
                        }}
                      >
                        {role.name}
                      </span>
                    );
                  })}
                </TableData>
                <TableData>{user.created_at.substring(0, 10)}</TableData>
                <TableData style={{ display: "flex", flexWrap: "nowrap" }}>
                  <button>
                    <LockResetIcon />
                  </button>
                  <button>
                    <PencilIcon />
                  </button>
                  <button>
                    <DeleteOutlineIcon />
                  </button>
                </TableData>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
