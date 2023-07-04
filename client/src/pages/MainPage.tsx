import tw from 'twin.macro';
import styled from 'styled-components';

import Input from '../components/input/Input';
import Label from '../components/label/Label';
import Button from '../components/buttons/Button';

const MainPage = () => {
  return (
    <Container>
      <Title>TailwindCSS & StyledComponents 사용법 / 공용 컴포넌트 사용법</Title>
      <ItemContainer>
        <Label type="title" htmlFor="email" content="이메일" />
        <Input
          id="email"
          placeholder="이메일을 입력해주세요"
          width="30%"
          padding="2rem"
          color="#000"
        />
      </ItemContainer>
      <ItemContainer>
        <Button type="primary" content="작성하기" />
        <Button type="primary" content="발행" />
        <Button
          type="cancel"
          content="취소"
          color="#Fd8F8F"
          backgroundColor="#fff"
          hoverColor="#fff"
          hoverBackgroundColor="#Fd8F8F"
          borderColor="#fff"
          hoverBorderColor="#Fd8F8F"
        />
        <Button type="subscribe" content="구독" />
      </ItemContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.mainPastelBlue100};
  ${tw`
    p-10
    w-full
  `}
`;

const Title = tw.p`
  bg-red-400
  text-yellow-500
  text-2xl
  p-11
  mb-11
`;

const ItemContainer = tw.div`
  bg-inherit
  flex
  flex-col
  mt-10
`;

export default MainPage;
