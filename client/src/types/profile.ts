import { UserPageType } from '.';

export interface MyProps {
  memberId: number;
  email: string;
  nickname: string;
  introduction: string | null;
  image?: string | null;
  myCuration: number;
  mySubscriber: number;
  memberStatus?: string;
}

export interface UserProps {
  memgerId: number;
  email: string;
  nickname: string;
  introduction: string | null;
  image: string | null;
  mySubscriber: number;
  myCuration: number;
  memberStatus: string;
  subscribed: boolean;
}
export interface UpdateUserInfo {
  nickname?: string;
  introduction?: string;
}
export interface ProfileTypeProps {
  type: UserPageType;
  memberId?: number;
}

export interface ProfileFormProps {
  checkNickname: (data: string) => boolean;
  selectImg: string;
  handleSelectImage: (imgURL: string) => void;
  handleFileInfo: (file: File) => void;
}
