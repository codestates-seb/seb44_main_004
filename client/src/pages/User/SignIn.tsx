import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import tw from 'twin.macro';

import Label from '../../components/label/Label';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/Button';
import Logo from '../../img/whosebook_logo.png';
import GoogleLogo from '../../img/google.png';
import KakaoLogo from '../../img/kakaotalk_logo.png';
import NaverLogo from '../../img/naver_logo.png';
import { IUserLoginData, IUserLoginFormValid } from '../../types/user';
import { FormType, handleIsValid } from '../../utils/validation';
import { loginAPI } from '../../api/userApi';
import { saveUserInfo } from '../../store/userSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState<IUserLoginData>({
    username: '',
    password: '',
  });
  const [formValid, setFormValid] = useState<IUserLoginFormValid>({
    username: false,
    password: false,
  });
  /* const [keepLogin, setKeepLogin] = useState<boolean>(false); */

  const handleUpdateFormValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
    handleFormValidation(e);
  };

  const handleFormValidation = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormValid({
      ...formValid,
      [name]: handleIsValid(name as FormType, value),
    });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      username: formValue.username,
      password: formValue.password,
    };
    const response = await loginAPI(data);
    if (response) {
      dispatch(saveUserInfo(response.data));
      navigate('/');
    }
  };

  const handleGoogleOAuthLogin = () => {
    window.location.href = `https://9eb6-222-110-54-74.ngrok-free.app/oauth2/authorization/google`;
  };

  return (
    <Container>
      <HeaderWrap>
        <img src={Logo} alt="whose book logo" />
        <header className="title">후즈북</header>
      </HeaderWrap>
      <Form onSubmit={handleLogin}>
        <ItemWrap>
          <Label type="title" htmlFor="username" content="이메일" />
          <Input
            id="username"
            name="username"
            placeholder="이메일을 입력해주세요"
            onChange={handleUpdateFormValue}
          />
          {!formValid.username && formValue.username && (
            <Valid>올바른 이메일 형식이 아닙니다.</Valid>
          )}
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
          {!formValid.password && formValue.password && (
            <>
              <Valid>영문, 숫자, 특수문자(!@#$%^&*)를 각 1개 포함,</Valid>
              <Valid>8자 이상 15자 미만만 입력가능합니다.</Valid>
            </>
          )}
        </ItemWrap>
        <LoginKeepWrap>
          <input id="keep" type="checkbox" />
          <Label htmlFor="keep" content="로그인 상태 유지" />
        </LoginKeepWrap>
        <ItemWrap>
          <Info>
            회원이 아니시라면? <Link to="/register">회원가입하러 가기</Link>
          </Info>
        </ItemWrap>
        <Button type="primary" content="로그인" />
        <Line />
      </Form>
      <SocialLoginForm>
        <SocialItemItemWrap>
          <GoogleLogoImg src={GoogleLogo} alt="google social login image" />
          <Button onClick={handleGoogleOAuthLogin} content="구글로 로그인하기" color="#371c1d" />
        </SocialItemItemWrap>
        <SocialItemItemWrap>
          <KakaoLogoImg src={KakaoLogo} alt="kakaotalk social login image" />
          <Button content="카카오로 로그인하기" color="#371C1D" />
        </SocialItemItemWrap>
        <SocialItemItemWrap>
          <NaverLogoImg src={NaverLogo} alt="naver social login image" />
          <Button content="네이버로 로그인하기" color="#fff" />
        </SocialItemItemWrap>
      </SocialLoginForm>
    </Container>
  );
};

const Container = tw.div`
  flex
  flex-col
  items-center
  justify-center
  w-full
  pt-20
`;

const HeaderWrap = tw.header`
  flex
  items-center
  mb-10

  [> img]:w-11
  [> img]:mr-4
`;

const Form = tw.form`
  flex
  flex-col
  items-center
  justify-center
  min-w-min
  w-[33rem]
  px-2
  py-14
  pb-20
  bg-gray-200
  rounded-xl
  shadow-lg
  shadow-gray-300

  [> button]:w-3/5
`;

const ItemWrap = tw.div`
  w-3/5
  mb-8

  [> input]:mt-3
  [> div]:mt-3
`;

const LoginKeepWrap = tw.div`
  w-3/5
  flex
  items-center
  -mt-2
  mb-5

  [> input]:mr-2
  [> label]:text-sm
`;

const Info = tw.p`
  text-sm
  text-gray-500

  [> a]:text-blue-700
  [> a]:font-bold
`;

const Line = tw.div`
  w-[75%]
  border-t-[1px]
  border-solid 
  border-gray-400
  mt-10
`;

const SocialLoginForm = tw.div`
  mt-10
  w-3/5
  
  [> div]:first:bg-[#fff]
  [> div]:even:bg-[#FAE100]
  [> div]:last:bg-[#03C75A]
  [> div]:mb-4
`;

const SocialItemItemWrap = tw.div`
  flex
  justify-center
  items-center
  rounded-lg
  cursor-pointer

  [> button]:w-1/2
`;

const GoogleLogoImg = tw.img`
  w-6
  h-6
`;

const KakaoLogoImg = tw.img`
  w-7
  h-6
`;

const NaverLogoImg = tw.img`
  w-4
  h-4
`;

const Valid = tw.p`
  mt-2
  text-center
  text-xs
  text-red-400

  [> p]:last:mt-0
`;

export default SignIn;
