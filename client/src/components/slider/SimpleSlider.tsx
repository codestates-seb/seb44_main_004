import { CSSProperties } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

const SlideStyle: CSSProperties = {
  width: '100%',
  height: '208px',
  objectFit: 'cover',
};

interface IProps {
  imgs?: {
    id: number;
    imgUrl: string;
  }[];
}

const SimpleSlider = ({ imgs }: IProps) => {
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

  return (
    <Slider {...settings}>
      {imgs?.map((img) => (
        <div key={img.id}>
          <img src={img.imgUrl} style={{ ...SlideStyle }} />
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
