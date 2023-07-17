import React from "react";
import MagnifyIcon from "mdi-react/MagnifyIcon";
import PlusIcon from "mdi-react/PlusIcon";
import styled from "styled-components";
import { openCreateNewModal } from "./CreateNewUserForm";
import {
  useGetRolesListQuery,
  useGetUserListQuery,
} from "../../../service/UserApi";
import { useAppSelector } from "../../../CustomHook/hook";
import { selectListRoles } from "../../../features/UserSlice";
import * as env from "../../../env";
const SreachWapper = styled.div`
  border: 2px solid rgba(193, 193, 193, 0.8);
  display: flex;
  width: 50%;
  padding: 3px 0;
  input {
    border: none;
    padding: 2px;
    flex-grow: 2;
    outline: none;
  }
  svg {
    margin: 2px;
  }
  &:focus-within {
    border: 2px solid red;
    color: red;
  }
`;

const FiltersWapper = styled.div`
  display: flex;
  margin: 20px 0;
  padding: 10px;

  background-color: rgb(244, 246, 249);
`;

const FilterWapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  p {
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
  }
`;

const AddNewUserButton = styled.button`
  border: none;
  background-color: red;
  color: white;
  padding: 2px 15px;
  border-radius: 5px;
`;

export default function UserFilter() {
  useGetRolesListQuery(0);
  const { refetch } = useGetUserListQuery(0);
  const rolesData = useAppSelector(selectListRoles);
  const activeSelectId = React.useId();
  const roleSelectId = React.useId();
  const dateStartId = React.useId();
  const dateEndId = React.useId();

  const filterFC = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.currentTarget.value === "") {
      env.getUserParams.delete(e.currentTarget.name);
      refetch();
    } else {
      env.getUserParams.set(e.currentTarget.name, e.currentTarget.value);
      refetch();
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="d-flex justify-content-between">
        <SreachWapper>
          <MagnifyIcon />
          <input
            placeholder="Tìm kiếm theo tên hoặc số điện thoại"
            name="search"
            onChange={filterFC}
            type="text"
          />
        </SreachWapper>
        <AddNewUserButton onClick={openCreateNewModal}>
          <PlusIcon />
          Thêm mới
        </AddNewUserButton>
      </div>
      <FiltersWapper>
        <FilterWapper>
          <label htmlFor={activeSelectId}>Trạng thái</label>
          <select name="inactive" onChange={filterFC} id={activeSelectId}>
            <option value="">Tất cả</option>
            <option value="false">Hoạt động</option>
            <option value="true">Vô hiệu hóa</option>
          </select>
        </FilterWapper>
        <FilterWapper>
          <label htmlFor={roleSelectId}>Quyền</label>
          <select name="role_id" onChange={filterFC} id={roleSelectId}>
            <option value="">Quyền</option>
            {rolesData?.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
          </select>
        </FilterWapper>
        <FilterWapper>
          <label htmlFor={dateStartId}>Ngày bắt đầu</label>
          <input
            type="date"
            onChange={filterFC}
            name="date_start"
            id={dateStartId}
          />
          <p>Dạng dd/mm/yyyy</p>
        </FilterWapper>
        <FilterWapper>
          <label htmlFor={dateEndId}>Ngày kết thúc</label>
          <input
            type="date"
            onChange={filterFC}
            name="date_end"
            id={dateEndId}
          />
          <p>Dạng dd/mm/yyyy</p>
        </FilterWapper>
      </FiltersWapper>
    </div>
  );
}
