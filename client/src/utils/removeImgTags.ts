/**
 * react-quill editor로 작성한 글 중 img 태그 style이 적용된 코드만 제외하고 content만 추출하는 함수
 */
export const removeStyleImgTags = (text: string) => {
  const imgRegex = /<img[^>]*>/gi;
  const srcAltRegex = /\s(?:src|alt)\s*=\s*"[^"]*"/gi;
  const styleRegex = /\sstyle\s*=\s*"[^"]*"/gi;

  const removeImg = text.replace(imgRegex, (match) => match.replace(srcAltRegex, ''));
  const removeStyle = removeImg.replace(styleRegex, '');

  return removeStyle;
};

/**
 * react-quill editor의 HTML 문자열에서
 *  - 이미지 태그의 src, alt 속성 제거
 *  - 모든 태그에서 스타일 속성 제거
 *  - <h1> ~ <h6> 모든 heading 태그를 <p> 태그로 대체
 *  - <u> 태그 제거
 *  - text-decoration: underline 스타일 제거
 *  - text-decoration: line-through 스타일 제거
 */
export const removeStyleAndAttributes = (text: string) => {
  const imgRegex = /<img[^>]*>/gi;
  const srcAltRegex = /\s(?:src|alt)\s*=\s*"[^"]*"/gi;
  const styleRegex = /\sstyle\s*=\s*"[^"]*"/gi;
  const headingRegex = /<(\/?)h[1-6][^>]*>/gi;
  const underlineRegex = /<(\/?)u>/gi;
  const textDecorationUnderlineRegex = /text-decoration\s*:\s*underline;/gi;
  const textDecorationLineThroughRegex = /text-decoration\s*:\s*line-through(;|\s*)?/gi;

  const removeImgAttributes = text.replace(imgRegex, (match) => match.replace(srcAltRegex, ''));
  const removeAllStyles = removeImgAttributes.replace(styleRegex, '');
  const replaceHeadingsWithPTag = removeAllStyles.replace(
    headingRegex,
    (_match, closingTag) => `<${closingTag}p>`
  );
  const removeUTag = replaceHeadingsWithPTag.replace(
    underlineRegex,
    (_match, closingTag) => `<${closingTag}>`
  );
  const removeTextDecorationUnderline = removeUTag.replace(textDecorationUnderlineRegex, '');
  const removeTextDecorationLineThrough = removeTextDecorationUnderline.replace(
    textDecorationLineThroughRegex,
    ''
  );

  return removeTextDecorationLineThrough;
};
