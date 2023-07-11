export interface IUserLoginData {
  username: string;
  password: string;
}
export interface IUserRegisterData {
  email: string;
  password: string;
  passwordConfirm?: string;
  nickname: string;
}
export interface IUserLoginFormValid {
  username: boolean;
  password: boolean;
}
export interface IUserRegisterFormValid {
  email: boolean;
  password: boolean;
  passwordConfirm: boolean;
  nickname: boolean;
}