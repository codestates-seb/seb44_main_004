package com.seb_main_004.whosbook.member.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class BestCuratorDto {
    private long memberId;

    private String email;

    private String nickname;

    private String introduction;

    private String image;

    private long mySubscriber;
}
