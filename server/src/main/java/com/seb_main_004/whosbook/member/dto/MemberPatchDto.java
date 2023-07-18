package com.seb_main_004.whosbook.member.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Data
public class MemberPatchDto {
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]{2,15}$", message = "닉네임은 2글자 이상 15글자 미만의 영어, 한글, 숫자로 이루어져야 합니다.")
    private String nickname;
    @Size(min = 1, max = 200, message = "텍스트는 최대 200자까지 입력 가능합니다.")
    private String introduction;
    //프로필이미지 수정 여부를 알려주는 parameter
    @NotNull
    private boolean imageChange;
}

