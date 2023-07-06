import { ChangeEvent, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';

import Input from '../components/input/Input';
import Label from '../components/label/Label';
import Button from '../components/buttons/Button';
import ImageUpload from '../components/imageUpload/ImageUpload';

const MainPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectImg, setSelectImg] = useState<string>('');

  const handleSelectImage = (imgURL: string) => {
    setSelectImg(imgURL);
  };

  return (
    <Container>
      <Title>TailwindCSS & StyledComponents 사용법 / 공용 컴포넌트 사용법</Title>
      <ItemContainer>
        <Label type="email" htmlFor="email" content="이메일" />
        <Input
          id="email"
          placeholder="이메일을 입력해주세요"
          width="50%"
          color="#000"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        />
      </ItemContainer>
      <ItemContainer>
        <Button type="cancel" content="취소" />
        <Button type="primary" content="발행" />
        <Button type="subscribe" content="구독" />
        <Button type="subscribe" content="구독" isSubscribed />
        <Button type="publication" content="+ 큐레이션 발행" width="10" />
      </ItemContainer>
      <SecondItemContainer>
        <Label type="email" htmlFor="email" content="이메일" />
        <Label type="password" htmlFor="password" content="비밀번호" />
        <Label type="title" htmlFor="title" content="제목" />
      </SecondItemContainer>
      <ImageUpload selectImg={selectImg} handleSelectImage={handleSelectImage} />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.mainLightGray100};
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
  [> label]:mb-2
  [> button]:mb-4
`;

const SecondItemContainer = tw.div`
  flex
  flex-col
  mt-8
  mb-56
  [> label]:mb-4
`;

export default MainPage;
