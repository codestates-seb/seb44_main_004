import { ChangeEvent } from 'react';
import tw from 'twin.macro';
import { styled } from 'styled-components';

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
  selectImg: string;
  handleSelectImage: (imgURL: string) => void;
}

const ImageUpload = ({ selectImg, handleSelectImage }: IProps) => {
  const handleImgControl = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    const maxSize = 2 * 1024 * 1024;
    // TODO: 파일명 변경하기: nickname_날짜시간분.jpg

    if (file && file[0]?.size > maxSize) {
      alert('이미지 파일은 2MB 이하로만 첨부 가능합니다. :(');
    }

    // make dataURL
    // TODO: formData
    if (file && file[0]?.size < maxSize) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file[0]);

      fileReader.onload = () => {
        const imgURL = fileReader.result;
        if (imgURL) {
          handleSelectImage(imgURL.toString());
        }
      };
    }
  };

  const handleDeletePreviewImg = (e: MouseEvent) => {
    e.preventDefault();
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
