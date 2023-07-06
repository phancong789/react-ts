import React from "react";
import styled from "styled-components";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import ControlPanelPage from "./Pages/ControlPanelPage";
import UserContextProvider from "./Context/UserContext";
import ControlPanelContextProvider from "./Context/ControlPanelContext";
import UserManagePage from "./Pages/UserManagePage";
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
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
        </Routes>
        <ControlPanelContextProvider>
          <Routes>
            <Route path="/bang-dieu-khien" element={<ControlPanelPage />} />
            <Route path="/he-thong/nguoi-dung" element={<UserManagePage />} />
            <Route path="/phan-loai-hoc" element={<ControlPanelPage />} />
            <Route path="/loai" element={<ControlPanelPage />} />
            <Route path="/bai-viet" element={<ControlPanelPage />} />
          </Routes>
        </ControlPanelContextProvider>
      </UserContextProvider>
    </BodyFake>
  );
}

export default App;
