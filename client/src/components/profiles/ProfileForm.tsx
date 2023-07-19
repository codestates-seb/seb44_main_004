import { useState, useEffect, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import styled from 'styled-components';

import Input from '../input/Input';
import Label from '../label/Label';
import Button from '../buttons/Button';
import ImageUpload from '../imageUpload/ImageUpload';

import { handleIsValid } from '../../utils/validation';
import { saveUserInfo } from '../../store/userSlice';
import { updateUserInfoAPI } from '../../api/profileApi';

interface patchDataProps {
  nickname: string;
  introduction: string;
  imageChange: boolean;
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
  const handleFileInfo = (file: File | null) => {
    setFile(file);
  };

  const dispatch = useDispatch();

  // const handleUpdate = async (e: FormEvent) => {
  //   e.preventDefault();
  const handleUpdate = async () => {
    if (handleIsValid('nickname', nickname)) {
      const formData = new FormData();

      const patchDto: patchDataProps = {
        nickname,
        introduction,
        imageChange: file ? true : false,
      };
      const blob = new Blob([], { type: 'application/octet-stream' });

      formData.append(
        'memberPatchDto',
        new Blob([JSON.stringify(patchDto)], {
          type: 'application/json',
        })
      );

      if (file) {
        formData.append('memberImage', file);
      } else {
        formData.append('memberImage', blob, '');
      }
      // 이슈 : 이미자파일이 x , imageChange true 일 경우 기본 프로필 이미지로 수정
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

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
  const handleDefaultImage = async () => {
    const formData = new FormData();
    const patchDto: patchDataProps = {
      nickname,
      introduction,
      imageChange: true,
    };
    const blob = new Blob([], { type: 'application/octet-stream' });

    formData.append(
      'memberPatchDto',
      new Blob([JSON.stringify(patchDto)], {
        type: 'application/json',
      })
    );
    formData.append('memberImage', blob, '');
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
        {/* {formValue.introduction && !formValid.nickname && ( */}
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
          handleDefaultImage={handleDefaultImage}
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

/*

import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

import { changeImageFileName, createImageDataUrl } from '../../utils/image';
import { ImgLabel } from '../label/Label';
import ProfileImg from '../../img/profile_img2.png';
import Button from '../buttons/Button';


interface IProps {
  nickname?: string;
  selectImg: string;
  handleSelectImage: (imgURL: string) => void;
  handleFileInfo: (file: File | null) => void;
  handleDefaultImage: () => void;
}

const ImageUpload = ({
  selectImg,
  nickname,
  handleSelectImage,
  handleFileInfo,
  handleDefaultImage,
}: IProps) => {
  const handleImgControl = (e: ChangeEvent<HTMLInputElement>) => {
    const file = createImageDataUrl(e, handleSelectImage);
    const defaultNickname = nickname ?? 'template';
    if (file) changeImageFileName(file[0], defaultNickname, handleFileInfo);
  };

  const handleDeletePreviewImg = (e: MouseEvent) => {
    e.preventDefault();
    handleSelectImage('');
    handleFileInfo(null);
  };

  return (
    <Container>
      <ImgWrap>
        {selectImg ? (
          <ImgPreview src={selectImg} alt="selected image" />
        ) : (
          <DefaultImg src={ProfileImg} />
        )}
      </ImgWrap>
      <ButtonWrap>
        <ImgLabel htmlFor="image_uploads" content="파일 첨부" type="file" />
        <Input
          id="image_uploads"
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          onChange={handleImgControl}
        />
        <Button type="cancel" content="사진 삭제" onClick={handleDeletePreviewImg} />
        <Button type="detail" content="기본 프로필 이미지로 변경" onClick={handleDefaultImage} />
      </ButtonWrap>
    </Container>
  );
};

const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : '100%')};
  ${tw`
    flex
  `};
`;

const ImgWrap = styled.div`
  width: 8.75rem;
  height: 8.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.mainLightGray300};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrap = tw.div`
  flex
  flex-col
  justify-center
  ml-5
  [> label]:mb-2
`;

const ImgPreview = styled.img`
  width: 8.75rem;
  height: 8.75rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const DefaultImg = tw.img`
  w-[5rem]
  h-[5rem]
  rounded-lg
  object-contain
`;

const Input = styled.input`
  display: none;
`;

export default ImageUpload;
*/
