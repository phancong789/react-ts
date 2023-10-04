import React from "react";
import styled from "styled-components";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import ControlPanelPage from "./Pages/ControlPanelPage";
import UserManagePage from "./Pages/UserManagePage";
import PrivateRoute from "./ultis/PrivateRoute";
import MapTinhThanh from "./features/TamThoi/MapTinhThanh";

const BodyFake = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  select {
    cursor: pointer;
  }
`;

function App() {
  return (
    <BodyFake>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/tintuc" element={<MapTinhThanh />} />
        <Route element={<PrivateRoute />}>
          <Route path="/bang-dieu-khien" element={<ControlPanelPage />} />
          <Route path="/he-thong-nguoi-dung" element={<UserManagePage />} />
          <Route path="/phan-loai-hoc" element={<ControlPanelPage />} />
          <Route path="/loai" element={<ControlPanelPage />} />
          <Route path="/bai-viet" element={<ControlPanelPage />} />
        </Route>
      </Routes>
    </BodyFake>
  );
}

export default App;
