import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
          <Container>
            <Row>
              <Col />
              <Col>
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
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
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
                    <Button variant="none" type="button">
                      Quên Mật Khẩu
                    </Button>
                  </div>
                </Form>
              </Col>
              <Col />
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
}
