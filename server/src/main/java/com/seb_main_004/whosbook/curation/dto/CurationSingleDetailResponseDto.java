package com.seb_main_004.whosbook.curation.dto;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.member.dto.CuratorResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class CurationSingleDetailResponseDto {
    private CuratorResponseDto curator;
    private Boolean isSubscribed;
    private int like;
    private long curationId;
    private String emoji;
    private String title;
    private String content;
    private Curation.Visibility visibility;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
