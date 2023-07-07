/*
 * 유효성 검증
 *  - 이메일: 기본 이메일 검증
 *  - 비밀번호: 숫자, 영어 대/소문자 1개, 특수문자(!@#$%^&*), 길이
 *  - 비밀번호 확인: 비밀번호와 일치하는지 체크
 *  - 닉네임: 2글자 이상 15글자 미만, 영어, 숫자만 입력
 */

/**
 * email validation
 *  - 영문, 숫자 | @ | . 이후 2~4 글자
 *
 * 1. validation 규칙을 정의한 객체가 필요하다.
 * 2. 문자열과 유효성 검사 규칙을 입력받아 boolean을 리턴하는 함수가 필요하다.
 */
export const formInputValidation = (str: string, rule: RegExp) => {
  return rule.test(str);
};

export const validation = {
  emailValidRule: new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$`),
};

// 값이 유효, 유효하지 않을 때 피드백이 있어야 됨
