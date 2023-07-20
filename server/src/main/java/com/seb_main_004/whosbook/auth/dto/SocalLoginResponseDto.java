package com.seb_main_004.whosbook.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SocalLoginResponseDto {

    private String email;

    private String nickname;

    private String imageUrl;
}
