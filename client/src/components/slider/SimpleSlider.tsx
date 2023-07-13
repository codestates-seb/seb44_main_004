/* import Slider from 'react-slick';

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import { styled } from 'styled-components';

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Container>
      <Slider {...settings}>
        <div style={{ backgroundColor: 'red', width: '100vw', height: '200px' }}>
          <title>TEST 1</title>
        </div>
        <div style={{ backgroundColor: 'yellow', width: '100vw', height: '200px' }}>
          <title>TEST 2</title>
        </div>
        <div style={{ backgroundColor: 'green', width: '100vw', height: '200px' }}>
          <title>TEST 2</title>
        </div>
      </Slider>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 400px;

  .slick-dots {
    .slick-active {
      button::before {
        color: pink;
      }
    }
    button::before {
      color: skyblue;
    }
  }
`;

export default SimpleSlider;
 */

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface StyleProps {
  style: {
    color: string;
  };
}

interface IProps {
  className?: string;
  style?: StyleProps;
  onClick?: () => void;
}

export function NextArrow(props: IProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onClick={onClick}
    />
  );
}

export function PrevArrow(props: IProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
}

const style = {
  width: '500px',
  height: '300px',
  backgroundColor: 'yellowgreen',
};

const SimpleSlider = () => {
  const settings = {
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      <h5>Single Item</h5>
      <Slider {...settings}>
        <div style={{ ...style }}>
          <h3>1</h3>
        </div>
        <div style={{ ...style }}>
          <h3>2</h3>
        </div>
        <div style={{ ...style }}>
          <h3>3</h3>
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;
