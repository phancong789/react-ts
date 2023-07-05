import React from "react";
import axios, { AxiosError } from "axios";
import * as env from "../env";
import IUserData from "../Interface/IUserData";
import IToken from "../Interface/IToken";
import IRole from "../Interface/IRole";

export interface ControlPanelContextType {
  sidebarActive: boolean;
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarState: string;
  setSideBarState: React.Dispatch<React.SetStateAction<string>>;
  GetRole(token: IToken): IRole[] | undefined;
}

export interface ControlPanelContextProviderProps {
  children: React.ReactNode;
}

const ControlPanelContext = React.createContext<ControlPanelContextType | null>(
  null
);

export default function ControlPanelContextProvider({
  children,
}: ControlPanelContextProviderProps) {
  const [sidebarActive, setSidebarActive] = React.useState(true);
  const [sideBarState, setSideBarState] = React.useState("bang-dieu-khien");
  const [roleData, setRoleData] = React.useState<IRole[]>();
  const CreateNewUser = () => {};
  const EditUser = () => {};
  const DeleteUser = () => {};
  const GetUserData = () => {};
  const GetRole = (token: IToken) => {
    React.useEffect(() => {
      axios
        .get<IRole[]>(env.hostName + env.apiRoute.role, {
          headers: {
            Authorization: token.token_type + token.access_token,
          },
        })
        .then((reposn) => {
          setRoleData(reposn.data);
        })
        .catch((error: AxiosError) => {
          console.error(error.response);
        });
    }, []);
    return roleData;
  };

  return (
    <ControlPanelContext.Provider
      value={{
        sidebarActive,
        setSidebarActive,
        sideBarState,
        setSideBarState,
        GetRole,
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  );
}

export { ControlPanelContext };
