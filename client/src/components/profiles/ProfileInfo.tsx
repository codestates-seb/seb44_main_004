import { useState, useEffect } from 'react';

import tw from 'twin.macro';
import styled from 'styled-components';

import Button from '../buttons/Button';
import Modal from '../modals/Modal';
import ProfileImg from '../../img/profile_img2.png';

import { User } from '../../types/profile';
import { ProfileTypeProps } from '../../types/profile';
import { ModalType, UserPageType } from '../../types';

import { getUserInfoAPI, postSubscribeAPI, deleteSubscribeAPI } from '../../api/profileApi';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ProfileInfo = ({ type }: ProfileTypeProps) => {
  const [user, setUser] = useState<User>();
  const [isSubscribe, setIsSubscribe] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean>(false);

  const my = useSelector((state: RootState) => state.user);
  const { memberId } = useParams();
  const token = localStorage.getItem('Authorization');

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleSubscribe = async () => {
    if (token) {
      const response = await postSubscribeAPI(Number(memberId));
      setIsSubscribe(!isSubscribe);
    } else {
      alert('구독기능은 로그인 후에 가능합니다.');
      window.location.href = '/login';
    }
  };

  const handleSubscribing = () => {
    handleModal();
  };

  const handleCancelSubscribe = async () => {
    const response = await deleteSubscribeAPI(Number(memberId));
    console.log(response);
    if (response && response.status === 204) {
      handleModal();
      setIsSubscribe(!isSubscribe);
    } else {
      alert('이미 구독을 취소한 상태입니다.');
    }
  };

  const handleGetUserInfo = async () => {
    //TODO: 프로필 이미지 받아와 저장하기
    const response = await getUserInfoAPI();
    if (response) {
      console.log(response);
      const userInfo = {
        email: response.data.email,
        introduction: response.data.introduction,
        memberId: response.data.memberId,
        memberStatus: response.data.memberStatus,
        nickname: response.data.nickname,
        // curations: response.data.curations.length,
      };
      setUser(userInfo);
    }
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  return (
    <ProfileInfoContainer>
      {isModal && (
        <Modal
          type={ModalType.SUBSCRIBE}
          handleCloseModal={handleModal}
          handleCancelSubscribe={handleCancelSubscribe}
        />
      )}

      <ProfileInfoLeft>
        <UserInfo>
          {/* 프로필 이미지가 있는 경우 */}
          <ProfileImage>
            <DefaultImg src={ProfileImg} alt="profileImg" />
          </ProfileImage>

          {/* <Nickname>{my.nickname}</Nickname> */}
          <Nickname>{user?.nickname}</Nickname>

          {/* 타 유저일 경우 */}
          {type === UserPageType.USERPAGE && (
            <>
              {isSubscribe ? (
                <Button
                  type="subscribe"
                  content="구독중"
                  width="5rem"
                  isSubscribed
                  onClick={handleSubscribing}
                />
              ) : (
                <Button
                  type="subscribe"
                  content="구독하기"
                  width="5rem"
                  onClick={handleSubscribe}
                />
              )}
            </>
          )}
        </UserInfo>

        {/* <UserIntroduce>{my.introduction || '아직 소개글이 없습니다.'}</UserIntroduce> */}
        <UserIntroduce>{user?.introduction || '아직 소개글이 없습니다.'}</UserIntroduce>
      </ProfileInfoLeft>

      <ProfileInfoRight>
        <MyButton>
          <p>MY 구독자</p>
          <p>50명</p>
        </MyButton>
        <MyButton>
          <p>MY 큐레이션</p>
          <p>{user?.curations}개</p>
        </MyButton>
      </ProfileInfoRight>
    </ProfileInfoContainer>
  );
};
export default ProfileInfo;

const ProfileInfoContainer = tw.section`
    w-full
    flex
    justify-between
    py-10
    border-b-2
    border-solid
    border-gray-300
    gap-[3rem]
`;

const ProfileInfoLeft = styled.div`
  > div {
    margin: 1rem 0;
  }
`;

const UserInfo = tw.div`
    flex
    items-center
`;
const ProfileImage = styled.div`
  ${tw`
        rounded-full
        w-10
        h-10
        mr-3
    `}
`;
const DefaultImg = styled.img`
  height: inherit;
  padding-left: 0.2rem;
`;
const Nickname = tw.p`
    text-3xl
    font-semibold
    mr-3
`;
const UserIntroduce = tw.div`
    leading-6
`;
const ProfileInfoRight = styled.div`
  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 0.5rem;
  }
  ${tw`
        flex
        items-center
        gap-8
    `}
`;

const MyButton = styled.div`
  background-color: ${({ theme }) => theme.colors.mainBlueGreen};

  > p:first-child {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  > p:last-child {
    font-size: 1rem;
  }

  &:hover {
  }
  ${tw`
        w-32
        text-center
        py-3
        px-4
        rounded-2xl
        text-white
    `}
`;
