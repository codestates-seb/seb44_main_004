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
export interface IUserInfo {
  memberId: number;
  email: string;
  nickname?: string;
  introduction?: string;
  memberStatus?: string;
}

export interface ICuratorInfo {
  memberId: number | string;
  profileImg: string;
  nickname: string;
  subscribers: number;
}
