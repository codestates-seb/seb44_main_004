import { UserPageType } from '../components/type';

export interface User {
  email?: string;
  introduction?: string | null;
  memberId: number;
  memberStatus?: string;
  nickname?: string;
  curations?: number;
}

export interface UpdateUserInfo {
  nickname?: string;
  introduction?: string;
}
export interface ProfileTypeProps {
  type: UserPageType;
  memberId?: number;
}
