import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./assets/scss/Navbar.scss";

const LoginBtn = styled.button`
  background-color: inherit;
  padding: 0.7rem;
  margin: 0.24rem 4rem;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    background-color: #b32a20;
  }
`;

const SecHeader = styled.div`
  background-color: #da2a1c;
  display: flex;
  max-height: 9rem;
  div {
    align-items: center;
  }
  justify-content: space-between;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.3rem;
`;

const Logowaper = styled.div`
  max-width: 90px;
  max-height: 90px;
  padding: 20px 10px;
`;

export default function NavBar() {
  const [IsHome, setIsHome] = React.useState(true);
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  });
  return (
    <div className="NavBarStyle">
      <div>
        <LoginBtn type="button">Đăng Nhập</LoginBtn>
      </div>
      <SecHeader>
        <div>
          <Link to="/">
            <Logowaper>
              <img
                style={{ width: "80%" }}
                src="http://wlp.howizbiz.com/static/img/logoColor.e5de23ce.png"
                alt=""
              />
            </Logowaper>
          </Link>
          {IsHome ? (
            <Title>
              HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG <br /> LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC
              ƯU TIÊN BẢO VỆ
            </Title>
          ) : (
            <div className="NavbarSearchWapper">
              <SearchBar isHome={false} />
            </div>
          )}
        </div>

        <div className="btnlistWapper">
          <Link to="/tintuc">
            <button>
              <p>Bản tin</p>
            </button>
          </Link>
          <Link to="/hoso/gioithieu">
            <button>
              <p>Giới thiệu</p>
            </button>
          </Link>
          <Link to="/hoso/tailieu">
            <button>
              <p>Tài liệu</p>
            </button>
          </Link>
          <Link to="/hoso/lienhe">
            <button className="lastBtn">
              <p>Liên hệ</p>
            </button>
          </Link>
        </div>
      </SecHeader>

      {IsHome && (
        <div className="searchWapper">
          <SearchBar isHome={true} />
        </div>
      )}
    </div>
  );
}
