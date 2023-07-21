package com.seb_main_004.whosbook.member.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class BestCuratorDto {
    private long memberId;

    private String email;

    private String nickname;

    private String introduction;

    private String image;

    private int mySubscriber;
}
