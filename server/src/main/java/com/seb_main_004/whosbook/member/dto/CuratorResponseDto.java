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

    private String image;
}
