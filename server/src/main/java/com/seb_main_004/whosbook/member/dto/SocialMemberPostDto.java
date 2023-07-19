package com.seb_main_004.whosbook.member.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class SocialMemberPostDto {
    @NotBlank(message = "이메일을 입력해주세요.")
    private String email;

    @NotBlank(message = "닉네임을 입력해주세요.")
    private  String nickname;

    private String imageUrl;


}
