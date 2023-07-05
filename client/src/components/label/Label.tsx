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

const Label = ({ type, htmlFor, content }: LabelProps) => {
  return (
    <StyledLabel htmlFor={htmlFor} type={type}>
      {content}
    </StyledLabel>
  );
};

const StyledLabel = styled.label<LabelProps>`
  font-size: ${(props) => (props.type === 'title' ? '1rem' : '0.8rem')};
  font-weight: ${(props) => (props.type === 'title' ? 'bold' : 400)};
  color: ${(props) => (props.type === 'title' ? '#000' : '#474b50')};
`;

export default Label;
