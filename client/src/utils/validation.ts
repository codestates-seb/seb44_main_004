/**
 * 유효성 검증
 *
 * email validation, username validation
 *  - 영문자, 숫자 | @ | . 이후 2~4 글자
 *
 * password validation
 *  - 영문자, 숫자, 특수문자(!@#$%^&*)를 각각 최소 1개 이상 포함하며 길이가 5자 이상 15자 미만인지 확인
 *
 * nickname validation
 *  - 영문자, 한글, 숫자만 입력, 2글자 이상 15글자 미만으로 입력가능
 *
 */
export const validation = {
  emailValidRule: new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$`),
  passwordValidRule: new RegExp(`^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$`),
  nicknameValidRule: new RegExp(`^[a-zA-Z가-힣0-9]{2,14}$`),
};

export const formInputValidation = (str: string, rule: RegExp) => {
  return rule.test(str);
};

export type FormType = 'email' | 'username' | 'password' | 'nickname';
export const handleIsValid = (type: FormType, value: string): boolean => {
  switch (type) {
    case 'email':
    case 'username':
      return formInputValidation(value, validation.emailValidRule);

    case 'password':
      return formInputValidation(value, validation.passwordValidRule);
    case 'nickname':
      return formInputValidation(value, validation.nicknameValidRule);
    default:
      return false;
  }
};
