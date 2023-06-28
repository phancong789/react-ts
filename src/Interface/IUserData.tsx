export default interface IUserData {
  user: {
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
        code: string;
        "text-color": string;
      };
      roles: [
        {
          code: string;
          name: string;
          meta: {
            code: string;
            "text-color": string;
          };
        }
      ];
    };
  };
}
