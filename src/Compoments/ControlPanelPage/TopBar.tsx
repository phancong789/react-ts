import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import UserInfoPopDown from "./UserPopDown";

const SecHeader = styled.div`
  background-color: white;
  display: flex;
  height: 4rem;
  div {
    align-items: center;
  }
`;

const Title = styled.h1`
  width: 100%;
  margin: 0 auto;
  font-size: 1.3rem;
`;

const Logowaper = styled.div`
  max-width: 70px;
  max-height: 70px;
`;

export default function TopBar() {
  return (
    <Container fluid>
      <Row>
        <SecHeader>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button variant="light" className="rounded-circle">
              <FontAwesomeIcon icon={solid("bars")} />
            </Button>
            <Link to="/">
              <Logowaper>
                <img
                  style={{ width: "80%", padding: 10 }}
                  src="http://wlp.howizbiz.com/static/img/logoColor.e5de23ce.png"
                  alt=""
                />
              </Logowaper>
            </Link>
            <Title>
              HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN
              BẢO VỆ
            </Title>

            <UserInfoPopDown />
          </div>
        </SecHeader>
      </Row>
    </Container>
  );
}
