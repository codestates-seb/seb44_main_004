import styled from 'styled-components';

/**
 * type: 'title' -> 'title' 경우 font-size, font-weight, color의 스타일 지정
 * htmlFor: input 요소의 id속성과 연관시켜 form input control
 * content: label 제목
 */
interface LabelProps {
  type?: string;
  htmlFor?: string;
  content?: string;
}
interface ImgLabelProps extends LabelProps {
  width?: string;
  padding?: string;
  color?: string;
  backgroundColor?: string;
}

const Label = ({ type, htmlFor, content }: LabelProps) => {
  return (
    <StyledLabel htmlFor={htmlFor} type={type}>
      {content}
    </StyledLabel>
  );
};

export const ImgLabel = ({
  color,
  padding,
  width,
  backgroundColor,
  type,
  htmlFor,
  content,
}: ImgLabelProps) => {
  return (
    <StyledImgLabel
      type={type}
      htmlFor={htmlFor}
      width={width}
      padding={padding}
      color={color}
      backgroundColor={backgroundColor}
    >
      {content}
    </StyledImgLabel>
  );
};

const StyledLabel = styled.label<LabelProps>`
  font-size: ${(props) => (props.type === 'title' ? '1rem' : '0.8rem')};
  font-weight: ${(props) => (props.type === 'title' ? 'bold' : 400)};
  color: ${(props) => (props.type === 'title' ? '#000' : '#474b50')};
`;

const StyledImgLabel = styled.label<ImgLabelProps>`
  display: block;
  text-align: center;
  font-size: ${(props) => (props.type === 'title' ? '1.1rem' : '1rem')};
  font-weight: ${(props) => (props.type === 'file' ? 700 : 400)};
  color: ${({ color, theme }) => (color ? color : theme.colors.mainGrayBlue)};
  padding: ${(props) => (props.padding ? props.padding : '0.75rem 0.7rem')};
  width: ${(props) => (props.width ? props.width : '6.5rem')};
  border: 0.12rem solid ${({ theme }) => theme.colors.mainGrayBlue};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : theme.colors.mainWhiteColor};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    color: ${({ color, theme }) => (color ? color : theme.colors.mainWhiteColor)};
    background-color: ${({ color, theme }) => (color ? color : theme.colors.mainGrayBlue)};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default Label;
