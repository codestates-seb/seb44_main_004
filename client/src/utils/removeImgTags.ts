/**
 * react-quill editor로 작성한 글 중 img 태그 부분 제외, style이 적용된 코드만 제외하고 content만 추출하는 함수
 */
export const removeStyleAngImgTags = (text: string) => {
  const imgRegex = /<img[^>]*>/gi;
  const srcAltRegex = /\s(?:src|alt)\s*=\s*"[^"]*"/gi;
  const styleRegex = /\sstyle\s*=\s*"[^"]*"/gi;

  const removeImg = text.replace(imgRegex, (match) => match.replace(srcAltRegex, ''));
  const removeStyle = removeImg.replace(styleRegex, '');

  return removeStyle;
};
