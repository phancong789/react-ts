export default interface IError {
  errors?: {
    password?: [string];
    email?: [string];
    name?: [string];
    role_ids?: [string];
    username?: [string];
  };
  message: string;
  status_code: number;
}
