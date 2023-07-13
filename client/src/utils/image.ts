import { ChangeEvent } from 'react';

/**
 * image size check & dataURL create
 * - handleSelectImage: 이미지 경로 업데이트 / 이미지 삭제 시 빈문자열로 상태 변경하는 함수
 */
export const createImageDataUrl = (
  e: ChangeEvent<HTMLInputElement>,
  handleSelectImage: (imgURL: string) => void
) => {
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

  return file;
};

/**
 * file name change
 *  - 파일 이름 형식: [nickname]_년월일시분초.[jpg]
 */
export const changeImageFileName = (
  file: File,
  nickname: string,
  handleFileInfo: (file: File) => void
) => {
  if (file) {
    // 기존 파일
    const prevFile = file;

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
