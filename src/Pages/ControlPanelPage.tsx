import React from "react";
import { useNavigate } from "react-router-dom";
import * as env from "../env";
import axios from "axios";
import IToken from "../Interface/IToken";
import TopBar from "../Compoments/ControlPanelPage/TopBar";
import { UserContext } from "../Context/UserContext";

export default function ControlPanelPage() {
  const usechecklogin = React.useContext(UserContext);
  usechecklogin?.CheckLogin(true);
  return (
    <>
      <TopBar />
    </>
  );
}
