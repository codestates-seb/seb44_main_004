import tw from 'twin.macro';

import { images } from '../../utils/importImgUrl';

const ServerError = () => {
  return (
    <Container>
      <Img src={images.serverError} alt="500 error page" />
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

export default ServerError;
