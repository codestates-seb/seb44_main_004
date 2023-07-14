/**
 * react-quill editor로 작성한 글 중 img 태그 부분 제외한 content만 추출하는 함수
 */
export const removeImgTags = (text: string) => {
  return text.replace(/<img[^>]*>/gi, '');
};
