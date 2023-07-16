import React from "react";
import { Button, Form } from "react-bootstrap";
import { styled } from "styled-components";
import CloseIcon from "mdi-react/CloseIcon";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import IToken from "../../../Interface/IToken";

const Dialog = styled.dialog`
  z-index: 2;
  border: 0;
  margin: 0 auto;
  min-width: 35rem;
  max-width: 35rem;
  top: 50%;
  transform: translateY(-50%);
  outline: none;
  &::backdrop {
    background-color: #00000078;
  }
`;

const animatedComponents = makeAnimated();

const openEditModal = () => {
  document.querySelector<HTMLDialogElement>(".editUser-modal")?.showModal();
};

export default function EditUserForm() {
  // const [validated, setValidated] = React.useState(false);
  // const [selectRoleValue, setSelectRoleValue] = React.useState<
  //   | {
  //       value: number;
  //       label: string;
  //       color: string;
  //       backgroundColor: string;
  //     }[]
  //   | null
  // >(null);
  // const [selectProvinceValue, setSelectProvinceValue] = React.useState<
  //   | {
  //       value: number;
  //       label: string;
  //     }[]
  //   | null
  // >(null);
  // const [selectKhubaotonValue, setSelectKhubaotonValue] = React.useState<
  //   | {
  //       value: number;
  //       label: string;
  //       loai_khu: string;
  //     }[]
  //   | null
  // >(null);

  // let Rolesoptions = controlpanelcontext?.roleData?.map((x) => {
  //   return {
  //     value: x.id,
  //     color: x.meta["text-color"],
  //     backgroundColor: x.meta.color,
  //     label: x.name,
  //   };
  // });

  // let Provincesoptions = controlpanelcontext
  //   ?.GetProvince(token as IToken)
  //   ?.map((x) => {
  //     return {
  //       value: x.id,
  //       label: x.name,
  //     };
  //   });

  // let Khubaotonoptions = controlpanelcontext
  //   ?.GetKhubaoton(token as IToken)
  //   ?.map((x) => {
  //     return {
  //       value: x.id,
  //       loai_khu: x.loai_khu,
  //       label: x.ten,
  //     };
  //   });

  // let roledefaultValue = userdata?.roles?.map((x) => {
  //   return {
  //     value: x.id,
  //     color: x.meta["text-color"],
  //     backgroundColor: x.meta.color,
  //     label: x.name,
  //   };
  // });

  // let provinceDefaultValue = userdata?.provinces.map((x) => {
  //   return {
  //     value: x.id,
  //     label: x.name,
  //   };
  // });

  // let khubaotonDefaultValue = userdata?.khubaoton?.map((x) => {
  //   return {
  //     value: x.id,
  //     label: x.ten,
  //     loai_khu: x.loai_khu,
  //   };
  // });

  // React.useEffect(() => {
  //   if (roledefaultValue) setSelectRoleValue(roledefaultValue);
  //   if (provinceDefaultValue) setSelectProvinceValue(provinceDefaultValue);
  //   if (khubaotonDefaultValue) setSelectKhubaotonValue(khubaotonDefaultValue);
  // }, [JSON.stringify(controlpanelcontext?.userdata)]);

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   const form = event.currentTarget;
  //   event.preventDefault();
  //   event.stopPropagation();
  //   if (form.checkValidity() === true) {
  //     let formdata = new FormData(form);
  //     let formDataObj: any = {};

  //     formdata.forEach((value, key) => (formDataObj[key] = value));

  //     let roleidarr: number[] = [];
  //     selectRoleValue?.map((x) => roleidarr.push(x.value));
  //     formDataObj["role_ids"] = roleidarr;

  //     if (
  //       selectRoleValue?.some((x) => {
  //         return x.value === 4;
  //       })
  //     ) {
  //       let provinceidarr: number[] = [];
  //       selectProvinceValue?.map((x) => provinceidarr.push(x.value));
  //       formDataObj["provinces_ids"] = provinceidarr;
  //     }

  //     if (
  //       selectRoleValue?.some((x) => {
  //         return x.value === 5;
  //       })
  //     ) {
  //       let khubaotonidarr: object[] = [];
  //       selectKhubaotonValue?.map((x) =>
  //         khubaotonidarr.push({
  //           id: x.value,
  //           ten: x.label,
  //           loai_khu: x.loai_khu,
  //         })
  //       );
  //       formDataObj["khubaoton"] = khubaotonidarr;
  //     }

  //     formDataObj["id"] = "";

  //     CloseForm();
  //   }
  //   setValidated(true);
  // };

  // const CloseForm = () => {
  //   const parent = document.querySelector<HTMLDialogElement>(".editUser-modal");
  //   parent?.close();
  //   parent?.querySelector<HTMLFormElement>("form")?.reset();
  //   setSelectRoleValue(null);
  //   setSelectKhubaotonValue(null);
  //   setSelectProvinceValue(null);
  // };

  return (
    <Dialog className="editUser-modal">
      <Form noValidate>
        <div className="d-flex p-3 mb-2 justify-content-between text-light bg-danger">
          <h5 className="pt-2 pb-2 ps-2 m-0">Cập nhật người dùng</h5>
          <Button variant="none" className="p-1 m-1">
            <CloseIcon color="#fff" />
          </Button>
        </div>
        <div className="m-2">
          <Form.Group className="mt-3 mb-3 ms-4 me-4" controlId="nameGroup">
            <Form.Label>Tên hiển thị</Form.Label>
            <Form.Control
              placeholder="vui lòng điền tên bạn mong muốn"
              type="text"
              name="name"
              required
            />
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            <Form.Control.Feedback
              type="valid"
              className="text-danger"
            ></Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3 mb-3 ms-4 me-4" controlId="usernameGroup">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              placeholder="vui lòng điền Tên đăng nhập bạn mong muốn"
              type="text"
              name="username"
              readOnly
              style={{ opacity: "0.6" }}
            />
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            <Form.Control.Feedback
              type="valid"
              className="text-danger"
            ></Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3 mb-3 ms-4 me-4" controlId="EmailGroup">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="vui lòng điền Email bạn mong muốn"
              type="email"
              name="email"
              required
            />
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            <Form.Control.Feedback
              type="valid"
              className="text-danger"
            ></Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3 mb-3 ms-4 me-4" controlId="phoneGroup">
            <Form.Label>Điện thoại</Form.Label>
            <Form.Control
              placeholder="vui lòng điền số Điện thoại bạn mong muốn"
              type="number"
              name="phone"
            />
          </Form.Group>
          <div className="mt-3 mb-3 ms-4 me-4">
            <label htmlFor="roleSelect">Quyền</label>
          </div>

          <div className="m-3 d-flex justify-content-end">
            <Button className="me-2" variant="light" type="button">
              Hủy
            </Button>
            <Button variant="danger" type="submit">
              Gửi
            </Button>
          </div>
        </div>
      </Form>
    </Dialog>
  );
}

export { openEditModal };
