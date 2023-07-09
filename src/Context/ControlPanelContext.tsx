import React from "react";
import axios, { AxiosError } from "axios";
import * as env from "../env";
import IToken from "../Interface/IToken";
import IRole from "../Interface/IRole";
import IListDataUser from "../Interface/IListDataUser";
import IError from "../Interface/IError";
import IRowUserData from "../Interface/IRowUserData";

export interface ControlPanelContextType {
  sidebarActive: boolean;
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarState: string;
  setSideBarState: React.Dispatch<React.SetStateAction<string>>;
  GetRole(token: IToken): IRole[] | undefined;
  GetProvince(token: IToken):
    | {
        name: string;
        id: number;
      }[]
    | undefined;
  GetKhubaoton(token: IToken):
    | {
        ten: string;
        loai_khu: string;
        id: number;
      }[]
    | undefined;
  GetUserData(): IListDataUser | undefined;
  listUser: IListDataUser | undefined;
  roleData: IRole[] | undefined;
  ChangePerPage(value: string): void;
  ChangePage(value: string): void;
  MinusOrPlusPage(value: number): void;
  Filter(inputName: string, value: string): void;
  CreateNewUser(data: any): void;
  EditUser(data: any): void;
  DeleteUser(): void;
  SortTable(value: string): void;
  errorData: IError | undefined;
  setErrorData: React.Dispatch<React.SetStateAction<IError | undefined>>;
  showAlert: boolean | undefined;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  userdata: IRowUserData | null | undefined;
  setUserData: React.Dispatch<
    React.SetStateAction<IRowUserData | null | undefined>
  >;
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
  const [sideBarState, setSideBarState] = React.useState(
    window.location.pathname
  );
  const [errorData, setErrorData] = React.useState<IError>();
  const [roleData, setRoleData] = React.useState<IRole[]>();
  const [listUser, setListUser] = React.useState<IListDataUser>();
  const [showAlert, setShowAlert] = React.useState<boolean>();
  const [province, setProvince] =
    React.useState<{ name: string; id: number }[]>();
  const [Khubaoton, setKhubaoton] =
    React.useState<{ ten: string; loai_khu: string; id: number }[]>();
  const [recall, setRecall] = React.useState<boolean>(false);
  const [userdata, setUserData] = React.useState<
    IRowUserData | null | undefined
  >();

  const CreateNewUser = (data: any) => {
    axios
      .post(env.hostName + env.apiRoute.users, data)
      .then((data) => {
        setRecall(!recall);
        setErrorData(data.data);
        setShowAlert(true);
      })
      .catch((error: AxiosError<IError>) => {
        setErrorData(error.response?.data);
        setShowAlert(true);
      });
  };

  const EditUser = (data: any) => {
    axios
      .put(env.hostName + env.apiRoute.users + "/" + userdata?.id, data)
      .then((data) => {
        setRecall(!recall);
        setErrorData(data.data);
        setShowAlert(true);
      })
      .catch((error: AxiosError<IError>) => {
        setErrorData(error.response?.data);
        setShowAlert(true);
      });
  };

  const DeleteUser = () => {
    axios
      .delete(env.hostName + env.apiRoute.users + "/" + userdata?.id)
      .then((data) => {
        setRecall(!recall);
        setErrorData(data.data);
        setShowAlert(true);
      })
      .catch((error: AxiosError<IError>) => {
        setErrorData(error.response?.data);
        setShowAlert(true);
      });
  };

  const GetUserData = () => {
    React.useEffect(() => {
      axios
        .get<IListDataUser>(
          env.hostName + env.apiRoute.users + "?" + env.getUserParam
        )
        .then((data) => {
          setListUser(data.data);
        })
        .catch((error: AxiosError<IError>) => {
          setErrorData(error.response?.data);
          setShowAlert(true);
        });
    }, [recall]);
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

  const GetProvince = (token: IToken) => {
    React.useEffect(() => {
      axios
        .get<{ name: string; id: number }[]>(
          env.hostName + env.apiRoute.provinces,
          {
            headers: {
              Authorization: token.token_type + token.access_token,
            },
          }
        )
        .then((reposn) => {
          setProvince(reposn.data);
        })
        .catch((error: AxiosError) => {
          console.error(error.response);
        });
    }, []);
    return province;
  };

  const GetKhubaoton = (token: IToken) => {
    React.useEffect(() => {
      axios
        .get<{ ten: string; loai_khu: string; id: number }[]>(
          env.hostName + env.apiRoute.khubaoton,
          {
            headers: {
              Authorization: token.token_type + token.access_token,
            },
          }
        )
        .then((reposn) => {
          setKhubaoton(reposn.data);
        })
        .catch((error: AxiosError) => {
          console.error(error.response);
        });
    }, []);
    return Khubaoton;
  };

  const ChangePerPage = (value: string) => {
    env.getUserParam.set("perpage", value);

    setRecall(!recall);
  };

  const ChangePage = (value: string) => {
    env.getUserParam.set("page", value);

    setRecall(!recall);
  };

  const MinusOrPlusPage = (value: number) => {
    env.getUserParam.set(
      "page",
      String(Number(env.getUserParam.get("page")) + value)
    );

    setRecall(!recall);
  };

  const SortTable = (value: string) => {
    env.getUserParam.set("sort", value);
    setRecall(!recall);
    if (env.getUserParam.get("sort") === "") env.getUserParam.delete("sort");
  };

  const Filter = (inputName: string, value: string) => {
    if (value === "") {
      env.getUserParam.delete(inputName);
      setRecall(!recall);
    } else {
      env.getUserParam.set(inputName, value);
      setRecall(!recall);
    }
  };

  return (
    <ControlPanelContext.Provider
      value={{
        CreateNewUser,
        showAlert,
        setShowAlert,
        EditUser,
        DeleteUser,
        userdata,
        setUserData,
        sidebarActive,
        setSidebarActive,
        sideBarState,
        setSideBarState,
        setErrorData,
        Filter,
        roleData,
        GetRole,
        SortTable,
        errorData,
        listUser,
        GetKhubaoton,
        GetProvince,
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
