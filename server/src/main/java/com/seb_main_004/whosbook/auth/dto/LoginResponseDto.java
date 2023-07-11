package com.seb_main_004.whosbook.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {

    private long memberId;

    private String nickname;

    private String imgUrl;
}
