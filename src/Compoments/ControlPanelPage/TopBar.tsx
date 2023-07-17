import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MenuIcon from "mdi-react/MenuIcon";
import UserInfoPopDown from "./UserPopDown";
import "./Assets/Scss/ControlPanelTopBar.scss";
import { useAppDispatch } from "../../CustomHook/hook";
import { setToggleControlPanelSiderBar } from "../../features/UiSlice";

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
  white-space: nowrap;
  overflow: hidden;
  font-size: 1.3rem;
`;

const Logowaper = styled.div`
  max-width: 70px;
  max-height: 70px;
  min-height: 50px;
  min-width: 50px;
`;

export default function TopBar() {
  const dispatch = useAppDispatch();
  return (
    <Container fluid className="ControlPanelTopBar">
      <Row>
        <SecHeader>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              variant="light"
              onClick={() => {
                dispatch(setToggleControlPanelSiderBar());
              }}
              className="rounded-circle"
            >
              <MenuIcon />
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
