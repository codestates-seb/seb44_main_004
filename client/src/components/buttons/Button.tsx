import styled from 'styled-components';

/**
 * Button Type
 * - write
 * - primary
 * - subscribe
 * - warning
 */

interface ButtonProps {
  type?: string;
  width?: string;
  content?: string;
  color?: string;
  $backgroundColor?: string;
  padding?: string;
  $hoverColor?: string;
  $hoverBackgroundColor?: string;
  $borderColor?: string;
  $hoverBorderColor?: string;
  onClick?: () => void;
}

const Button = ({
  type,
  width,
  content,
  color,
  $backgroundColor,
  padding,
  $hoverColor,
  $hoverBackgroundColor,
  $borderColor,
  $hoverBorderColor,
  onClick,
}: ButtonProps) => {
  console.log(
    type,
    width,
    content,
    color,
    $backgroundColor,
    padding,
    $hoverColor,
    $hoverBackgroundColor,
    $borderColor,
    $hoverBorderColor
  );

  return (
    <ButtonStyle
      type={type}
      width={width}
      color={color}
      $backgroundColor={$backgroundColor}
      padding={padding}
      $hoverColor={$hoverColor}
      $hoverBackgroundColor={$hoverBackgroundColor}
      $borderColor={$borderColor}
      $hoverBorderColor={$hoverBorderColor}
      onClick={onClick}
    >
      {content}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  width: ${(props) => (props.width ? `${props.width}` : '6.5rem')};
  border: 1px solid ${(props) => props.$borderColor && props.$borderColor};
  border-radius: 0.5rem;
  color: ${(props) => (props.color ? props.color : '#fff')};
  background-color: ${(props) => props.$backgroundColor && props.$backgroundColor};
  padding: ${(props) => (props.padding ? props.padding : '0.7rem')};

  &:hover {
    color: ${({ $hoverColor }) => (`${$hoverColor}` ? `${$hoverColor}` : 'red')};
    background-color: ${({ $hoverBackgroundColor }) =>
      $hoverBackgroundColor && $hoverBackgroundColor};
  }
`;

export default Button;
