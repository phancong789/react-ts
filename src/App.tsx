import React from "react";
import styled from "styled-components";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import ControlPanelPage from "./Pages/ControlPanelPage";
import UserContextProvider from "./Context/UserContext";
const Wapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
`;

const TopTitle = styled.div`
  padding: 10px;
  margin: 0 10px;
  border-bottom: 2px solid white;
  color: white;
  font-size: 2.3rem;
  text-align: center;
`;

const BodyFake = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <BodyFake>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/bang-dieu-khien" element={<ControlPanelPage />} />
        </Routes>
      </UserContextProvider>
    </BodyFake>
  );
}

export default App;
