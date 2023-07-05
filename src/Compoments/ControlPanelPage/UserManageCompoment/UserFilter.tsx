import React from "react";
import MagnifyIcon from "mdi-react/MagnifyIcon";
import PlusIcon from "mdi-react/PlusIcon";
import styled from "styled-components";
import { UserContext } from "../../../Context/UserContext";
import { ControlPanelContext } from "../../../Context/ControlPanelContext";
import IToken from "../../../Interface/IToken";
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
  const controlpanelcontext = React.useContext(ControlPanelContext);
  const usercontext = React.useContext(UserContext);
  const activeSelectId = React.useId();
  const roleSelectId = React.useId();
  const dateStartId = React.useId();
  const dateEndId = React.useId();
  const roledata = controlpanelcontext?.GetRole(
    usercontext?.getToken() as IToken
  );
  return (
    <div>
      <div className="d-flex justify-content-between">
        <SreachWapper>
          <MagnifyIcon />
          <input
            placeholder="Tìm kiếm theo tên hoặc số điện thoại"
            type="text"
          />
        </SreachWapper>
        <AddNewUserButton>
          <PlusIcon />
          Thêm mới
        </AddNewUserButton>
      </div>
      <FiltersWapper>
        <FilterWapper>
          <label htmlFor={activeSelectId}>Trạng thái</label>
          <select name="inactive" id={activeSelectId}>
            <option value="">Tất cả</option>
            <option value="true">Hoạt động</option>
            <option value="false">Vô hiệu hóa</option>
          </select>
        </FilterWapper>
        <FilterWapper>
          <label htmlFor={roleSelectId}>Quyền</label>
          <select name="role_id" id={roleSelectId}>
            <option value="">Quyền</option>
            {roledata?.map((data) => {
              return <option value={data.id}>{data.name}</option>;
            })}
          </select>
        </FilterWapper>
        <FilterWapper>
          <label htmlFor={dateStartId}>Ngày bắt đầu</label>
          <input type="date" name="date_start" id={dateStartId} />
          <p>Dạng dd/mm/yyyy</p>
        </FilterWapper>
        <FilterWapper>
          <label htmlFor={dateEndId}>Ngày kết thúc</label>
          <input type="date" name="date_end" id={dateEndId} />
          <p>Dạng dd/mm/yyyy</p>
        </FilterWapper>
      </FiltersWapper>
    </div>
  );
}
