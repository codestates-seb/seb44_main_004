import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { ICuratorInfo } from '../../types/user';
import { images } from '../../utils/importImgUrl';

const CuratorCard = ({ image, memberId, mySubscriber, nickname }: ICuratorInfo) => {
  const navigate = useNavigate();

  return (
    <Container>
      <div onClick={() => navigate(`/userpage/${memberId}`)}>
        <ProfileImg src={image ?? images.profileImg2} alt="curator profile img" />
        <NickName>{nickname}</NickName>
        <Curator>구독자 {mySubscriber}명</Curator>
      </div>
    </Container>
  );
};

const Container = tw.li`
  text-center
  w-40
  rounded-xl
  bg-[#D9D4CF]
  hover:text-white
  hover:bg-[#83776c]
  shadow-[rgba(0, 0, 0, 0.24) 0px 3px 8px]
  cursor-pointer
  [> div]:hover:rounded-xl
  [> div]:py-10
`;

const ProfileImg = tw.img`
  w-10
  h-10
  mb-4
  rounded-full
  object-cover
`;

const NickName = tw.p`
  mb-2
`;

const Curator = tw.span`
  text-xs
`;

export default CuratorCard;
