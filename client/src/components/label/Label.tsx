import styled from 'styled-components';

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
