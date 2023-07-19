import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import tw from 'twin.macro';

import { IUserRegisterData, IUserRegisterFormValid } from '../../types/user';
import { FormType, handleIsValid } from '../../utils/validation';
import { registerAPI, socialRegisterAPI } from '../../api/userApi';
import { ModalType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { modalActions } from '../../store/modalSlice';
import Label from '../../components/label/Label';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/Button';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import Modal from '../../components/modals/Modal';
import ClockLoading from '../../components/Loading/ClockLoading';

const SignUp = () => {
  const [queryData] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRedirect, setRedirect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectImg, setSelectImg] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
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
  const { isModalOpen } = useSelector((state: RootState) => state.modal);

  const handleSelectImage = (imgURL: string) => {
    setSelectImg(imgURL);
  };

  const handleFileInfo = (file: File) => {
    setFile(file);
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

  /**
   * 회원가입 (프로필 이미지 formData)
   */
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const data = {
      ...formValue,
    };
    delete data.passwordConfirm;

    const blob = new Blob([], { type: 'application/octet-stream' });

    formData.append(
      'memberPostDto',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      })
    );

    if (file) {
      formData.append('memberImage', file);
    } else {
      formData.append('memberImage', blob, '');
    }

    /* for (const [key, value] of formData.entries()) {
      console.log(key, value);
    } */

    if (isRedirect) {
      const response = await socialRegisterAPI(formData);
      if (response) {
        dispatch(modalActions.open());
      }
    } else {
      const response = await registerAPI(formData);
      if (response) {
        dispatch(modalActions.open());
      }
    }
  };

  const handleCloseModal = () => {
    dispatch(modalActions.close());
    if (!isRedirect) {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (queryData) {
      const email = queryData.get('email');
      const nickname = queryData.get('nickname');
      const imgUrl = queryData.get('imgUrl');

      // 이미 가입된 회원일 경우 token 넘어올 때 조건 추가 - token이 있으면, token 값 가지고 로그인 페이지로 바로 이동시키기
      const accessToken = queryData.get('access_token');

      if (accessToken) {
        setIsLoading(true);
        // localstorage에 토큰 저장
        localStorage.setItem('Authorization', accessToken);
        navigate('/');
      }

      if (email && nickname) {
        setRedirect(true);
        setFormValue({
          ...formValue,
          email,
          nickname,
        });
        setFormValid({
          ...formValid,
          ['email']: true,
          ['nickname']: handleIsValid(nickname as FormType, nickname),
        });
      }
      if (imgUrl) {
        handleSelectImage(imgUrl);
      }
    }
  }, []);

  useEffect(() => {
    if (isRedirect) {
      setFormValid({
        ...formValid,
        ['email']: true,
        ['password']: true,
        ['passwordConfirm']: true,
      });
    }
  }, [isRedirect]);

  return (
    <>
      {isModalOpen && <Modal type={ModalType.WELCOME} handleCloseModal={handleCloseModal} />}
      {!isLoading ? (
        <Container>
          <Title>후즈북의 큐레이터가 되어주실래요?</Title>
          <Form onSubmit={handleRegister}>
            <ItemWrap>
              <Label type="title" htmlFor="email" content="이메일" />
              <Input
                id="email"
                name="email"
                type="email"
                value={formValue.email}
                disabled={isRedirect ? true : false}
                placeholder="이메일을 입력해주세요."
                onChange={handleUpdateFormValue}
              />
              {!isRedirect && formValue.email && !formValid.email && (
                <Valid>올바른 이메일 형식이 아닙니다.</Valid>
              )}
            </ItemWrap>
            {!isRedirect && (
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
            )}
            {!isRedirect && (
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
            )}
            <ItemWrap>
              <Label type="title" htmlFor="nickname" content="닉네임" />
              <Input
                id="nickname"
                name="nickname"
                value={formValue.nickname}
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
              <ImageUpload
                nickname={formValue.nickname}
                selectImg={selectImg}
                handleSelectImage={handleSelectImage}
                handleFileInfo={handleFileInfo}
              />
            </ItemWrap>
            <Button
              type={
                formValid.email &&
                formValid.password &&
                formValid.passwordConfirm &&
                formValid.nickname
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
      ) : (
        <ClockLoading loading={isLoading} color="red" />
      )}
    </>
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

// 상세페이지
// 댓글 목록 get -> redux 저장,
// 화면 렌더할 때는 redux에서 댓글 상태 가져오기
// 댓글 수정, 삭제, 추가 서버 요청
// * redux에서도 관리
// 수정 -> 수정 id, 내용...
// 삭제 -> 해당 id에 해당하는 댓글만 제외
// 추가
