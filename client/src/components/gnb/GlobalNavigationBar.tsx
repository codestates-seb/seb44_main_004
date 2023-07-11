import tw from 'twin.macro';

import WhoseBookLogo from '../../img/whosebook_logo.png';

const GlobalNavigationBar = () => {
  return (
    <Container>
      <ItemLeftWrap>
        <img src={WhoseBookLogo} alt="whose book logo image" />
        <Title>후즈북</Title>
      </ItemLeftWrap>
      <ItemRightWrap></ItemRightWrap>
    </Container>
  );
};

const Container = tw.div`
  bg-slate-200
  w-full

`;

const ItemLeftWrap = tw.div`
  bg-yellow-200
`;

const ItemRightWrap = tw.div`
  bg-pink-200
`;

const Title = tw.h3`
  text-lg
`;
export default GlobalNavigationBar;
