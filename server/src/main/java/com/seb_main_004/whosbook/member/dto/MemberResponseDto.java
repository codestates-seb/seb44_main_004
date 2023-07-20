package com.seb_main_004.whosbook.member.dto;

import com.seb_main_004.whosbook.member.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberResponseDto {
    private long memberId;

    private String email;

    private String nickname;

    private String image;

    private String introduction;

    private long mySubscriber;

    private long myCuration;

    private Member.MemberStatus memberStatus;
}
