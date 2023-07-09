import CloseIcon from "mdi-react/CloseIcon";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import styled from "styled-components";
import { ControlPanelContext } from "../../../Context/ControlPanelContext";

const Dialog = styled.dialog`
  z-index: 2;
  border: 0;
  margin: 0 auto;
  min-width: 35rem;
  max-width: 35rem;
  padding: 0;
  top: 20%;
  outline: none;
  &::backdrop {
    background-color: #00000078;
  }
`;

const openDeleteModal = () => {
  document.querySelector<HTMLDialogElement>(".deleteUser-modal")?.showModal();
};

export default function DeleteUserForm() {
  const controlpanelcontext = React.useContext(ControlPanelContext);

  const CloseModal = () => {
    const parent =
      document.querySelector<HTMLDialogElement>(".deleteUser-modal");
    parent?.close();
  };

  const clickHanlde = () => {
    controlpanelcontext?.DeleteUser();
    CloseModal();
  };
  return (
    <Dialog className="deleteUser-modal">
      <div className="d-flex p-3 mb-2 justify-content-between text-light bg-danger">
        <h5 className="pt-2 pb-2 ps-2 m-0">Cập nhật người dùng</h5>
        <Button onClick={CloseModal} variant="none" className="p-1 m-1">
          <CloseIcon color="#fff" />
        </Button>
      </div>
      <div>
        <p className="mt-4 me-3 mb-2 ms-3">
          Bạn có chắc muốn xóa{" "}
          <span className="text-danger">
            {controlpanelcontext?.userdata?.username}
          </span>
          . Điều này hoàn toàn không thế hoàn tác!
        </p>
      </div>
      <div className="m-3 d-flex justify-content-end">
        <Button
          className="me-2"
          onClick={CloseModal}
          variant="light"
          type="button"
        >
          Hủy
        </Button>
        <Button variant="danger" onClick={clickHanlde} type="button">
          Xóa
        </Button>
      </div>
    </Dialog>
  );
}

export { openDeleteModal };
