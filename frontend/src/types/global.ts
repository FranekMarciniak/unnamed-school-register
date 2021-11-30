export interface IUser {
  id: number | null;
  username: string;
  password: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  group_id: number;
}
export interface IGlobalState {
  errors: string;
  user: IUser;
}
export interface IFetchedUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
export interface IAdminState {
  errors?: string;
  message?: string;
  users: IFetchedUser[] | [];
}
export interface ILoginForm {
  username: string;
  password: string;
}
