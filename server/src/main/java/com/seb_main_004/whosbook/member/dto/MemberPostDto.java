package com.seb_main_004.whosbook.member.dto;

import lombok.Data;

import javax.validation.constraints.*;

@Data
public class MemberPostDto {

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "유효한 이메일 주소를 입력해주세요.")
    private String email;

    @NotBlank(message = "닉네임을 입력해주세요.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]{2,15}$", message = "닉네임은 2글자 이상 15글자 미만의 영어, 한글, 숫자로 이루어져야 합니다.")
    private  String nickname;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$", message = "비밀번호는 영문, 숫자, 특수문자(!@#$%^&*)를 포함한 8자 이상이어야 합니다.")
    private String password;
}
