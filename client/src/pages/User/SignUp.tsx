import { ChangeEvent, FormEvent, useState } from 'react';
import tw from 'twin.macro';

import { IUserRegisterData } from '../../types/user';
import Label from '../../components/label/Label';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/Button';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import { formInputValidation, validation } from '../../utils/validation';

/**
 * 1. state 값 1개로 관리하기
 *  - 이메일 값
 *  - 비밀번호 값
 *  - 비밀번호 확인 값
 *  - 닉네임 값
 *  (이미지 쪽은 추후 구현하기)
 *
 *  2. 유효성 검증 후 서버로 요청 보내기
 *   - body에 담아 보낼 값
 *     {
 *       "email":"test@gmailr.com",
 *       "nickname":"닉네임",
 *       "password":”테스트ps12!"
 *     }
 */

const SignUp = () => {
  const [selectImg, setSelectImg] = useState<string>('');
  const [formValue, setFormValue] = useState<IUserRegisterData>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });

  // form validation result에 따라 input에서 정보를 볼 수 있어야 됨.

  const handleUpdateFormValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSelectImage = (imgURL: string) => {
    setSelectImg(imgURL);
  };

  const handleFormValidation = (e: FormEvent) => {
    e.preventDefault();
    console.log(formInputValidation(formValue.email, validation.emailValidRule));
  };

  const handleSignUpPost = (e: FormEvent) => {
    e.stopPropagation();
    handleFormValidation(e);
  };

  return (
    <Container>
      <Title>후즈북의 큐레이터가 되어주실래요?</Title>
      <Form onClick={handleSignUpPost}>
        <ItemWrap>
          <Label type="title" htmlFor="email" content="이메일" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            onChange={handleUpdateFormValue}
          />
        </ItemWrap>
        <ItemWrap>
          <Label type="title" htmlFor="password" content="비밀번호" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={handleUpdateFormValue}
          />
        </ItemWrap>
        <ItemWrap>
          <Label type="title" htmlFor="passwordConfirm" content="비밀번호 확인" />
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인을 위해 한번 더 입력해주세요."
            onChange={handleUpdateFormValue}
          />
        </ItemWrap>
        <ItemWrap>
          <Label type="title" htmlFor="nickname" content="닉네임" />
          <Input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="사용하실 닉네임을 입력해주세요."
            onChange={handleUpdateFormValue}
          />
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
