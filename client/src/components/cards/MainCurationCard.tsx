import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import tw from 'twin.macro';
import styled from 'styled-components';

import { AiFillHeart } from 'react-icons/ai';

import { images } from '../../utils/importImgUrl';
import { CurationProps } from '../../types/card';
import { CurationType } from '../../types';
import { RootState } from '../../store/store';
import { removeStyleAndAttributes } from '../../utils/removeImgTags';

const CurationCard = ({
  type,
  memberId,
  curationLikeCount,
  curationId,
  emoji,
  title,
  content,
  curator,
}: CurationProps) => {
  const navigate = useNavigate();
  const myId = useSelector((state: RootState) => state.user.memberId);
  const handleClick = () => {
    navigate(`/curations/${curationId}`);
  };

  const handleUserPage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (myId === memberId) {
      navigate(`/mypage`);
    } else {
      navigate(`/userpage/${memberId}`);
    }
  };
  return (
    <>
      <CardContainer onClick={handleClick} type={type}>
        <Item>{emoji}</Item>
        <Item>{title}</Item>
        <Item
          dangerouslySetInnerHTML={{
            __html: removeStyleAndAttributes(content ?? ''),
          }}
        />
        <Item>
          <ItemLeft>
            <LikeDiv>
              <AiFillHeart />
              좋아요 {curationLikeCount}개
            </LikeDiv>
          </ItemLeft>
          <ItemRight>
            <ImageDiv>
              <ProfileImg
                src={curator?.image || images.profileImg2}
                alt="curationCardProfileImage"
              />
            </ImageDiv>
            <NicknameDiv onClick={handleUserPage}>{curator?.nickname}</NicknameDiv>
          </ItemRight>
        </Item>
      </CardContainer>
    </>
  );
};

const CardContainer = styled.div<{ type?: CurationType }>`
  width: 300px;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mainPastelBlue300};
    color: white;
    > div:nth-child(3) {
      color: white;
    }
  }
  ${tw`
    flex
    flex-col
    items-center
    px-[1rem]
    py-[1rem]
    mb-[1.8rem]
    text-[0.9rem]
    rounded-[0.625rem]
    bg-[#d9e1e8]
    cursor-pointer
    justify-between
  `}
`;

const Item = styled.div`
  &:first-child {
    font-size: 1.5rem;
  }
  &:nth-child(2) {
    font-size: 0.9;
    font-weight: 600;
  }
  &:nth-child(3) {
    width: 100%;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 0.8rem;
    line-height: 1.2rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #595656;
  }
  &:nth-child(4) {
    display: flex;
    align-items: center;
  }
  &:last-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
const ItemLeft = tw.div`

`;
const ItemRight = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
`;
const LikeDiv = tw.div`
  flex
  items-center
  gap-[0.3rem]
  [> svg]:fill-[#df5858]
`;
const NicknameDiv = styled.span`
  text-align: end;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const ImageDiv = tw.div`
  rounded-full
  w-6
  h-6
  mr-2
  overflow-hidden
  flex
  justify-center
`;
const ProfileImg = styled.img`
  height: inherit;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
export default CurationCard;
