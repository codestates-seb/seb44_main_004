import { CurationType, UserPageType } from '.';

export interface CurationProps {
  type?: CurationType;
  memberId?: number;
  memberNickname?: string;
  curationLikeCount: number;
  curationId?: number;
  emoji: string;
  title: string;
  content: string;
  image?: string | null;
  memberImageUrl?: string | null;
}

export interface CuratorProps {
  memberId: number;
  email: string;
  nickname: string;
  introduction: string | null;
  image?: string | null;
  mySubscriber: number;
  myCuration: number;
  memberStatus: string;
}

export interface ProfileCardProps {
  type?: UserPageType | undefined;
  curations?: Array<CurationProps>;
  curators?: Array<CuratorProps>;
  totalPage: number;
  page: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}
