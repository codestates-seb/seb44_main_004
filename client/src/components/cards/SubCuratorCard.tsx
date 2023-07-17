import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import tw from 'twin.macro';
import styled from 'styled-components';

import { BsPersonCircle } from 'react-icons/bs';

import { CuratorProps } from '../../types/card';
import { RootState } from '../../store/store';

const SubCuratorCard = ({
  memberId,
  nickname,
  mySubscriber,
  myCuration,
  introduction,
}: CuratorProps) => {
  const navigate = useNavigate();
  const myId = useSelector((state: RootState) => state.user.memberId);

  const handleUserPage = () => {
    if (myId === memberId) {
      navigate(`/mypage`);
    } else {
      navigate(`/userpage/${memberId}`);
    }
  };

  return (
    <CuratorContainer onClick={handleUserPage}>
      <CuratorLeft>
        <BsPersonCircle size="3rem" />
      </CuratorLeft>

      <CuratorRight>
        <UserNickname>{nickname}</UserNickname>
        <UserInfo id="subscribers">구독자 {mySubscriber} 명</UserInfo>
        <UserInfo>작성한 큐레이션 {myCuration}개</UserInfo>
        <CuratorIntro id="introduce">{introduction}</CuratorIntro>
      </CuratorRight>
    </CuratorContainer>
  );
};

const CuratorContainer = styled.div`
  width: calc(50% - 1rem);
  height: 8rem;
  display: flex;
  align-items: center;
  padding: 1.3rem;
  margin: 1rem 0;
  border-radius: 0.625rem;
  background-color: #d9e1e8;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mainPastelBlue300};
    color: white;

    div#introduce {
      color: white;
    }
    div#subscribers {
      border-color: white;
    }
  }
  svg {
    display: flex;
    align-items: center;
  }
`;
const CuratorLeft = tw.div`
    mr-8
`;
const CuratorRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > div:last-child {
    margin-right: auto;
  }
`;
const UserNickname = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  @media (max-width: 1000px) {
    font-weight: 600;
  }
`;
const UserInfo = styled.div`
  font-size: 0.5rem;
`;
const CuratorIntro = styled.div`
  font-size: 0.5rem;
  color: #595656;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export default SubCuratorCard;
