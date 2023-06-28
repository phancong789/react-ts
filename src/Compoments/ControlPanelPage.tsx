import React from "react";
import { useNavigate } from "react-router-dom";
import * as env from "../env";
import axios from "axios";
import IToken from "../Interface/IToken";

export default function ControlPanelPage() {
  const tokenString: string | null = sessionStorage.getItem("token");
  const tokenJosn: IToken = tokenString && JSON.parse(tokenString);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!tokenJosn) {
      return navigate("/dang-nhap");
    } else {
      axios
        .get(env.hostName + env.apiRoute.me, {
          headers: {
            Authorization: tokenJosn.token_type + tokenJosn.access_token,
          },
        })
        .then((x) => {
          if (x.statusText !== "OK") return navigate("/dang-nhap");
        });
    }
  });

  return <div></div>;
}
