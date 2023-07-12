import tw from 'twin.macro';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { CurationType } from '../../types';
import { Curation } from '../../types/card';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const CurationCard = ({
  type,
  emoji,
  title,
  content,
  like,
  nickname,
  memberId,
  curationId,
}: Curation) => {
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
    <CardContainer onClick={handleClick} type={type}>
      <Item>{emoji}</Item>
      <Item>{title}</Item>
      <Item>{content}</Item>
      <Item>
        <LikeDiv>
          <AiFillHeart />
          좋아요 {like}개
        </LikeDiv>
        <NicknameDiv onClick={handleUserPage}>{nickname}</NicknameDiv>
      </Item>
    </CardContainer>
  );
};

const CardContainer = styled.div<Curation>`
  ${tw`
    flex
    flex-col
    items-center
    px-[1.3rem]
    py-[1rem]
    mb-[1.8rem]
    text-[0.8vw]
    rounded-[0.625rem]
    bg-[#d9e1e8]
    cursor-pointer
  `}
  width: ${(props) =>
    props.type === CurationType.MYPAGE ? `calc(50% - 1rem)` : `calc(33.33% - 1rem)`};
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.mainPastelBlue300};
    color: white;
    > div:nth-child(3) {
      color: white;
    }
  }
`;
const Item = styled.div`
  margin: 0.5rem 0;

  &:first-child {
    font-size: 1.3vw;
  }
  &:nth-child(2) {
    font-size: 1vw;
    font-weight: 600;
  }
  &:nth-child(3) {
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
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
    margin-top: 1rem;
  }
`;

const LikeDiv = tw.div`
  flex
  items-center
  gap-[0.3rem]
`;
const NicknameDiv = tw.div`
  font-semibold
`;

export default CurationCard;
