import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

/**
 * input property
 *  value, type, id, placeholder, onChange
 *
 * input styled
 *  color, backgroundColor, padding, width, border, borderRadius
 *
 * focusMode: click여부에 따라 input styling
 */
interface InputProps {
  value?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
  focusMode?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const {
    value,
    type,
    id,
    placeholder,
    color,
    backgroundColor,
    padding,
    width,
    border,
    borderRadius,
    focusMode,
    onChange,
  } = props;

  return (
    <StyledInput
      value={value}
      type={type}
      id={id}
      placeholder={placeholder}
      color={color}
      backgroundColor={backgroundColor}
      padding={padding}
      width={width}
      border={border}
      borderRadius={borderRadius}
      focusMode={focusMode}
      onChange={onChange}
    />
  );
};

const StyledInput = styled.input<InputProps>`
  width: ${({ width }) => (width ? width : '100%')};
  border: ${({ border }) => (border ? border : 'none')};
  border-radius: 0.3rem;
  color: ${({ color, theme }) => (color ? color : `${theme.colors.mainLightGray400}`)};
  padding: ${({ padding }) => (padding ? padding : '0.7rem')};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : `${theme.colors.mainLightGray200}`};

  &:focus {
    border: ${({ focusMode }) => focusMode === 'true' && '1px solid #0077ff'};
    box-shadow: ${({ focusMode }) =>
      focusMode === 'true' && '0px 0px 5px 3px rgba(46, 139, 245, 0.3)'};
    outline: ${({ focusMode }) => focusMode === 'true' && 'none'};
  }
`;

export default Input;
