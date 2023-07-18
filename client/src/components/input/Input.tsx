import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

/**
 * input property
 *  value, type, id, name, placeholder, onChange
 *
 * input styled
 *  color, backgroundColor, padding, width, border, borderRadius
 *
 * focusMode: click여부에 따라 input styling
 */
interface InputProps {
  // input 태그의 value
  value?: string;
  // input 태그의 type
  type?: string;
  // input 태그의 고유 식별자, label의 htmlFor 속성 값과 연결
  id?: string;
  // input 태그의 value
  name?: string;
  // input 태그의 value
  placeholder?: string;
  /** input tag의 styles */
  color?: string;
  backgroundColor?: string;
  padding?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
  readOnly?: boolean;
  disabled?: boolean;
  // 유효성 검증 로직에서 쓰일 변수
  focusMode?: string;
  // input 태그의 onChange
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const {
    value,
    type,
    id,
    name,
    placeholder,
    color,
    backgroundColor,
    padding,
    width,
    border,
    borderRadius,
    readOnly,
    disabled,
    focusMode,
    onChange,
    onBlur,
  } = props;

  return (
    <StyledInput
      value={value}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      color={color}
      backgroundColor={backgroundColor}
      padding={padding}
      width={width}
      border={border}
      borderRadius={borderRadius}
      readOnly={readOnly}
      disabled={disabled}
      focusMode={focusMode}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

const StyledInput = styled.input<InputProps>`
  width: ${({ width }) => (width ? width : '100%')};
  border: ${({ border }) => (border ? border : 'none')};
  border-radius: 0.3rem;
  color: ${({ color, theme }) => (color ? color : `${theme.colors.mainLightBlack100}`)};
  padding: ${({ padding }) => (padding ? padding : '0.7rem')};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : `${theme.colors.mainLightGray200}`};
  &:disabled {
    color: ${({ disabled }) => disabled && 'gray'};
  }

  &:focus {
    border: ${({ focusMode }) => focusMode === 'true' && '1px solid #0077ff'};
    box-shadow: ${({ focusMode }) =>
      focusMode === 'true' && '0px 0px 5px 3px rgba(46, 139, 245, 0.3)'};
    outline: ${({ focusMode }) => focusMode === 'true' && 'none'};
  }
`;

export default Input;
