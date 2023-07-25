import { CSSProperties } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

const SlideStyle: CSSProperties = {
  width: '100%',
  height: '208px',
  objectFit: 'cover',
};

interface IProps {
  data?: {
    id: number;
    imgUrl: string;
    curationId: string;
  }[];
}

const settings = {
  dots: true,
  arrow: true,
  infinite: true,
  autoplay: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const SimpleSlider = ({ data }: IProps) => {
  const navigate = useNavigate();

  return (
    <Slider {...settings}>
      {data?.map((data) => (
        <Banner key={data.id} onClick={() => navigate(`/curations/${data.curationId}`)}>
          <img src={data.imgUrl} style={{ ...SlideStyle }} />
        </Banner>
      ))}
    </Slider>
  );
};

const Banner = tw.div`
  cursor-pointer
`;

export default SimpleSlider;
