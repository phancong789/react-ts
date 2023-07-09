import IRowUserData from "./IRowUserData";
export default interface IListDataUser {
  list: IRowUserData[];
  pagination: {
    count: number;
    hasMoreItems: boolean;
    page: number;
    total: number;
    itemsPerPage: number;
  };
}
