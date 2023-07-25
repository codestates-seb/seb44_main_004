import { UserPageType } from '.';
import { CuratorProps } from './card';

export interface ICurationResponseData {
  memberId: number;
  categoryId: number;
  curationId?: number;
  title: string;
  content: string;
  emoji: string;
  curationLikeCount: number;
  createdAt: string;
  updatedAt: string;
  curator: CuratorProps;
}

export interface ICuratorResponseData {
  email: string;
  introduction: string;
  memberId: number;
  nickname: string;
  categoryId: string;
}

export interface CurationCardProps {
  type?: UserPageType | undefined;
  totalPage: number;
  page: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}
