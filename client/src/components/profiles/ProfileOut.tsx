import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../buttons/Button';
import { useNavigate } from 'react-router-dom';
// import { memberOutAPI } from '../../api/profileApi';
const ProfileOut = () => {
  const myInfo = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  //   const handleOut = async () => {
  //     const response = await memberOutAPI();
  //     if (response?.status === 204) {
  //     }
  //   };
  const handleBack = () => {
    navigate('/mypage');
  };
  return (
    <ProfileOutContainer>
      <Info>
        <Point>{myInfo.nickname} </Point> 회원님,
      </Info>
      <Info>
        <Point>{myInfo.myCuration}</Point> 개의 큐레이션을 작성하셨고,
      </Info>
      <Info>
        <Point>{myInfo.mySubscriber}</Point> 명의 구독자를 보유하고 계세요.
      </Info>
      <Info>최고의 큐레이터가 되는 것을 포기하시겠어요?</Info>
      <ButtonZone>
        <Button type="detail" content="포기하고 탈퇴하기" width="10rem" />
        <Button type="detail" content="포기하지 않고 도전하기" width="10rem" onClick={handleBack} />
      </ButtonZone>
    </ProfileOutContainer>
  );
};

const ProfileOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Point = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mainLogoColor};
  padding-right: 1rem;
`;
const Info = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 1.5rem;

  margin: 1rem;
  &:nth-last-child(2) {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
`;

const ButtonZone = styled.div`
  gap: 5rem;
  display: flex;
  > button:first-child {
    &:hover {
      background-color: black;
      color: white;
    }
  }
  > button:last-child {
    background-color: black;
    color: white;
    &:hover {
    }
  }
`;
export default ProfileOut;
