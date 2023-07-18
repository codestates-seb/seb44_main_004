package com.seb_main_004.whosbook.curation.dto;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.member.dto.CuratorResponseDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

//회원 마이페이지의 '내가 쓴 큐레이션 목록' API를 위한 DTO

@Builder
@Data
public class CurationMultiResponseDto {
    //기존 CurationSingleDetailResponseDto와의 차이점은 'private CuratorResponseDto curator'변수가 'private long memberId'로 변경됨
    //내가 쓴 큐레이션을 가져오는 것이므로 작성자가 모두 같아, 작성자 정보를 모두 가져오는 것보단 'memberId'만 가져오는 것이 합리적이라고 판단함
    private long memberId;
    private String memberNickname;
    private long categoryId;
    private String category;
    private int curationLikeCount;
    private long curationId;
    private String emoji;
    private String title;
    private String content;
    private Curation.Visibility visibility;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
