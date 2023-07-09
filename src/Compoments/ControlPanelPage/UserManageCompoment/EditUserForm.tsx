import React from "react";
import { Button, Form } from "react-bootstrap";
import { styled } from "styled-components";
import CloseIcon from "mdi-react/CloseIcon";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ControlPanelContext } from "../../../Context/ControlPanelContext";
import { UserContext } from "../../../Context/UserContext";
import IToken from "../../../Interface/IToken";

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

const animatedComponents = makeAnimated();

const openEditModal = () => {
  document.querySelector<HTMLDialogElement>(".editUser-modal")?.showModal();
};

export default function EditUserForm() {
  const [validated, setValidated] = React.useState(false);
  const [selectRoleValue, setSelectRoleValue] = React.useState<
    | {
        value: number;
        label: string;
        color: string;
        backgroundColor: string;
      }[]
    | null
  >(null);
  const [selectProvinceValue, setSelectProvinceValue] = React.useState<
    | {
        value: number;
        label: string;
      }[]
    | null
  >(null);
  const [selectKhubaotonValue, setSelectKhubaotonValue] = React.useState<
    | {
        value: number;
        label: string;
        loai_khu: string;
      }[]
    | null
  >(null);
  const controlpanelcontext = React.useContext(ControlPanelContext);
  const usercontext = React.useContext(UserContext);
  const token = usercontext?.getToken();
  const errordata = controlpanelcontext?.errorData;
  const userdata = controlpanelcontext?.userdata;

  let Rolesoptions = controlpanelcontext?.roleData?.map((x) => {
    return {
      value: x.id,
      color: x.meta["text-color"],
      backgroundColor: x.meta.color,
      label: x.name,
    };
  });

  let Provincesoptions = controlpanelcontext
    ?.GetProvince(token as IToken)
    ?.map((x) => {
      return {
        value: x.id,
        label: x.name,
      };
    });

  let Khubaotonoptions = controlpanelcontext
    ?.GetKhubaoton(token as IToken)
    ?.map((x) => {
      return {
        value: x.id,
        loai_khu: x.loai_khu,
        label: x.ten,
      };
    });

  let roledefaultValue = userdata?.roles?.map((x) => {
    return {
      value: x.id,
      color: x.meta["text-color"],
      backgroundColor: x.meta.color,
      label: x.name,
    };
  });

  let provinceDefaultValue = userdata?.provinces.map((x) => {
    return {
      value: x.id,
      label: x.name,
    };
  });

  let khubaotonDefaultValue = userdata?.khubaoton?.map((x) => {
    return {
      value: x.id,
      label: x.ten,
      loai_khu: x.loai_khu,
    };
  });

  React.useEffect(() => {
    if (roledefaultValue) setSelectRoleValue(roledefaultValue);
    if (provinceDefaultValue) setSelectProvinceValue(provinceDefaultValue);
    if (khubaotonDefaultValue) setSelectKhubaotonValue(khubaotonDefaultValue);
  }, [JSON.stringify(controlpanelcontext?.userdata)]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      let formdata = new FormData(form);
      let formDataObj: any = {};

      formdata.forEach((value, key) => (formDataObj[key] = value));

      let roleidarr: number[] = [];
      selectRoleValue?.map((x) => roleidarr.push(x.value));
      formDataObj["role_ids"] = roleidarr;

      if (
        selectRoleValue?.some((x) => {
          return x.value === 4;
        })
      ) {
        let provinceidarr: number[] = [];
        selectProvinceValue?.map((x) => provinceidarr.push(x.value));
        formDataObj["provinces_ids"] = provinceidarr;
      }

      if (
        selectRoleValue?.some((x) => {
          return x.value === 5;
        })
      ) {
        let khubaotonidarr: object[] = [];
        selectKhubaotonValue?.map((x) =>
          khubaotonidarr.push({
            id: x.value,
            ten: x.label,
            loai_khu: x.loai_khu,
          })
        );
        formDataObj["khubaoton"] = khubaotonidarr;
      }

      formDataObj["id"] = userdata?.id;
      controlpanelcontext?.EditUser(formDataObj);
      if (errordata?.errors === undefined) {
        CloseForm();
      }
    }
    setValidated(true);
  };

  const CloseForm = () => {
    const parent = document.querySelector<HTMLDialogElement>(".editUser-modal");
    parent?.close();
    parent?.querySelector<HTMLFormElement>("form")?.reset();
    setSelectRoleValue(null);
    setSelectKhubaotonValue(null);
    setSelectProvinceValue(null);
  };

  return (
    <Dialog className="editUser-modal">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="d-flex p-3 mb-2 justify-content-between text-light bg-danger">
          <h5 className="pt-2 pb-2 ps-2 m-0">Cập nhật người dùng</h5>
          <Button onClick={CloseForm} variant="none" className="p-1 m-1">
            <CloseIcon color="#fff" />
          </Button>
        </div>
        <div className="m-2">
          <Form.Group className="mt-3 mb-3 ms-4 me-4" controlId="nameGroup">
            <Form.Label>Tên hiển thị</Form.Label>
            <Form.Control
              className={errordata?.errors?.name ? "border-danger" : ""}
              placeholder="vui lòng điền tên bạn mong muốn"
              type="text"
              defaultValue={userdata?.name}
              name="name"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errordata?.errors?.name
                ? errordata?.errors?.name[0]
                : "Trường tên không được bỏ trống."}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid" className="text-danger">
              {errordata?.errors?.name ? errordata?.errors?.name[0] : ""}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3 mb-3 ms-4 me-4" controlId="usernameGroup">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              placeholder="vui lòng điền Tên đăng nhập bạn mong muốn"
              className={errordata?.errors?.username ? "border-danger" : ""}
              type="text"
              name="username"
              readOnly
              style={{ opacity: "0.6" }}
              value={userdata?.username}
            />
            <Form.Control.Feedback type="invalid">
              {errordata?.errors?.username
                ? errordata?.errors?.username[0]
                : "Trường tên đăng nhập không được bỏ trống."}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid" className="text-danger">
              {errordata?.errors?.username
                ? errordata?.errors?.username[0]
                : ""}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3 mb-3 ms-4 me-4" controlId="EmailGroup">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="vui lòng điền Email bạn mong muốn"
              className={errordata?.errors?.email ? "border-danger" : ""}
              type="email"
              name="email"
              defaultValue={userdata?.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errordata?.errors?.email
                ? errordata?.errors?.email[0]
                : "Trường tên đăng nhập không được bỏ trống."}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid" className="text-danger">
              {errordata?.errors?.email ? errordata?.errors?.email[0] : ""}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3 mb-3 ms-4 me-4" controlId="phoneGroup">
            <Form.Label>Điện thoại</Form.Label>
            <Form.Control
              placeholder="vui lòng điền số Điện thoại bạn mong muốn"
              type="number"
              defaultValue={userdata?.phone}
              name="phone"
            />
          </Form.Group>
          <div className="mt-3 mb-3 ms-4 me-4">
            <label htmlFor="roleSelect">Quyền</label>
            <Select
              id="roleSelect"
              isClearable
              isMulti
              styles={{
                control: (styles) => ({
                  ...styles,
                  backgroundColor: "white",
                }),
                multiValue: (styles, { data }) => {
                  return {
                    ...styles,
                    fontWeight: "bolder",
                    backgroundColor: data.backgroundColor,
                  };
                },
                multiValueLabel: (styles, { data }) => ({
                  ...styles,
                  color: data.color,
                }),
              }}
              components={animatedComponents}
              isSearchable
              onChange={(e) => {
                setSelectRoleValue(
                  e.map((x) => {
                    return {
                      value: x.value,
                      color: x.color,
                      backgroundColor: x.backgroundColor,
                      label: x.label,
                    };
                  })
                );
              }}
              value={selectRoleValue}
              options={Rolesoptions}
              required
            />
            {selectRoleValue === null ||
              (selectRoleValue.length === 0 && (
                <p className="text-danger">Quyền không Được để trống</p>
              ))}
          </div>
          {selectRoleValue?.some((x) => {
            return x.value === 4;
          }) && (
            <div className="mt-3 mb-3 ms-4 me-4">
              <label htmlFor="roleSelect">Tinh thành quản lý</label>
              <Select
                id="roleSelect"
                isClearable
                isMulti
                value={selectProvinceValue}
                onChange={(e) => {
                  setSelectProvinceValue(
                    e.map((x) => {
                      return {
                        value: x.value,
                        label: x.label,
                      };
                    })
                  );
                }}
                options={Provincesoptions}
                components={animatedComponents}
                isSearchable
                noOptionsMessage={(obj: { inputValue: string }) => (
                  <p>{(obj.inputValue = "")}</p>
                )}
              />
              {selectProvinceValue === null ||
                (selectProvinceValue.length === 0 && (
                  <p className="text-danger">Thành phố không Được để trống</p>
                ))}
            </div>
          )}
          {selectRoleValue?.some((x) => {
            return x.value === 5;
          }) && (
            <div className="mt-3 mb-3 ms-4 me-4">
              <label htmlFor="roleSelect">KBT/VQG quản lý</label>
              <Select
                id="roleSelect"
                isClearable
                isMulti
                value={selectKhubaotonValue}
                options={Khubaotonoptions}
                onChange={(e) => {
                  setSelectKhubaotonValue(
                    e.map((x) => {
                      return {
                        value: x.value,
                        loai_khu: x.loai_khu,
                        label: x.label,
                      };
                    })
                  );
                }}
                components={animatedComponents}
                isSearchable
                noOptionsMessage={(obj: { inputValue: string }) => (
                  <p>{(obj.inputValue = "")}</p>
                )}
              />
              {selectKhubaotonValue === null ||
                (selectKhubaotonValue.length === 0 && (
                  <p className="text-danger">Trường không Được để trống</p>
                ))}
            </div>
          )}
          <div className="m-3 d-flex justify-content-end">
            <Button
              className="me-2"
              onClick={CloseForm}
              variant="light"
              type="button"
            >
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
