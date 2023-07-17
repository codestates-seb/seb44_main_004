import tw from 'twin.macro';
import styled from 'styled-components';

import Button from '../buttons/Button';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { axiosInstance } from '../../api/axios';
interface CurationDetailInfoProps {
  isLike: boolean;
  setIsLike: (data: boolean) => void;
  curationLikeCount: number | undefined;
  curatorId: number | undefined;
  curationId: string | undefined;
}
type likeDeleteProps = {
  memberId: number | undefined;
  curationId: string | undefined;
};
const CurationDetailInfo = ({
  isLike,
  setIsLike,
  curationLikeCount,
  curatorId,
  curationId,
}: CurationDetailInfoProps) => {
  const token = localStorage.getItem('Authorization');

  const handleLike = async () => {
    if (token) {
      const response = await axiosInstance.post(`/curations/${curationId}/like`);
      if (response.status === 200) {
        setIsLike(!isLike);
      }
    } else {
      alert('좋아요 기능은 로그인 후에 가능합니다.');
      window.location.href = '/login';
    }
  };
  const handleCancelLike = async () => {
    const data: likeDeleteProps = {
      memberId: curatorId,
      curationId,
    };
    const response = await axiosInstance.delete(`curations/${curationId}/like`, { data });
    console.log(response);
    if (response.status === 204) {
      setIsLike(!isLike);
    }
  };

  return (
    <DetailInfoContainer>
      <UserInfo>
        <Category>
          <Button type="category" content="시/에세이" />
        </Category>
        {isLike ? (
          <LikeButton onClick={handleCancelLike}>
            <AiFillHeart size="2rem" />
          </LikeButton>
        ) : (
          <LikeButton onClick={handleLike}>
            <AiOutlineHeart size="2rem" />
          </LikeButton>
        )}
        좋아요 {curationLikeCount}개
      </UserInfo>
    </DetailInfoContainer>
  );
};

export default CurationDetailInfo;

const DetailInfoContainer = tw.section`
    w-full
    flex
    justify-between
    flex-grow
    items-center
`;

const UserInfo = tw.div`
    flex
    items-center
`;

const Category = styled.div`
  ${tw`
        rounded-full
        w-10
        h-10
        mr-24
    `}
`;

const LikeButton = styled.button`
  outline: none;
  background-color: transparent;
  margin-right: 1rem;

  > svg {
    fill: #fd8f8f;
  }
`;
