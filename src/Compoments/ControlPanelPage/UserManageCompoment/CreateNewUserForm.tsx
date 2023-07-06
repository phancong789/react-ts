import React from "react";
import { Form } from "react-bootstrap";
import { styled } from "styled-components";

const Dialog = styled.dialog`
  z-index: 2;
  border: 0;
  &::backdrop {
    background-color: #ff000090;
  }
`;

export default function CreateNewUserForm() {
  const [validated, setValidated] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
    }

    setValidated(true);
  };
  return (
    <Dialog open>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div>
          <h3>Thêm mới người dùng</h3>
          <button></button>
        </div>
      </Form>
    </Dialog>
  );
}
