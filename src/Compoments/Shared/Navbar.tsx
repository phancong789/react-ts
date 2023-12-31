import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./assets/scss/Navbar.scss";
import {
  selectCurrentUser,
  selectToken,
  setTokenFormStogare,
} from "../../features/authorSlice";
import { useAppDispatch, useAppSelector } from "../../CustomHook/hook";
import { useMeQuery } from "../../service/autherApi";

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
  a {
    color: inherit;
    text-decoration: none !important;
  }
`;

const SecHeader = styled.div`
  background-color: #da2a1c;
  display: flex;
  height: 7rem;
  div {
    align-items: center;
  }
`;

const Title = styled.h1`
  color: white;
  width: 100%;
  font-size: 1.3rem;
`;

const Logowaper = styled.div`
  max-width: 90px;
  max-height: 90px;
  padding: 20px 10px;
`;

export default function NavBar() {
  const selecttoken = useAppSelector(selectToken);
  useMeQuery(0);
  const dispatch = useAppDispatch();
  const [IsHome, setIsHome] = React.useState(true);
  const selectMe = useAppSelector(selectCurrentUser);
  const location = useLocation();
  if (!selecttoken) {
    dispatch(
      setTokenFormStogare(JSON.parse(localStorage.getItem("token") as string))
    );
  }

  useEffect(() => {
    if (location.pathname !== "/") setIsHome(false);
  }, [IsHome]);

  return (
    <div className="NavBarStyle">
      <div>
        {selectMe ? (
          <LoginBtn type="button">
            <Link to="/bang-dieu-khien">{selectMe?.user?.username}</Link>
          </LoginBtn>
        ) : (
          <LoginBtn type="button">
            <Link to="/dang-nhap">Đăng Nhập</Link>
          </LoginBtn>
        )}
      </div>
      <SecHeader>
        <div className="firstWapper">
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
