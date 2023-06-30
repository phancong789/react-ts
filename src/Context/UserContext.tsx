import React from "react";
import IToken from "../Interface/IToken";
import axios from "axios";

export interface AutherUser {
  username: string;
  password: string;
}

export interface UserContextType {
  User: AutherUser | null;
  setUser: React.Dispatch<React.SetStateAction<AutherUser | null>>;
  setToken(data: object): void;
  useToken(): IToken;
  Login(): void;
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

const Login = (
  url: string,
  data?: any,
  header?: object,
  Navigate: boolean
): void => {
  axios
    .post<IToken>(url, data)
    .then((x) => {
      if (x.status === 200) {
        if (Navigate) navigate("/bang-dieu-khien");
      }
    })
    .catch((error) => {
      setErrorData(error.response.data);
      setShow(true);
    });
};

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [User, setUser] = React.useState<AutherUser | null>({} as AutherUser);
  console.log(User);
  return (
    <UserContext.Provider value={{ User, setUser, setToken, useToken, Login }}>
      {children}
    </UserContext.Provider>
  );
}
