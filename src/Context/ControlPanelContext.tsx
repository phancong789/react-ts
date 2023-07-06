import React from "react";
import axios, { AxiosError } from "axios";
import * as env from "../env";
import IUserData from "../Interface/IUserData";
import IToken from "../Interface/IToken";
import IRole from "../Interface/IRole";
import { error } from "console";
import IListDataUser from "../Interface/IListDataUser";
import { strict } from "assert";

export interface ControlPanelContextType {
  sidebarActive: boolean;
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarState: string;
  setSideBarState: React.Dispatch<React.SetStateAction<string>>;
  GetRole(token: IToken): IRole[] | undefined;
  GetUserData(): IListDataUser | undefined;
  listUser: IListDataUser | undefined;
  ChangePerPage(value: string): void;
  ChangePage(value: string): void;
  MinusOrPlusPage(value: number): void;
  Filter(inputName: string, value: string): void;
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
  let defaulturl = window.location.pathname
    .substring(1, window.location.pathname.length)
    .replaceAll("/", "-");
  const [sidebarActive, setSidebarActive] = React.useState(true);
  const [sideBarState, setSideBarState] = React.useState(defaulturl);
  const [roleData, setRoleData] = React.useState<IRole[]>();
  const [listUser, setListUser] = React.useState<IListDataUser>();
  const CreateNewUser = () => {};
  const EditUser = () => {};
  const DeleteUser = () => {};
  const GetUserData = () => {
    React.useEffect(() => {
      axios
        .get<IListDataUser>(
          env.hostName + env.apiRoute.users + "?" + env.getUserParam
        )
        .then((data) => {
          setListUser(data.data);
        })
        .catch((error: AxiosError) => {
          console.error(error.response);
        });
    }, []);
    return listUser;
  };
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
  const ChangePerPage = (value: string) => {
    env.getUserParam.set("perpage", value);

    axios
      .get<IListDataUser>(
        env.hostName + env.apiRoute.users + "?" + env.getUserParam
      )
      .then((data) => {
        setListUser(data.data);
      })
      .catch((error: AxiosError) => {
        console.error(error.response);
      });
  };

  const ChangePage = (value: string) => {
    env.getUserParam.set("page", value);

    axios
      .get<IListDataUser>(
        env.hostName + env.apiRoute.users + "?" + env.getUserParam
      )
      .then((data) => {
        setListUser(data.data);
      })
      .catch((error: AxiosError) => {
        console.error(error.response);
      });
  };

  const MinusOrPlusPage = (value: number) => {
    env.getUserParam.set(
      "page",
      String(Number(env.getUserParam.get("page")) + value)
    );

    axios
      .get<IListDataUser>(
        env.hostName + env.apiRoute.users + "?" + env.getUserParam
      )
      .then((data) => {
        setListUser(data.data);
      })
      .catch((error: AxiosError) => {
        console.error(error.response);
      });
  };

  const Filter = (inputName: string, value: string) => {
    if (value === "") {
      env.getUserParam.delete(inputName);
      axios
        .get<IListDataUser>(
          env.hostName + env.apiRoute.users + "?" + env.getUserParam
        )
        .then((data) => {
          setListUser(data.data);
        })
        .catch((error: AxiosError) => {
          console.error(error.response);
        });
    } else {
      env.getUserParam.set(inputName, value);
      axios
        .get<IListDataUser>(
          env.hostName + env.apiRoute.users + "?" + env.getUserParam
        )
        .then((data) => {
          setListUser(data.data);
        })
        .catch((error: AxiosError) => {
          console.error(error.response);
        });
    }
  };

  return (
    <ControlPanelContext.Provider
      value={{
        sidebarActive,
        setSidebarActive,
        sideBarState,
        setSideBarState,
        Filter,
        GetRole,
        listUser,
        GetUserData,
        ChangePerPage,
        MinusOrPlusPage,
        ChangePage,
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  );
}

export { ControlPanelContext };
