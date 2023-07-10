package com.seb_main_004.whosbook.member.dto;

import com.seb_main_004.whosbook.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CuratorResponseDto {
    private long memberId;

    private String email;

    private String nickname;

    private String introduction;

//    회원가입 시 이미지 업로드를 위한 변수로서, 추후 구현
//    private String image;
}
