import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import tw from 'twin.macro';
import styled from 'styled-components';

import Button from '../buttons/Button';
import Modal from '../modals/Modal';
import ProfileImg from '../../img/profile_img2.png';

import { ModalType, UserPageType } from '../../types';
import { UserProps, ProfileTypeProps, MyProps } from '../../types/profile';
import {
  getUserInfoAPI,
  postSubscribeAPI,
  deleteSubscribeAPI,
  getMyInfoAPI,
} from '../../api/profileApi';

const ProfileInfo = ({ type }: ProfileTypeProps) => {
  const [myInfo, setMyInfo] = useState<MyProps>();
  const [userInfo, setUserInfo] = useState<UserProps>();
  const [isSubscribe, setIsSubscribe] = useState<boolean>();
  const [isModal, setIsModal] = useState<boolean>(false);

  const { memberId } = useParams();

  const token = localStorage.getItem('Authorization');

  const navigate = useNavigate();

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleSubscribe = async () => {
    if (token) {
      const response = await postSubscribeAPI(Number(memberId));
      if (response?.status === 201) {
        setIsSubscribe(!isSubscribe);
      }
    } else {
      alert('구독기능은 로그인 후에 가능합니다.');
      navigate('/login');
    }
  };

  const handleSubscribing = () => {
    handleModal();
  };

  const handleCancelSubscribe = async () => {
    const response = await deleteSubscribeAPI(Number(memberId));
    if (response?.status === 204) {
      handleModal();
      setIsSubscribe(!isSubscribe);
    } else {
      alert('이미 구독을 취소한 상태입니다.');
      handleModal();
    }
  };

  const handleGetMyInfo = async () => {
    const response = await getMyInfoAPI();
    if (response) {
      setMyInfo(response.data);
    }
  };

  const handleGetUserInfo = async () => {
    const response = await getUserInfoAPI(Number(memberId));
    if (response) {
      setUserInfo(response.data);
      setIsSubscribe(response.data.subscribed);
    }
  };

  useEffect(() => {
    if (type === UserPageType.USERPAGE) {
      handleGetUserInfo();
    } else {
      handleGetMyInfo();
    }
  }, [isSubscribe]);

  return (
    <ProfileInfoContainer>
      {isModal && (
        <Modal
          type={ModalType.SUBSCRIBE}
          handleCloseModal={handleModal}
          handleCancelSubscribe={handleCancelSubscribe}
          nickname={userInfo?.nickname}
        />
      )}

      <ProfileInfoLeft>
        <UserInfo>
          {/* 프로필 이미지가 있는 경우 */}
          <ProfileImage>
            <DefaultImg src={ProfileImg} alt="profileImg" />
          </ProfileImage>

          <Nickname>
            {type === UserPageType.MYPAGE ? myInfo?.nickname : userInfo?.nickname}
          </Nickname>

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

        <UserIntroduce>
          {(type === UserPageType.MYPAGE ? myInfo?.introduction : userInfo?.introduction) ||
            '아직 소개글이 없습니다.'}
        </UserIntroduce>
      </ProfileInfoLeft>

      <ProfileInfoRight>
        <MyButton>
          <p>{type === UserPageType.MYPAGE ? `MY` : `${userInfo?.nickname} 님의 `}구독자</p>
          <p>{type === UserPageType.MYPAGE ? myInfo?.mySubscriber : userInfo?.mySubscriber} 명</p>
        </MyButton>
        <MyButton>
          <p>{type === UserPageType.MYPAGE ? `MY` : `${userInfo?.nickname} 님의 `}큐레이션</p>
          <p>{type === UserPageType.MYPAGE ? myInfo?.myCuration : userInfo?.myCuration}개</p>
        </MyButton>
      </ProfileInfoRight>
    </ProfileInfoContainer>
  );
};

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
const ProfileImage = tw.div`
  rounded-full
  w-10
  h-10
  mr-3
  overflow-hidden
  flex
  justify-center
  border-solid border-[1px] border-gray-300
`;
const DefaultImg = styled.img`
  height: inherit;
  object-fit: cover;
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
  min-width: 10rem;
  max-width: 15rem;
  > p {
    line-height: 1.2rem;
  }
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

    text-center
    py-4
    px-4
    rounded-2xl
    text-white
  `}
`;
export default ProfileInfo;
