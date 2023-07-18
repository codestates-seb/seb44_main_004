package com.seb_main_004.whosbook.member.dto;

import com.seb_main_004.whosbook.member.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OtherMemberResponseDto {
    private long memberId;

    private String email;

    private String nickname;

    private String introduction;

    private String image;

    private long mySubscriber;

    private long myCuration;

    private boolean isSubscribed;

    private Member.MemberStatus memberStatus;
}
