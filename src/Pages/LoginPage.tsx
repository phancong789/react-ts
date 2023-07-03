import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import * as env from "../env";
import { UserContext } from "../Context/UserContext";

const SecHeader = styled.div`
  background-color: #da2a1c;
  display: flex;
  height: 6rem;
  div {
    align-items: center;
  }
`;

const Title = styled.h1`
  color: white;
  width: 100%;
  margin: 0 auto;
  font-size: 1.3rem;
  text-align: center;
`;

const Logowaper = styled.div`
  max-width: 90px;
  max-height: 90px;
  padding: 20px 10px;
`;

interface IError {
  errors?: {
    password?: [string];
  };
  message: string;
}
export default function LoginPage() {
  const usercontext = React.useContext(UserContext);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.stopPropagation();
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();
    if (form.checkValidity() === true) {
      const formdata = new FormData(form);
      console.log(usercontext?.Login(formdata));
    }
    usercontext?.setValidated(true);
  };

  return (
    <div>
      {usercontext?.show && (
        <Alert
          variant="danger"
          className="position-fixed"
          style={{ top: "1rem", right: "1rem" }}
          onClose={() => usercontext?.setShow(false)}
          dismissible
        >
          {usercontext?.errorData?.message}
        </Alert>
      )}
      <Container
        fluid
        className="p-0"
        style={{
          height: "100vh",
          backgroundImage:
            "url(http://wlp.howizbiz.com/static/img/footerLogin.cf032540.svg)",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundPositionX: "center",
          backgroundPositionY: "bottom",
        }}
      >
        <Row>
          <SecHeader>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Link to="/">
                <Logowaper>
                  <img
                    style={{ width: "80%" }}
                    src="http://wlp.howizbiz.com/static/img/logoColor.e5de23ce.png"
                    alt=""
                  />
                </Logowaper>
              </Link>
              <Title>
                HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU
                TIÊN BẢO VỆ
              </Title>
            </div>
          </SecHeader>
        </Row>
        <Row>
          <Container className="mt-5 pt-5">
            <Row>
              <Col />
              <Col />
              <Col>
                <Card>
                  <Card.Body>
                    <div
                      className="d-flex justify-content-center"
                      style={{ flexDirection: "column", textAlign: "center" }}
                    >
                      <Link to={"/"}>
                        <img
                          style={{ width: "20%", margin: "0 auto" }}
                          src="http://wlp.howizbiz.com/static/img/logoColor.e5de23ce.png"
                          alt=""
                        />
                      </Link>
                      <h1>Đăng Nhập</h1>
                    </div>
                    <Form
                      noValidate
                      validated={usercontext?.validated}
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={regular("user")} />
                          </InputGroup.Text>
                          <Form.Control
                            className={
                              usercontext?.errorData?.message
                                ? "border-danger"
                                : ""
                            }
                            required
                            type="text"
                            name="username"
                            placeholder="Điền tên đăng nhập"
                          />
                          <Form.Control.Feedback type="invalid">
                            Trường tên đăng nhập không được bỏ trống.
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={solid("lock")} />
                          </InputGroup.Text>
                          <Form.Control
                            className={
                              usercontext?.errorData?.errors?.password ||
                              usercontext?.errorData?.message
                                ? "border-danger"
                                : ""
                            }
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                          />
                          <Form.Control.Feedback type="invalid">
                            {usercontext?.errorData?.errors?.password
                              ? usercontext?.errorData?.errors?.password[0]
                              : "Trường mật khẩu không được bỏ trống."}
                          </Form.Control.Feedback>
                          <Form.Control.Feedback
                            type="valid"
                            className="text-danger"
                          >
                            {usercontext?.errorData?.errors?.password
                              ? usercontext?.errorData?.errors?.password[0]
                              : ""}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      <div className="d-grid gap-2">
                        <Button
                          className="round"
                          variant="danger"
                          size="lg"
                          type="submit"
                        >
                          Đăng Nhập
                        </Button>
                      </div>
                      <div className=" pt-3 text-center">
                        <Button variant="light" type="button">
                          Quên Mật Khẩu
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col />
              <Col />
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
}
