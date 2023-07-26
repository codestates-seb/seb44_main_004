import tw from 'twin.macro';
import styled from 'styled-components';

import ProfileImg from '../../img/profile_img2.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { HiPencil } from 'react-icons/hi';
import { HiTrash } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
interface ReplyProfileInfoProp {
  replierId: number;
  replyId: number;
  nickname: string;
  imageUrl?: string | null;
  content: string;
  handleCommentEdit: (content: string) => void;
  handleCommentDelete: (replyId: number) => void;
}
const ReplyProfileInfo = ({
  replierId,
  replyId,
  nickname,
  imageUrl,
  content,
  handleCommentEdit,
  handleCommentDelete,
}: ReplyProfileInfoProp) => {
  const { memberId } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const handleClickNickname = () => {
    navigate(`/userpage/${replierId}`);
  };
  return (
    <ProfileInfoContainer>
      <UserInfo>
        <ProfileImage>
          <DefaultImg src={imageUrl || ProfileImg} alt="profileImg" />
        </ProfileImage>
        <Nickname onClick={handleClickNickname}>{nickname}</Nickname>
      </UserInfo>
      <ButtonZone>
        {memberId === replierId && (
          <>
            <EditButton onClick={() => handleCommentEdit(content)}>
              <HiPencil size="1.3rem" />
            </EditButton>
            <DelteButton onClick={() => handleCommentDelete(replyId)}>
              <HiTrash size="1.3rem" />
            </DelteButton>
          </>
        )}
      </ButtonZone>
    </ProfileInfoContainer>
  );
};
export default ReplyProfileInfo;

const ProfileInfoContainer = tw.section`
    w-full
    flex
    justify-between
`;

const UserInfo = tw.div`
    flex
    items-center
    mb-2
`;

const ProfileImage = tw.div`
  rounded-full
  w-8
  h-8
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
    text-lg
    font-thin
`;
const ButtonZone = tw.div`
    flex
    gap-[1rem]
`;
const EditButton = tw.button`
    cursor-pointer
`;
const DelteButton = tw.button`
    cursor-pointer
`;
