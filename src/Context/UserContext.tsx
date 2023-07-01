import React from "react";
import IToken from "../Interface/IToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as env from "../env";

export interface AutherUser {
  username: string;
  password: string;
}

export interface UserContextType {
  User: AutherUser | null;
  setUser: React.Dispatch<React.SetStateAction<AutherUser | null>>;
  useToken(): IToken;
  Login(data?: any): object;
  errorData: IError | undefined;
  show: boolean;
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

const useToken = (): IToken => {
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
  const [User, setUser] = React.useState<AutherUser | null>({} as AutherUser);
  const [validated, setValidated] = React.useState(false);
  const [errorData, setErrorData] = React.useState<IError>();
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const Login = (data?: any): object => {
    axios
      .post<IToken>(env.hostName + env.apiRoute.webAuthenticate, data)
      .then((x) => {
        if (x.status === 200) {
          setToken(x.data);
          navigate("/bang-dieu-khien");
        }
      })
      .catch((error) => {
        setErrorData(error.response.data);
        setShow(true);
      });
    return { validated, setValidated, errorData, show };
  };

  return (
    <UserContext.Provider
      value={{
        User,
        setUser,
        validated,
        useToken,
        Login,
        errorData,
        show,
        setShow,
        setValidated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
