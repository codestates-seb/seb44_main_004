import { CSSProperties } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import bannerImg1 from '../../img/banner1.jpg';
import bannerImg2 from '../../img/banner2.jpg';
import bannerImg3 from '../../img/banner3.jpg';
import bannerImg4 from '../../img/banner4.jpg';

const imgs = [
  { id: 1, imgUrl: bannerImg1 },
  { id: 2, imgUrl: bannerImg2 },
  { id: 3, imgUrl: bannerImg3 },
  { id: 4, imgUrl: bannerImg4 },
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
          <img src={img.imgUrl} style={{ ...SlideStyle, backgroundColor: 'red' }} />
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
