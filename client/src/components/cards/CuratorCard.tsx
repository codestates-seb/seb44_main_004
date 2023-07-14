import tw from 'twin.macro';
import { ICuratorInfo } from '../../types/user';
import Label from '../label/Label';
import { useNavigate } from 'react-router-dom';

const CuratorCard = ({ memberId, profileImg, nickname, subscribers }: ICuratorInfo) => {
  const navigate = useNavigate();

  return (
    <Container>
      <div onClick={() => navigate(`/userpage/${memberId}`)}>
        <ProfileImg src={profileImg} alt="curator profile img" />
        <NickName>{nickname}</NickName>
        <p>구독자 {subscribers}명</p>
        {/* <Label content={`구독자 ${subscribers}명`} /> */}
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
  shadow-[rgba(0, 0, 0, 0.24) 0px 3px 8px]
  [> div]:hover:rounded-xl
  [> div]:py-10
  [> label]:text-xs
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

export default CuratorCard;
