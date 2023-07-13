import { UserPageType } from '.';

export interface User {
  email?: string;
  image?: string | null;
  introduction?: string | null;
  memberId: number;
  memberStatus?: string;
  nickname?: string;
  myCuration: number;
  mySubscriber: number;
}

export interface UpdateUserInfo {
  nickname?: string;
  introduction?: string;
}
export interface ProfileTypeProps {
  type: UserPageType;
}
