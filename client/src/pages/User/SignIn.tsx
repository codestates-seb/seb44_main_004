import tw from 'twin.macro';

import Label from '../../components/label/Label';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/Button';
import Logo from '../../img/whosebook_logo.png';
import GoogleLogo from '../../img/google.png';
import KakaoLogo from '../../img/kakaotalk_logo.png';
import NaverLogo from '../../img/naver_logo.png';

const SignIn = () => {
  return (
    <Container>
      <HeaderWrap>
        <img src={Logo} alt="whose book logo" />
        <header className="title">후즈북</header>
      </HeaderWrap>
      <Form>
        <ItemWrap>
          <Label type="title" htmlFor="email" content="이메일" />
          <Input id="email" placeholder="이메일을 입력해주세요" />
        </ItemWrap>
        <ItemWrap>
          <Label type="title" htmlFor="password" content="비밀번호" />
          <Input id="password" placeholder="비밀번호를 입력해주세요." />
        </ItemWrap>
        <LoginKeepWrap>
          <input id="keep" type="checkbox" />
          <Label htmlFor="keep" content="로그인 상태 유지" />
        </LoginKeepWrap>
        <Button type="primary" content="로그인" />
        <Line />
        <SocialLoginForm>
          <SocialItemItemWrap>
            <GoogleLogoImg src={GoogleLogo} alt="google social login image" />
            <Button content="구글로 로그인하기" color="#371c1d" />
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

const HeaderWrap = tw.header`
  flex
  items-center
  mb-10

  [> img]:w-11
  [> img]:mr-4
`;

const Form = tw.div`
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

export default SignIn;
