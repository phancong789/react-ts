export default interface IListDataUser {
  list: {
    avatar_url?: string;
    email: string;
    id: string;
    gender: number;
    inactive: boolean;
    mobile: string;
    name: string;
    role_id: number;
    username: string;
    role: {
      code: string;
      name: string;
      meta: {
        color: string;
        "text-color": string;
      };
    };
    roles: [
      {
        code: string;
        name: string;
        meta: {
          color: string;
          "text-color": string;
        };
      }
    ];
    created_at: string;
  }[];
  pagination: {
    count: number;
    hasMoreItems: boolean;
    page: number;
    total: number;
    itemsPerPage: number;
  };
}
