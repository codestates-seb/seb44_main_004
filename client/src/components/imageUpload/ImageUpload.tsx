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
  nickname?: string;
  selectImg: string;
  handleSelectImage: (imgURL: string) => void;
  handleFileInfo: (file: File) => void;
}

const ImageUpload = ({ selectImg, nickname, handleSelectImage, handleFileInfo }: IProps) => {
  const handleImgControl = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    const maxSize = 2 * 1024 * 1024;

    if (file && file[0]?.size > maxSize) {
      alert('이미지 파일은 2MB 이하로만 첨부 가능합니다. :(');
    }

    /**
     * make dataURL
     */
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

    /**
     * file name change
     *  - 파일 이름 형식: [nickname]_년월일시분초.[jpg]
     */
    if (file) {
      // 기존 파일
      const prevFile = file[0];

      // 파일 이름 형식의 `년월일시분초` 생성
      const date = new Date();
      const fileName = `${nickname}_${date.getFullYear()}${
        date.getMonth() + 1
      }${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`.split('\n')[0];

      // file 확장자
      const fileExtension = prevFile.type.split('/')[1];

      // file 이름 변경
      const newFile = new File([prevFile], `${fileName}.${fileExtension}`, { type: prevFile.type });
      handleFileInfo(newFile);
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
