import { IUserInfo } from './user';

export interface ICurationResponseData {
  curationId: number;
  title: string;
  content: string;
  emoji: string;
  like: number;
  curator: IUserInfo;
  createdAt: string;
  updatedAt: string;
}
