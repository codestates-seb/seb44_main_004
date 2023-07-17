import tw from 'twin.macro';

import { images } from '../../utils/importImgUrl';

const FrontError = () => {
  return (
    <Container>
      <Img src={images.frontError} alt="404 error page" />
    </Container>
  );
};

const Container = tw.div`
  bg-white
  w-[100vw]
  h-[100vh]
  mt-[-3rem]
  flex
  justify-center
  items-center
`;

const Img = tw.img`
  w-[500px]
  h-[500px]
`;

export default FrontError;
