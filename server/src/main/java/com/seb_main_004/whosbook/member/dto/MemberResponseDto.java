package com.seb_main_004.whosbook.member.dto;

import com.seb_main_004.whosbook.member.entity.Member;
import lombok.Data;

@Data
public class MemberResponseDto {

    private long memberId;

    private String email;

    private String nickname;

//    회원가입 시 이미지 업로드를 위한 변수로서, 추후 구현
//    private String image;

    private Member.MemberStatus memberStatus;

}
