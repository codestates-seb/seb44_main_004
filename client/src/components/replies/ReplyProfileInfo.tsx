import tw from 'twin.macro';
import styled from 'styled-components';

import ProfileImg from '../../img/profile_img2.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { HiPencil } from 'react-icons/hi';
import { HiTrash } from 'react-icons/hi';
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
  return (
    <ProfileInfoContainer>
      <UserInfo>
        <ProfileImage>
          {/* TODO: 이미지 속성값으로 받아온다면 대체하기 */}
          <DefaultImg src={imageUrl || ProfileImg} alt="profileImg" />
        </ProfileImage>
        <Nickname>{nickname}</Nickname>
      </UserInfo>
      <ButtonZone>
        {memberId === replierId && (
          <>
            <EditButton onClick={() => handleCommentEdit(content)}>
              <HiPencil size="1.5rem" />
            </EditButton>
            <DelteButton onClick={() => handleCommentDelete(replyId)}>
              <HiTrash size="1.5rem" />
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
`;

const ProfileImage = tw.div`
  rounded-full
  w-10
  h-10
  mr-3
  mb-2
  overflow-hidd
  flex
  justify-center
`;

const DefaultImg = styled.img`
  height: inherit;
  padding-left: 0.2rem;
  object-fit: cover;
`;

const Nickname = tw.p`
    text-xl
    font-thin
    mb-2
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
