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
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import * as env from "../env";
import { err } from "react-native-svg/lib/typescript/xml";
import IToken from "../Interface/IToken";

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

export default function LoginPage() {
  const [validated, setValidated] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.stopPropagation();
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();
    if (form.checkValidity() === true) {
      const formdata = new FormData(form);
      axios
        .post<IToken>(env.hostName + env.apiRoute.webAuthenticate, formdata)
        .then((x) => {
          sessionStorage.setItem("token", JSON.stringify(x.data));
          if (x.status === 200) {
            return navigate("/bang-dieu-khien");
          }
        })
        .catch((err) => console.log(err));
    }
    setValidated(true);
  };

  return (
    <div>
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
                      validated={validated}
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={regular("user")} />
                          </InputGroup.Text>
                          <Form.Control
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
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                          />
                          <Form.Control.Feedback type="invalid">
                            Trường mật khẩu không được bỏ trống.
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