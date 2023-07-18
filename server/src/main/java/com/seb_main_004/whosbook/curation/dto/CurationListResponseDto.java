package com.seb_main_004.whosbook.curation.dto;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.member.dto.CuratorResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
@Builder
@Getter
public class CurationListResponseDto {
    private CuratorResponseDto curator;
    private long categoryId;
    private String category;
    private int curationLikeCount;
    private long curationId;
    private String emoji;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
