import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { FaPencilAlt } from 'react-icons/fa';

const PencilButton = () => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate('/write')}>
      <FaPencilAlt />
    </Container>
  );
};

const Container = tw.div`
  fixed
  bottom-12
  right-12
  bg-white
  rounded-full
  cursor-pointer
  p-4

  [> svg]:(text-yellow-300 text-4xl)

`;

export default PencilButton;
