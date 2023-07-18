import { IUserInfo } from './user';

export interface ICurationResponseData {
  curationId: number;
  title: string;
  content: string;
  emoji: string;
  curationLikeCount: number;
  curator: IUserInfo;
  createdAt: string;
  updatedAt: string;
}
