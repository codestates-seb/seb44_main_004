import styled, { css } from 'styled-components';

/**
 * button property
 *  type, content, onClick
 *
 * input styled
 *  - 'primary' | 'subscribe' | 'cancel' | 'publication' 버튼을 사용하고 싶을 때는 type, content만 지정 (subscribe일 때는 isSubscribed 속성 적용)
 *  - 커스텀 버튼 사용시 width, color, backgroundColor, padding, hoverColor, hoverBackgroundColor, borderColor, hoverBorderColor
 */

export type ButtonType = 'primary' | 'subscribe' | 'cancel' | 'publication'| 'detail';
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
  isSubscribed?: boolean;
  onClick?: (e: MouseEvent) => void;
}

const Button = (props: ButtonProps) => {
  const {
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
    isSubscribed,
    onClick,
  } = props;

  return (
    <StyledButton
      type={type}
      width={width}
      color={color}
      backgroundColor={backgroundColor}
      padding={padding}
      hoverColor={hoverColor}
      hoverBackgroundColor={hoverBackgroundColor}
      borderColor={borderColor}
      hoverBorderColor={hoverBorderColor}
      isSubscribed={isSubscribed}
      onClick={onClick}
    >
      {content}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  width: ${({ width }) => (width ? `${width}rem` : '6.5rem')};
  border-radius: ${({ type }) =>
    type === 'subscribe' || type === 'publication' ? '1.4rem' : '0.5rem'};
  padding: ${({ padding }) => (padding ? padding : '0.7rem')};
  color: ${({ color }) => (color ? color : '#fff')};
  background-color: ${({ backgroundColor }) => backgroundColor && backgroundColor};
  font-weight: 700;
  font-size: 1rem;

  ${({ type }) =>
    type === 'primary' &&
    css`
      color: ${({ theme }) => theme.colors.mainLogoColor};
      background-color: ${({ theme }) => theme.colors.mainWhiteColor};
      border: 0.12rem solid ${({ theme }) => theme.colors.mainLogoColor};
      transition: transform 0.1s;

      &:hover {
        color: ${({ theme }) => theme.colors.mainWhiteColor};
        background-color: ${({ theme }) => theme.colors.mainLogoColor};
        border: 0.12rem solid ${({ theme }) => theme.colors.mainLogoColor};
      }

      &:active {
        transform: scale(0.95);
      }
    `}

  ${({ type }) =>
    type === 'subscribe' &&
    css`
      color: ${({ theme }) => theme.colors.mainLogoColor};
      background-color: transparent;
      border: 0.12rem solid ${({ theme }) => theme.colors.mainLogoColor};
    `}

  ${({ isSubscribed }) =>
    isSubscribed &&
    css`
      color: ${({ theme }) => theme.colors.mainWhiteColor};
      background-color: ${({ theme }) => theme.colors.mainLogoColor};
      border: 0.12rem solid ${({ theme }) => theme.colors.mainLogoColor};
    `}

  ${({ type }) =>
    type === 'cancel' &&
    css`
      color: ${({ theme }) => theme.colors.mainLightRed100};
      background-color: ${({ theme }) => theme.colors.mainWhiteColor};
      border: 0.12rem solid ${({ theme }) => theme.colors.mainLightRed100};
      transition: transform 0.1s;

      &:hover {
        color: ${({ theme }) => theme.colors.mainWhiteColor};
        background-color: ${({ theme }) => theme.colors.mainLightRed100};
        border: 0.12rem solid ${({ theme }) => theme.colors.mainLightRed100};
      }

      &:active {
        transform: scale(0.95);
      }
    `}

    ${({ type }) =>
    type === 'detail' &&
    css`
      color: ${({ theme }) => theme.colors.mainLightBlack100};
      background-color: ${({ theme }) => theme.colors.mainWhiteColor};
      border: 0.12rem solid ${({ theme }) => theme.colors.mainLightBlack100};
      transition: transform 0.1s;

      &:active {
        transform: scale(0.95);
      }
    `}
  
  ${({ type }) =>
    type === 'publication' &&
    css`
      color: ${({ theme }) => theme.colors.mainLogoColor};
      background-color: transparent;
      border: 0.12rem solid ${({ theme }) => theme.colors.mainLogoColor};
    `}
`;

export default Button;
