import { useState, useEffect, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import tw from 'twin.macro';
import styled from 'styled-components';

import Input from '../input/Input';
import Label from '../label/Label';
import Button from '../buttons/Button';
import ImageUpload from '../imageUpload/ImageUpload';

import { handleIsValid } from '../../utils/validation';
import { saveUserInfo } from '../../store/userSlice';
import { updateUserInfoAPI } from '../../api/profileApi';
interface PatchDtoProps {
  nickname?: string;
  introduction?: string | null;
  basicImage?: boolean;
}
const ProfileForm = () => {
  const myInfo = useSelector((state: RootState) => state.user);

  const [nickname, setNickname] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [selectImg, setSelectImg] = useState<string>('');

  const handleSelectImage = (imgURL: string) => {
    setSelectImg(imgURL);
  };
  const handleFileInfo = (file: File) => {
    setFile(file);
  };

  const dispatch = useDispatch();

  // const handleUpdate = async () => {
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (handleIsValid('nickname', nickname)) {
      const formData = new FormData();

      const data: PatchDtoProps = {
        nickname,
      };
      if (introduction) {
        data['introduction'] = introduction;
      }

      const blob = new Blob([], { type: 'application/octet-stream' });

      formData.append(
        'memberPatchDto',
        new Blob([JSON.stringify(data)], {
          type: 'application/json',
        })
      );
      //      1-1. 기본이미지 (file === null && !selectImg)
      //      memberPatchDto = {
      //      nickname, introduction, basicImage :true}
      //      memberImage=null

      //      1-2. 사진 추가 (file && selectImg)
      //      memberPatchDto = {
      //      nickname, introduction, basicImage :false}
      //      memberImage=file

      //      1-3 기존 프로필 이미지 유지 (file === null && selectImg)
      //      memberPatchDto = {
      //      nickname, introduction, basicImage :false}
      //      memberImage=null

      //1-1. 기본 이미지 에서 딱히 유지 -> 1-3 null selectImg
      //1-3. 바꾼 이미지로 유지 -> null O -> 1-3
      //1-2. 기본에서 다른 이미지로 변경 -> 1-2. file O selectImg O

      if (file && selectImg) {
        //기본에서 다른 이미지로 변경시 1-2
        data['basicImage'] = false;
      } else if (file === null && selectImg) {
        //기존 이미지에서 변경없이 발행 버튼 누를시 1-3
        data['basicImage'] = false;
      } else if (file === null && !selectImg) {
        //기본 이미지로 미리보기 되어있는 상태에서 발행 버튼 누를 시 1-1
        data['basicImage'] = true;
      }

      if (file && selectImg) {
        formData.append('memberImage', file);
      } else if (file === null) {
        formData.append('memberImage', blob, '');
      }

      const response = await updateUserInfoAPI(formData);

      if (response) {
        handleSelectImage(response.data.image);
        const newMyInfo = {
          ...myInfo,
          nickname: response?.data.nickname,
          introduction: response.data.introduction,
          image: response.data.imgage,
        };
        dispatch(saveUserInfo(newMyInfo));
      }
    }
  };

  useEffect(() => {
    if (myInfo && myInfo.nickname) {
      setNickname(myInfo.nickname);
    }
    if (myInfo && myInfo.introduction) {
      setIntroduction(myInfo.introduction);
    }
    if (myInfo && myInfo.image) {
      handleSelectImage(myInfo.image);
    }
  }, [myInfo]);

  return (
    <ProfileFormContainer onSubmit={handleUpdate}>
      <InputForm>
        <Label type="title" htmlFor="email" content="아이디(이메일)" />
        <div>{myInfo?.email}</div>
      </InputForm>
      <InputForm>
        <Label type="title" htmlFor="nickName" content="닉네임" />
        <Input
          type="text"
          value={nickname}
          name="nickname"
          id="nickname"
          borderRadius="0.3rem"
          color="#000"
          focusMode="true"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
          placeholder="닉네임은 2글자 이상 15글자 미만, 영어. 한글, 숫자만 입력 가능합니다."
        />
        {!handleIsValid('nickname', nickname) && (
          <Valid>닉네임은 2글자 이상 15글자 미만으로 영어, 한글, 숫자만 입력 가능합니다.</Valid>
        )}
      </InputForm>
      <InputForm>
        <Label type="title" htmlFor="introduction" content="소개글" />
        <Textarea
          value={introduction || ''}
          maxLength={200}
          id="introduction"
          name="introduction"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setIntroduction(e.target.value)}
          // onChange={handleUpdateFormValue}
          placeholder="자신을 소개하는 글을 200자 이하로 입력하세요."
        />
        <IntroduceLenCheck>{introduction?.length}/200</IntroduceLenCheck>
      </InputForm>
      <InputForm>
        <Label type="title" htmlFor="profileImage" content="프로필 이미지" />
        <ImageUpload
          nickname={nickname}
          selectImg={selectImg}
          handleSelectImage={handleSelectImage}
          handleFileInfo={handleFileInfo}
        />
      </InputForm>
      <InputForm>
        <Button type="primary" content="발행" />
      </InputForm>
    </ProfileFormContainer>
  );
};
const ProfileFormContainer = styled.form`
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
