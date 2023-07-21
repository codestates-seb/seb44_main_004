import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import tw from 'twin.macro';

import { ICuratorInfo } from '../../types/user';
import { images } from '../../utils/importImgUrl';

interface IProps {
  data?: ICuratorInfo[] | null;
}

const CardSlider = ({ data }: IProps) => {
  const navigate = useNavigate();
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 5,
  };

  return (
    <Slider {...settings}>
      {data?.map(({ memberId, image, nickname, mySubscriber }) => (
        <Container key={memberId} onClick={() => navigate(`/userpage/${memberId}`)}>
          <ProfileImg src={image ?? images.profileImg2} alt="curator profile img" />
          <NickName>{nickname}</NickName>
          <Curator>구독자 {mySubscriber}명</Curator>
        </Container>
      ))}
    </Slider>
  );
};

const Container = tw.li`
  text-center
  rounded-2xl
  bg-[#D9D4CF]
  hover:text-white
  hover:bg-[#83776c]
  shadow-[rgba(0, 0, 0, 0.24) 0px 3px 8px]
  cursor-pointer

  [> *]:block
`;

//
/**
 *   
    [> div]:hover:rounded-xl
  [> div]:py-10
 */

const ProfileImg = tw.img`
  text-center
  mt-10
  m-auto
  w-[50px]
  h-[50px]
  mb-4
  rounded-full
  object-cover
`;

const NickName = tw.p`
  mb-2
`;

const Curator = tw.span`
  text-xs
  mb-10
`;

export default CardSlider;
