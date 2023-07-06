import { FormEvent, useState } from 'react';
import tw from 'twin.macro';

import Label from '../../components/label/Label';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/Button';
import ImageUpload from '../../components/imageUpload/ImageUpload';

/**
 * Layout
 * - Title
 * - email
 * - password
 * - password confirm
 * - nickname
 * - profile img
 * - signUp button
 *
 * form 유효성 검증
 * - 이메일: 기본 이메일 유효성 검증
 * - 비밀번호: 특수문자 ()
 */

const SignUp = () => {
  const [selectImg, setSelectImg] = useState<string>('');

  const handleSelectImage = (imgURL: string) => {
    setSelectImg(imgURL);
  };

  const handleFormValidation = () => {
    console.log('폼 검증 시작한다?');
  };

  const handleSignUpPost = (e: FormEvent) => {
    e.stopPropagation();
    handleFormValidation();
    console.log('폼 검증 해야 됨');
  };

  return (
    <Container>
      <Title>후즈북의 큐레이터가 되어주실래요?</Title>
      <Form onClick={handleSignUpPost}>
        <ItemContainer>
          <Label type="title" htmlFor="email" content="이메일" />
          <Input type="email" placeholder="이메일을 입력해주세요." />
        </ItemContainer>
        <ItemContainer>
          <Label type="title" htmlFor="password" content="비밀번호" />
          <Input placeholder="비밀번호를 입력해주세요." />
        </ItemContainer>
        <ItemContainer>
          <Label type="title" htmlFor="password-confirm" content="비밀번호 확인" />
          <Input placeholder="비밀번호 확인을 위해 한번 더 입력해주세요." />
        </ItemContainer>
        <ItemContainer>
          <Label type="title" htmlFor="nickname" content="닉네임" />
          <Input placeholder="사용하실 닉네임을 입력해주세요." />
        </ItemContainer>
        <ItemContainer>
          <Label type="title" content="프로필 이미지" />
          <ImageUpload selectImg={selectImg} handleSelectImage={handleSelectImage} />
        </ItemContainer>
        <Button type="primary" content="회원가입" />
      </Form>
    </Container>
  );
};

const Container = tw.div`
  flex
  flex-col
  items-center
  justify-center
  w-full
  h-[100vh]
`;

const Form = tw.form`
  relative
  flex
  flex-col
  items-center
  justify-center
bg-gray-200
  max-w-xl
  w-[calc(33%)]
  px-2
  py-14
  pb-20
  rounded-xl
  shadow-lg
  shadow-gray-300

  [> button]:absolute
  [> button]:bottom-[calc(5%)]
  [> button]:right-[calc(11%)]
`;

const ItemContainer = tw.div`
  w-4/5
  mb-6
  [> input]:mt-3
  [> div]:mt-3
`;

const Title = tw.header`
  text-2xl
  font-extrabold
  mb-10
`;

export default SignUp;
