import React from "react";
import styled from "styled-components";
import HomePage from "./Compoments/HomePage";
import LoginPage from "./Compoments/LoginPage";
import { Routes, Route } from "react-router-dom";

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
      </Routes>
    </BodyFake>
  );
}

export default App;
