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

    if (file && file[0]?.size > maxSize) {
      alert('이미지 파일은 2MB 이하로만 첨부 가능합니다. :(');
    }

    // make dataURL
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
      <ImgContainer>
        {selectImg ? (
          <ImgPreview src={selectImg} alt="selected image" />
        ) : (
          <DefaultImg src={ProfileImg} />
        )}
      </ImgContainer>
      <ButtonContainer>
        <ImgLabel htmlFor="image_uploads" content="파일 첨부" type="file" />
        <Input
          id="image_uploads"
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          onChange={handleImgControl}
        />
        <Button type="cancel" content="사진 삭제" onClick={handleDeletePreviewImg} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : '100%')};
  ${tw`
    flex
  `};
`;

const ImgContainer = styled.div`
  width: 8.75rem;
  height: 8.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.mainLightGray300};
`;

const ButtonContainer = tw.div`
  flex
  flex-col
  justify-center
  ml-5
`;

const ImgPreview = styled.img`
  width: 8.75rem;
  height: 8.75rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const DefaultImg = tw.img`
  w-[8.75rem]
  h-[8.75rem]
  rounded-lg
  object-contain
`;

const Input = styled.input`
  opacity: 0;
`;

export default ImageUpload;
