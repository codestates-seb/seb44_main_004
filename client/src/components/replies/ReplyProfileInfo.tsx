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
  content: string;
  handleCommentEdit: (content: string) => void;
  handleCommentDelete: (replyId: number) => void;
}
const ReplyProfileInfo = ({
  replierId,
  replyId,
  content,
  handleCommentEdit,
  handleCommentDelete,
}: ReplyProfileInfoProp) => {
  const { memberId } = useSelector((state: RootState) => state.user);
  return (
    <ProfileInfoContainer>
      <UserInfo>
        <ProfileImage>
          <DefaultImg src={ProfileImg} alt="profileImg" />
        </ProfileImage>
        <Nickname>최연수</Nickname>
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

const ProfileImage = styled.div`
  ${tw`
        rounded-full
        w-8
        h-8
        mr-3
        mb-2
    `}
`;

const DefaultImg = styled.img`
  height: inherit;
  padding-left: 0.2rem;
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
