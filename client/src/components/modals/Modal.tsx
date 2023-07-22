import tw from 'twin.macro';
import { MdOutlineClose } from 'react-icons/md';

import Button from '../buttons/Button';
import { ModalType } from '../../types';

interface ModalProps {
  type?: ModalType;
  handleCloseModal: () => void;
  handleCancelSubscribe?: () => void;
  handleCompleteCommentDelete?: () => void;
  nickname?: string;
}
const Modal = ({
  type,
  handleCloseModal,
  handleCancelSubscribe,
  handleCompleteCommentDelete,
  nickname,
}: ModalProps) => {
  const title: Array<string> = [
    '후즈북의 큐레이터가 되신것을 환영합니다!',
    `${nickname}님의 큐레이션 구독을 취소하시겠어요?`,
    `댓글을 정말 삭제하시겠습니까?`,
  ];
  const renderingModal = () => {
    switch (type) {
      case ModalType.WELCOME:
        return (
          <>
            <ModalTitle>{title[0]}</ModalTitle>
            <ButtonZone>
              <Button type="primary" content="반가워요" onClick={handleCloseModal} />
            </ButtonZone>
          </>
        );
        break;
      case ModalType.SUBSCRIBE:
        return (
          <>
            <ModalTitle>{title[1]}</ModalTitle>
            <ButtonZone>
              <Button
                type="cancel"
                content="구독취소"
                onClick={handleCancelSubscribe}
                width="calc(30%-0.5rem)"
              />
              <Button
                type="basic"
                content="닫기"
                onClick={handleCloseModal}
                width="calc(40%-0.5rem)"
              />
            </ButtonZone>
          </>
        );
        break;
      case ModalType.REPLY:
        return (
          <>
            <ModalTitle>{title[2]}</ModalTitle>
            <ButtonZone>
              <Button
                type="cancel"
                content="삭제"
                onClick={handleCompleteCommentDelete}
                width="calc(30%-0.5rem)"
              />
              <Button
                type="basic"
                content="닫기"
                onClick={handleCloseModal}
                width="calc(40%-0.5rem)"
              />
            </ButtonZone>
          </>
        );
    }
  };
  return (
    <ModalBackdrop>
      <ModalView>
        <CloseBtn onClick={handleCloseModal}>
          <MdOutlineClose size="1.2rem" />
        </CloseBtn>
        {renderingModal()}
      </ModalView>
    </ModalBackdrop>
  );
};

export default Modal;

const ModalBackdrop = tw.div`
  w-full
  h-full
  fixed
  z-30
  fixed
  inset-x-0
  inset-y-0
  flex
  justify-center
  items-center
  bg-black/50
`;
const ModalView = tw.div`
    w-1/3
    h-1/3

    bg-white
    rounded-lg
    p-6

    flex
    flex-col
    justify-between
    items-center

    mx-auto
    my-0
`;

const CloseBtn = tw.button`
    ml-auto
    bg-transparent
`;

const ModalTitle = tw.div`
    text-xl
    text-center
    mb-5
    font-medium

`;
const ButtonZone = tw.div`
    flex
    gap-12
    justify-center
`;
