import styled from 'styled-components';

export type ButtonType = 'primary' | 'subscribe' | 'cancel';
interface ButtonProps {
  type?: ButtonType;
  width?: string;
  content?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  onClick?: (e: MouseEvent) => void;
}

const Button = ({
  type,
  width,
  content,
  color,
  backgroundColor,
  padding,
  hoverColor,
  hoverBackgroundColor,
  borderColor,
  hoverBorderColor,
  onClick,
}: ButtonProps) => {
  if (!type) {
    return (
      <ButtonStyle
        width={width}
        color={color}
        backgroundColor={backgroundColor}
        padding={padding}
        hoverColor={hoverColor}
        hoverBackgroundColor={hoverBackgroundColor}
        borderColor={borderColor}
        hoverBorderColor={hoverBorderColor}
        onClick={onClick}
      >
        {content}
      </ButtonStyle>
    );
  } else if (type === 'primary') {
    return (
      <ButtonStyle
        width="6.5rem"
        color="#3173F6"
        backgroundColor="#fff"
        padding="0.7rem"
        hoverColor="#fff"
        hoverBackgroundColor="#3173F6"
        borderColor="#fff"
        hoverBorderColor="#3173F6"
        onClick={onClick}
      >
        {content}
      </ButtonStyle>
    );
  }
};

const ButtonStyle = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  width: ${(props) => (props.width ? `${props.width}` : '6.5rem')};
  border: 1px solid ${(props) => props.borderColor && props.borderColor};
  border-radius: 0.5rem;
  color: ${(props) => (props.color ? props.color : '#fff')};
  background-color: ${(props) => props.backgroundColor && props.backgroundColor};
  padding: ${(props) => (props.padding ? props.padding : '0.7rem')};

  &:hover {
    color: ${(props) => (props.hoverColor ? props.hoverColor : 'red')};
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor && hoverBackgroundColor};
  }
`;

export default Button;
