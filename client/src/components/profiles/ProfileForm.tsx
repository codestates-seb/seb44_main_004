import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import tw from 'twin.macro';
import styled from 'styled-components';

import Input from '../input/Input';
import Label from '../label/Label';
import Button from '../buttons/Button';
import ImageUpload from '../imageUpload/ImageUpload';

import { ProfileFormProps } from '../../types/profile';
import { saveUserInfo } from '../../store/userSlice';
import { updateUserInfoAPI } from '../../api/profileApi';

const ProfileForm = ({
  checkNickname,
  selectImg,
  handleSelectImage,
  handleFileInfo,
}: ProfileFormProps) => {
  const [nickname, setNickname] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const myInfo = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    if (checkNickname(nickname)) {
      const data = {
        nickname,
        introduction,
      };
      const response = await updateUserInfoAPI(data);
      if (response) {
        window.location.reload();
      }
      const newMyInfo = {
        ...myInfo,
        nickname,
        introduction,
      };
      dispatch(saveUserInfo(newMyInfo));
    }
  };

  useEffect(() => {
    if (myInfo && myInfo.nickname) {
      setNickname(myInfo.nickname);
    }
    if (myInfo && myInfo.introduction) {
      setIntroduction(myInfo.introduction);
    }
  }, [myInfo]);
  return (
    <ProfileFormContainer>
      <InputForm>
        <Label type="title" htmlFor="email" content="아이디(이메일)" />
        <div>{myInfo.email}</div>
      </InputForm>
      <InputForm>
        <Label type="title" htmlFor="nickName" content="닉네임" />
        <Input
          type="text"
          value={nickname}
          id="nickname"
          borderRadius="0.3rem"
          color="#000"
          focusMode="true"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
          placeholder="닉네임은 2글자 이상 15글자 미만, 영어. 한글, 숫자만 입력 가능합니다."
        />
        {!checkNickname(nickname) && (
          <Valid>닉네임은 2글자 이상 15글자 미만으로 영어, 한글, 숫자만 입력 가능합니다.</Valid>
        )}
      </InputForm>
      <InputForm>
        <Label type="title" htmlFor="introduction" content="소개글" />
        <Textarea
          value={introduction || ''}
          maxLength={200}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setIntroduction(e.target.value)}
          placeholder="자신을 소개하는 글을 200자 이하로 입력하세요."
        />
        <IntroduceLenCheck>{introduction?.length}/200</IntroduceLenCheck>
      </InputForm>
      <InputForm>
        <Label type="title" htmlFor="profileImage" content="프로필 이미지" />
        {/* <ImageUpload selectImg={selectImg} handleSelectImage={handleSelectImage} /> */}
        <ImageUpload
          nickname={nickname}
          selectImg={selectImg}
          handleSelectImage={handleSelectImage}
          handleFileInfo={handleFileInfo}
        />
      </InputForm>
      <InputForm>
        <Button type="primary" content="발행" onClick={handleUpdate} />
      </InputForm>
    </ProfileFormContainer>
  );
};
const ProfileFormContainer = styled.div`
  border-radius: 0.75rem;
  background-color: #efefef;
  padding: 2rem;
`;
const InputForm = styled.div`
  :first-child {
    > div {
      font-weight: 500;
    }
    margin-bottom: 0.5rem;
  }
  &:nth-last-child(2) {
    > div {
      label {
        text-align: center;
      }
    }
  }
  &:last-child {
    align-items: flex-end;
    margin-bottom: 0;
  }
  ${tw`
        mb-[1.2rem]
        flex
        flex-col
    `}
`;
const Valid = tw.div`
    text-red-500
    pt-[0.5rem]
    pl-[0.5rem]
    text-[0.7rem]
    font-semibold
`;
const Textarea = styled.textarea`
  ${tw`
        w-full
        h-[10rem]

        bg-[#F8F7F7]
        border-0
        rounded-[0.3rem]
        p-[0.7rem]
    `}
  &:focus {
    border: 1px solid #0077ff;
    box-shadow: 0px 0px 5px 3px rgba(46, 139, 245, 0.3);
    outline: none;
  }
`;
const IntroduceLenCheck = styled.div`
  color: ${({ theme }) => theme.colors.mainLightGray400};
  ${tw`
        text-right
        mt-[0.3rem]
        text-[0.8rem]
    `}
`;
export default ProfileForm;
