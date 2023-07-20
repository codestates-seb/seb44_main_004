import { IUserInfo } from './user';
import { UserPageType } from '.';

export interface ICurationResponseData {
  memberId: number;
  curationId: number;
  title: string;
  content: string;
  emoji: string;
  curationLikeCount: number;
  curator: IUserInfo;
  createdAt: string;
  updatedAt: string;
}

export interface ICuratorResponseData {
  email: string;
  introduction: string;
  memberId: number;
  nickname: string;
}

export interface CurationCardProps {
  type?: UserPageType | undefined;
  totalPage: number;
  page: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}