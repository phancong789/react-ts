import React from "react";
import IToken from "../Interface/IToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as env from "../env";
import IUserData from "../Interface/IUserData";

export interface UserContextType {
  getToken(): IToken;
  Login(data?: any): void;
  errorData: IError | undefined;
  show: boolean;
  Logout(): void;
  CheckLogin(navigateToLogin?: boolean): IUserData | void;
  userdata: IUserData | undefined;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContext = React.createContext<UserContextType | null>(
  {} as UserContextType
);

const setToken = (data: object) => {
  sessionStorage.setItem("token", JSON.stringify(data));
};

const getToken = (): IToken => {
  const tokenData: IToken = JSON.parse(
    sessionStorage.getItem("token") || `{"Error":"chưa có token"}`
  );
  return tokenData;
};

interface IError {
  errors?: {
    password?: [string];
  };
  message: string;
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [validated, setValidated] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [errorData, setErrorData] = React.useState<IError>();
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const [userdata, setUserData] = React.useState<IUserData>();

  const Login = (data?: any) => {
    axios
      .post<IToken>(env.hostName + env.apiRoute.webAuthenticate, data)
      .then((x) => {
        if (x.status === 200) {
          setToken(x.data);
          setLogin(true);
          navigate("/bang-dieu-khien");
        }
      })
      .catch((error) => {
        setErrorData(error.response.data);
        setShow(true);
      });
  };

  const Logout = () => {
    axios
      .post<IToken>(env.hostName + env.apiRoute.logout, {
        headers: {
          Authorization: getToken().token_type + getToken().access_token,
        },
      })
      .then((x) => {
        sessionStorage.removeItem("token");
        setLogin(false);
        setUserData({} as IUserData);
        navigate("/");
      })
      .catch((error) => {
        sessionStorage.removeItem("token");
        setLogin(false);
        setUserData({} as IUserData);
        navigate("/");
      });
  };

  const CheckLogin = (navigateToLogin?: boolean): IUserData | void => {
    const navigate = useNavigate();
    React.useEffect(() => {
      if (getToken().Error) {
        if (navigateToLogin) return navigate("/dang-nhap");
      } else {
        axios
          .get<IUserData>(env.hostName + env.apiRoute.me, {
            headers: {
              Authorization: getToken().token_type + getToken().access_token,
            },
          })
          .then((x) => {
            if (x.statusText !== "OK" && navigateToLogin)
              return navigate("/dang-nhap");
            setUserData(x.data);
          })
          .catch((error) => console.error(error));
      }
    }, [login]);
    return userdata;
  };

  return (
    <UserContext.Provider
      value={{
        validated,
        getToken,
        Login,
        errorData,
        show,
        userdata,
        Logout,
        setShow,
        CheckLogin,
        setValidated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
