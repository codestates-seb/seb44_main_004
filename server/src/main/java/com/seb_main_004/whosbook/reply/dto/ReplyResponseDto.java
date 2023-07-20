package com.seb_main_004.whosbook.reply.dto;

import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data
public class ReplyResponseDto {

    private Long replyId;

    private Long memberId;

    private String content;

    private String nickname;

    private LocalDateTime createdAt=LocalDateTime.now();

    private LocalDateTime updatedAt=LocalDateTime.now();




}
