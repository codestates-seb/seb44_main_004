import { FormEvent, useState } from 'react';
import tw from 'twin.macro';

import Label from '../../components/label/Label';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/Button';
import ImageUpload from '../../components/imageUpload/ImageUpload';

/**
 * state 값 1개로 관리하기
 *  - 이메일 값
 *  - 비밀번호 값
 *  - 비밀번호 확인 값
 *  - 닉네임 값
 *  (이미지 쪽은 추후 구현하기)
 *
 * 유효성 검증
 *  - 이메일: 이메일 검증
 *  - 비밀번호: 숫자, 영어 대/소문자 1개, 특수문자(!@#$%^&*), 길이
 *  - 비밀번호 확인: 비밀번호와 일치하는지 체크
 *  - 닉네임: 2글자 이상 15글자 미만, 영어, 숫자만 입력
 *
 * body에 담아 보낼 값
 * {
 *   "email":"test@gmailr.com",
 *   "nickname":"닉네임",
 *   "password":”테스트ps12!"
 * }
 */

const SignUp = () => {
  const [selectImg, setSelectImg] = useState<string>('');

  const handleSelectImage = (imgURL: string) => {
    setSelectImg(imgURL);
  };

  const handleFormValidation = () => {
    console.log();
  };

  const handleSignUpPost = (e: FormEvent) => {
    e.stopPropagation();
    handleFormValidation();
  };

  return (
    <Container>
      <Title>후즈북의 큐레이터가 되어주실래요?</Title>
      <Form onClick={handleSignUpPost}>
        <ItemWrap>
          <Label type="title" htmlFor="email" content="이메일" />
          <Input type="email" placeholder="이메일을 입력해주세요." />
        </ItemWrap>
        <ItemWrap>
          <Label type="title" htmlFor="password" content="비밀번호" />
          <Input type="password" placeholder="비밀번호를 입력해주세요." />
        </ItemWrap>
        <ItemWrap>
          <Label type="title" htmlFor="password-confirm" content="비밀번호 확인" />
          <Input type="password" placeholder="비밀번호 확인을 위해 한번 더 입력해주세요." />
        </ItemWrap>
        <ItemWrap>
          <Label type="title" htmlFor="nickname" content="닉네임" />
          <Input type="text" placeholder="사용하실 닉네임을 입력해주세요." />
        </ItemWrap>
        <ItemWrap>
          <Label type="title" content="프로필 이미지" />
          <ImageUpload selectImg={selectImg} handleSelectImage={handleSelectImage} />
        </ItemWrap>
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

const Title = tw.header`
  text-2xl
  font-extrabold
  mb-10
`;

const Form = tw.form`
  relative
  flex
  flex-col
  items-center
  justify-center
  min-w-min
  w-[35rem]
  px-2
  py-14
  pb-20
  bg-gray-200
  rounded-xl
  shadow-lg
  shadow-gray-300

  [> button]:absolute
  [> button]:bottom-[calc(5%)]
  [> button]:right-[calc(17%)]
`;

const ItemWrap = tw.div`
  w-2/3
  mb-6

  [> input]:mt-3
  [> div]:mt-3
`;

export default SignUp;
