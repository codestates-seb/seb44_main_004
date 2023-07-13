import { CurationType } from '.';

export interface Curation {
  type?: CurationType;
  emoji?: string;
  title?: string;
  content?: string;
  like?: number;
  nickname?: string;
  memberId?: number;
  curationId?: number;
  createdAt?: string;
  updatedAt?: string;
  visibility?: null | string;
}
export interface Curator {
  nickname?: string;
  subscribers?: number;
  curations?: number;
  introduction?: string | null;
  memberId?: number;
}
