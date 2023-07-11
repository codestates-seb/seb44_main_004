import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import Label from '../../components/label/Label';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/Button';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import { IUserRegisterData, IUserRegisterFormValid } from '../../types/user';
import { FormType, handleIsValid } from '../../utils/validation';
import { registerAPI } from '../../api/userAPI';

const SignUp = () => {
  const navigate = useNavigate();
  const [selectImg, setSelectImg] = useState<string>('');
  const [formValue, setFormValue] = useState<IUserRegisterData>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });
  const [formValid, setFormValid] = useState<IUserRegisterFormValid>({
    email: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
  });

  const handleSelectImage = (imgURL: string) => {
    setSelectImg(imgURL);
  };

  const handleUpdateFormValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });

    if (name !== 'passwordConfirm') {
      handleFormValidation(e);
    } else {
      handlePasswordConfirmValid(value);
    }
  };

  const handleFormValidation = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormValid({
      ...formValid,
      [name]: handleIsValid(name as FormType, value),
    });
  };

  const handlePasswordConfirmValid = (passwordConfirm: string) => {
    setFormValid({
      ...formValid,
      ['passwordConfirm']: formValue.password === passwordConfirm,
    });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password, nickname } = formValue;
    const data = {
      email,
      password,
      nickname,
    };

    const response = await registerAPI(data);
    if (response) {
      // TODO: welcome modal 띄우기
      navigate('/login');
    }
  };

  return (
    <Container>
      <Title>후즈북의 큐레이터가 되어주실래요?</Title>
      <Form onSubmit={handleRegister}>
        <ItemWrap>
          <Label type="title" htmlFor="email" content="이메일" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            onChange={handleUpdateFormValue}
          />
          {formValue.email && !formValid.email && <Valid>올바른 이메일 형식이 아닙니다.</Valid>}
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
          {formValue.password && !formValid.password && (
            <>
              <Valid>영문, 숫자, 특수문자(!@#$%^&*)를 각 1개 포함,</Valid>
              <Valid>8자 이상 15자 미만만 입력가능합니다.</Valid>
            </>
          )}
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
          {formValue.passwordConfirm && !formValid.passwordConfirm && (
            <Valid>비밀번호와 비밀번호 확인이 일치하지 않습니다.</Valid>
          )}
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
          {formValue.nickname && !formValid.nickname && (
            <Valid>영문, 한글, 숫자만 입력, 2글자 이상 15글자 미만으로 입력가능합니다. </Valid>
          )}
        </ItemWrap>
        <ItemWrap>
          <Label type="title" content="프로필 이미지" />
          <ImageUpload selectImg={selectImg} handleSelectImage={handleSelectImage} />
        </ItemWrap>
        <Button
          type={
            formValid.email && formValid.password && formValid.passwordConfirm && formValid.nickname
              ? 'primary'
              : 'disabled'
          }
          content="회원가입"
          disabled={
            !(
              formValid.email &&
              formValid.password &&
              formValid.passwordConfirm &&
              formValid.nickname
            )
          }
        />
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

const Valid = tw.p`
  mt-2
  text-center
  text-xs
  text-red-400

  [> p]:last:mt-0
`;

export default SignUp;
