import { CSSProperties } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import { images } from '../../utils/importImgUrl';

const imgs = [
  { id: 1, imgUrl: images.banner1 },
  { id: 2, imgUrl: images.banner2 },
  { id: 3, imgUrl: images.banner3 },
  { id: 4, imgUrl: images.banner4 },
  { id: 5, imgUrl: images.banner5 },
  { id: 6, imgUrl: images.banner6 },
];

const SlideStyle: CSSProperties = {
  width: '100%',
  height: '208px',
  objectFit: 'cover',
};

const SimpleSlider = () => {
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
      {imgs.map((img) => (
        <div key={img.id}>
          <img src={img.imgUrl} style={{ ...SlideStyle }} />
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
