import { ChangeEvent, useRef } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

import { changeImageFileName, createImageDataUrl } from '../../utils/image';
import { ImgLabel } from '../label/Label';
import ProfileImg from '../../img/profile_img2.png';
import Button from '../buttons/Button';

/**
 * Props
 *  - selectImg: 선택한 이미지 경로값
 *  - handleSelectImage: 이미지 경로 업데이트 / 이미지 삭제 시 빈문자열로 상태 변경
 *
 * img size: limit 2MB
 */
interface IProps {
  nickname?: string;
  selectImg: string;
  handleSelectImage: (imgURL: string) => void;
  handleFileInfo: (file: File | null) => void;
}

const ImageUpload = ({ selectImg, nickname, handleSelectImage, handleFileInfo }: IProps) => {
  const uploadInput = useRef<HTMLInputElement>(null);

  const handleImgControl = (e: ChangeEvent<HTMLInputElement>) => {
    const file = createImageDataUrl(e, handleSelectImage);
    const defaultNickname = nickname ?? 'template';
    if (file) changeImageFileName(file[0], defaultNickname, handleFileInfo);
  };

  const handleDeletePreviewImg = (e: MouseEvent) => {
    e.preventDefault();
    if (uploadInput.current) {
      uploadInput.current.value = '';
    }

    handleFileInfo(null);
    handleSelectImage('');
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
          ref={uploadInput}
          id="image_uploads"
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          onChange={handleImgControl}
        />
        <Button type="cancel" content="사진 삭제" onClick={handleDeletePreviewImg} />
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
