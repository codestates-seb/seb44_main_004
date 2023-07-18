import { useState } from 'react';
import { useSelector } from 'react-redux';

import tw from 'twin.macro';
import styled from 'styled-components';
import { images } from '../../utils/importImgUrl';
import Modal from '../modals/Modal';
import Button from '../buttons/Button';

import { RootState } from '../../store/store';
import { ModalType } from '../../types';
import { postSubscribeAPI, deleteSubscribeAPI } from '../../api/profileApi';
import { useNavigate } from 'react-router-dom';

interface CuratorProps {
  curator?: string;
  curatorId: number | undefined;
  isSubscribe: boolean | undefined;
  setIsSubscribe: (data: boolean) => void;
}

const CurationProfileInfo: React.FC<CuratorProps> = ({
  curator,
  curatorId,
  isSubscribe,
  setIsSubscribe,
}) => {
  const [isModal, setIsModal] = useState<boolean>();

  const { memberId } = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem('Authorization');
  const navigate = useNavigate();

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleSubscribe = async () => {
    if (token) {
      const response = await postSubscribeAPI(Number(curatorId));
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
    const response = await deleteSubscribeAPI(Number(curatorId));
    if (response?.status === 204) {
      handleModal();
      setIsSubscribe(!isSubscribe);
    } else {
      alert('이미 구독을 취소한 상태입니다.');
      handleModal();
    }
  };
  return (
    <ProfileInfoContainer>
      {isModal && (
        <Modal
          type={ModalType.SUBSCRIBE}
          handleCloseModal={handleModal}
          handleCancelSubscribe={handleCancelSubscribe}
          nickname={curator}
        />
      )}
      <ProfileInfoLeft>
        <UserInfo>
          <ProfileImage>
            <DefaultImg src={images.profileImg2} alt="profileImg" />
          </ProfileImage>
          <Nickname>{curator}</Nickname>
          {memberId !== curatorId && (
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
      </ProfileInfoLeft>
    </ProfileInfoContainer>
  );
};
export default CurationProfileInfo;

const ProfileInfoContainer = tw.section`
    w-full
    flex
    justify-between
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
        w-8
        h-8
        mr-5
    `}
`;

const DefaultImg = styled.img`
  height: inherit;
  padding-left: 1rem;
`;

const Nickname = tw.p`
    text-lg
    font-thin
    mr-3
`;
