package com.seb_main_004.whosbook.like.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CurationLikeResponseDto {

    private Long curationId;

    private Integer likeCount;

}
